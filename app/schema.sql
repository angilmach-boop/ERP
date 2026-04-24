-- Drop existing tables (children first)
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS sales_order_items;
DROP TABLE IF EXISTS sales_orders;
DROP TABLE IF EXISTS purchase_order_items;
DROP TABLE IF EXISTS purchase_orders;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

-- Create items table
CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    quantity INTEGER NOT NULL DEFAULT 0,
    reorder_level INTEGER DEFAULT 0,
    unit_cost REAL DEFAULT 0
);

-- Create transactions table (inventory movements)
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    date TEXT NOT NULL,
    created_by INTEGER,
    FOREIGN KEY (item_id) REFERENCES items (id),
    FOREIGN KEY (created_by) REFERENCES users (id)
);

-- Suppliers
CREATE TABLE suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    notes TEXT
);

-- Purchase orders
CREATE TABLE purchase_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    supplier_id INTEGER,
    created_by INTEGER,
    status TEXT DEFAULT 'draft',
    approved_by INTEGER,
    approved_at TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
    FOREIGN KEY (created_by) REFERENCES users (id),
    FOREIGN KEY (approved_by) REFERENCES users (id)
);

CREATE TABLE purchase_order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    po_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_cost REAL DEFAULT 0,
    FOREIGN KEY (po_id) REFERENCES purchase_orders (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- Sales orders
CREATE TABLE sales_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    created_by INTEGER,
    status TEXT DEFAULT 'draft',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE sales_order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price REAL DEFAULT 0,
    FOREIGN KEY (sales_id) REFERENCES sales_orders (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

-- Invoices
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sales_id INTEGER,
    amount REAL,
    status TEXT DEFAULT 'unpaid',
    issued_at TEXT DEFAULT (datetime('now')),
    paid_at TEXT,
    FOREIGN KEY (sales_id) REFERENCES sales_orders (id)
);

-- Audit log
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Sample data
INSERT INTO users (username, password, role) VALUES ('admin', 'admin', 'admin');
INSERT INTO items (name, category, quantity, reorder_level, unit_cost) VALUES
('Wood', 'Raw Material', 100, 20, 5.0),
('Nails', 'Raw Material', 500, 100, 0.01),
('Polish', 'Consumable', 50, 10, 3.5);
INSERT INTO suppliers (name, contact_name, email, phone) VALUES ('Local Timber', 'Carlos', 'carlos@example.com', '555-0100');
