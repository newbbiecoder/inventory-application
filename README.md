# Inventory Management Application

A simple, server-rendered inventory management system built with **Node.js**, **Express**, **PostgreSQL**, and **EJS**.  
The application allows managing categories and items, tracking stock levels, and identifying low-stock and expiring items through a clean dashboard interface.

This project was built to practice **database design**, **CRUD operations**, and **Express routing**, while keeping the UI practical and realistic.

---

## Features

- Category-based inventory organization
- Create, view, and delete inventory items
- Dashboard overview with key metrics
- Low-stock detection based on unit thresholds
- Expiry and expiring-soon tracking
- Visual status indicators for stock and expiry
- Admin password protection for destructive actions like delete
- Server-side rendered UI using EJS

---

## Tech Stack

- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  
- **Templating:** EJS  
- **Styling:** Vanilla CSS
- **Environment Config:** dotenv  

---

## Database Design

### Categories
Each category represents a type of inventory (Vegetables, Fruits, Dairy, etc.).

**Fields:**
- `id` (primary key)
- `name`
- `slug`

### Items
Each item belongs to a category via a foreign key.

**Fields:**
- `id` (primary key)
- `name`
- `quantity`
- `unit`
- `expiry_date` (nullable)
- `category_id` (foreign key)

Foreign key constraints ensure items cannot exist without a valid category.

---

## Stock Status Logic

### Low Stock
Low-stock status is determined based on **unit-specific thresholds**, for example:
- kg → less than 2
- pcs → less than 5
- liters → less than 2

This keeps logic consistent and easy to maintain.

### Expiry Status
- **Expired:** expiry date before today  
- **Expiring Soon:** expiry date within the next 7 days

Expiry status is calculated dynamically and not stored in the database.

---

## Admin Protection

Destructive actions (such as deleting items) are protected by an **admin password**.

- The password is stored in environment variables
- The server validates the password before allowing deletion
- No client-side trust or hardcoded credentials

---

## Credits
- Shop icons created by Wichai.wi - Flaticon(https://www.flaticon.com/free-icons/shop) 