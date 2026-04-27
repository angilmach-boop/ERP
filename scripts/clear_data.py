#!/usr/bin/env python3
import os, shutil, datetime, sqlite3, sys

base = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
db = os.path.join(base, 'instance', 'database.db')

if not os.path.exists(db):
    print('Database not found at', db)
    sys.exit(1)

bak = db + '.bak-' + datetime.datetime.now().strftime('%Y%m%d%H%M%S')
shutil.copy2(db, bak)
print('Backup created:', bak)

try:
    conn = sqlite3.connect(db)
    cur = conn.cursor()
    cur.execute('PRAGMA foreign_keys = OFF;')
    stmts = [
        "DELETE FROM journal_entries;",
        "DELETE FROM financial_transactions;",
        "DELETE FROM transactions;",
        "DELETE FROM purchase_order_items;",
        "DELETE FROM purchase_orders;",
        "DELETE FROM sales_order_items;",
        "DELETE FROM sales_orders;",
        "DELETE FROM invoices;",
        "DELETE FROM audit_log;",
        "DELETE FROM suppliers;",
        "DELETE FROM items;",
    ]
    for s in stmts:
        try:
            cur.execute(s)
            print('OK:', s)
        except Exception as e:
            print('SKIP:', s, 'error:', e)
    conn.commit()
    print('Committed deletions.')
    try:
        cur.execute('VACUUM;')
        conn.commit()
        print('VACUUM completed.')
    except Exception as e:
        print('VACUUM failed:', e)
    conn.close()
    print('Done.')
except Exception as e:
    print('Failed to open or modify DB:', e)
    sys.exit(1)
