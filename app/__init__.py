import os
from flask import Flask


def create_app(test_config=None):
    # Resolve project-level templates/static directories (project root)
    package_dir = os.path.abspath(os.path.dirname(__file__))
    project_root = os.path.abspath(os.path.join(package_dir, '..'))
    template_dir = os.path.join(project_root, 'templates')
    static_dir = os.path.join(project_root, 'static')

    app = Flask(__name__,
                instance_relative_config=True,
                template_folder=template_dir,
                static_folder=static_dir)

    app.config.from_object('config.Config')
    if test_config:
        app.config.update(test_config)

    try:
        os.makedirs(app.instance_path, exist_ok=True)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import routes
    app.register_blueprint(routes.bp)

    # Template filter: currency (Philippine peso)
    @app.template_filter('currency')
    def currency_filter(value):
        try:
            val = float(value or 0)
        except Exception:
            return value
        return f"₱{val:,.2f}"

    # Make company config available to all templates as `company`
    @app.context_processor
    def inject_company():
        return {
            'company': {
                'name': app.config.get('COMPANY_NAME'),
                'address': app.config.get('COMPANY_ADDRESS'),
                'email': app.config.get('COMPANY_EMAIL'),
                'phone': app.config.get('COMPANY_PHONE'),
                'tin': app.config.get('COMPANY_TIN'),
            }
        }

    return app
