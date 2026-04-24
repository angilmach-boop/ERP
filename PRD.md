Here’s your **ADVANCED ERP PRD + Modern Dashboard Design (no emojis, clean business UI, charts + icons)** tailored exactly to your course requirements.

---

# 📘 **ADVANCED ERP PRD**

## **Project Title**

**Advanced Inventory Management ERP Module with Analytics Dashboard for SME Manufacturing**

---

# **1. BUSINESS CONTEXT**

## **Company Profile**

A mid-scale furniture manufacturing SME handling:

* Raw materials (wood, glue, nails)
* Work-in-progress inventory
* Finished goods stock

## **Organizational Structure**

* Admin
* Inventory Manager
* Procurement Officer
* Production Supervisor

## **Current System**

* Excel-based tracking
* Manual approvals
* No real-time visibility

## **Problems Identified**

* Stock mismatch (physical vs records)
* No reorder automation
* No analytics dashboard
* Delayed decision-making

---

# **2. INDUSTRIAL ENGINEERING ANALYSIS**

## **Process Flow (Current)**

Procurement → Manual Entry → Storage → Usage → Manual Update → Reports

## **Identified Inefficiencies**

* Redundant data entry
* Human errors
* Lack of real-time tracking

## **IE Tools Used**

* Flowchart
* SIPOC Model
* Fishbone Analysis

---

# **3. MODULE DESIGN**

## **A. Module Overview**

### **Purpose**

To automate inventory tracking, monitoring, and reporting.

### **Users**

* Admin
* Inventory Manager

### **Scope**

* Item management
* Stock tracking
* Reorder alerts
* Analytics dashboard

### **Limitations**

* Single module only (not full ERP)

---

## **B. PROCESS FLOW (PROPOSED)**

Login → Dashboard →
Add Item → Update Stock →
Auto Validation → Database Update →
Analytics Dashboard → Reports

---

## **C. IPO MODEL**

| INPUT      | PROCESS   | OUTPUT            |
| ---------- | --------- | ----------------- |
| Item Data  | Validate  | Stored Record     |
| Stock Data | Update DB | Updated Inventory |
| Cost Data  | Compute   | Cost Report       |
| Threshold  | Compare   | Alerts            |

---

# **4. DATABASE DESIGN**

## **Tables**

### **users**

* id (PK)
* username
* password
* role

### **items**

* id (PK)
* name
* category
* quantity
* reorder_level
* unit_cost

### **transactions**

* id (PK)
* item_id (FK)
* type (IN/OUT)
* quantity
* date

---

## **ERD RELATION**

* Users → manage → Items
* Items → linked → Transactions

---

# **5. SYSTEM LOGIC**

### **Reorder Logic**

```
IF quantity <= reorder_level:
    trigger alert
```

### **Inventory Value**

```
value = quantity * unit_cost
```

### **Stock Update**

```
IF transaction_type == "IN":
    quantity += value
ELSE:
    quantity -= value
```

---

# **6. ADVANCED DASHBOARD DESIGN**

## **Dashboard Features**

### **Top KPI Cards**

* Total Items
* Total Inventory Value
* Low Stock Count
* Transactions Today

---

## **Charts (MANDATORY)**

### **1. Inventory Distribution**

* Pie Chart
* Shows category-wise stock

### **2. Stock Trend**

* Line Chart
* Shows stock changes over time

### **3. Low Stock Alert**

* Bar Chart
* Highlights critical items

---

## **Icons (Professional UI)**

Use:

* Font Awesome / Lucide Icons
* No emojis

Examples:

* Dashboard → chart-line
* Inventory → boxes
* Reports → file-chart
* Alerts → triangle-exclamation

---

# **7. REPORTS**

1. Current Stock Report
2. Reorder Alert Report
3. Inventory Value Report
4. Transaction History

---

# **8. KPI EVALUATION**

| KPI             | Current | ERP   | Improvement |
| --------------- | ------- | ----- | ----------- |
| Processing Time | 10 min  | 2 min | 80%         |
| Error Rate      | 15%     | 2%    | 86%         |
| Cycle Time      | High    | Low   | Optimized   |

---

# 🧱 **ADVANCED CLEAN PROJECT STRUCTURE**

```
erp_system/
│
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── services.py
│
├── static/
│   ├── css/
│   │   ├── dashboard.css
│   │   └── login.css
│   ├── js/
│   │   ├── dashboard.js
│   │   └── charts.js
│   ├── libs/
│   │   ├── chart.min.js
│   │   └── fontawesome.css
│
├── templates/
│   ├── base.html
│   ├── login.html
│   ├── dashboard.html
│   ├── inventory.html
│   ├── reports.html
│
├── instance/
│   └── database.db
│
├── config.py
├── run.py
└── requirements.txt
```

---

# 🎨 **ADVANCED DASHBOARD UI (dashboard.html)**

```html
{% extends "base.html" %}

{% block content %}
<div class="dashboard">

    <div class="cards">
        <div class="card">
            <i class="fas fa-boxes"></i>
            <h3>Total Items</h3>
            <p>{{total_items}}</p>
        </div>

        <div class="card">
            <i class="fas fa-rupee-sign"></i>
            <h3>Inventory Value</h3>
            <p>{{total_value}}</p>
        </div>

        <div class="card">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Low Stock</h3>
            <p>{{low_stock}}</p>
        </div>
    </div>

    <div class="charts">
        <canvas id="pieChart"></canvas>
        <canvas id="lineChart"></canvas>
        <canvas id="barChart"></canvas>
    </div>

</div>
{% endblock %}
```

---

# 🎨 **DASHBOARD CSS (Modern UI)**

```css
body {
    font-family: 'Segoe UI';
    background: #f5f7fb;
}

.dashboard {
    padding: 20px;
}

.cards {
    display: flex;
    gap: 20px;
}

.card {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.card i {
    font-size: 24px;
    color: #2c7be5;
}

.charts {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

---

# 📊 **CHART JS (charts.js)**

```javascript
const pie = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
        labels: ['Wood', 'Nails', 'Polish'],
        datasets: [{
            data: [40, 30, 30]
        }]
    }
});

const line = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: ['Mon','Tue','Wed'],
        datasets: [{
            data: [10, 20, 15]
        }]
    }
});

const bar = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['Item1','Item2'],
        datasets: [{
            data: [5, 2]
        }]
    }
});
```

---

# 🐍 **FLASK DASHBOARD LOGIC (routes.py)**

```python
@app.route('/dashboard')
def dashboard():
    db = get_db()
    cur = db.cursor()

    cur.execute("SELECT COUNT(*) FROM items")
    total_items = cur.fetchone()[0]

    cur.execute("SELECT SUM(quantity * unit_cost) FROM items")
    total_value = cur.fetchone()[0] or 0

    cur.execute("SELECT COUNT(*) FROM items WHERE quantity <= reorder_level")
    low_stock = cur.fetchone()[0]

    return render_template("dashboard.html",
                           total_items=total_items,
                           total_value=total_value,
                           low_stock=low_stock)
```

---

# 🚀 **FINAL FEATURES (FOR HIGH MARKS)**

* Clean login system
* Role-based access
* Advanced dashboard
* Charts integration
* Reorder automation
* KPI comparison
* Modular architecture

---


