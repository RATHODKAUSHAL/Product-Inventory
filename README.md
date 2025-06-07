# 🛒 Product Inventory System

A full-stack **Product Inventory Management System** built using the **MERN Stack** (MongoDB, Express.js, React, Node.js).

This application allows users to:

- ✅ Add new products
- 📦 Manage product **name**, **quantity**, **description**, and **categories**
- 🔍 Search and filter products
- 🗑️ Delete products
- 📊 View paginated product listings

---

## 🧱 Tech Stack

### 🔧 Backend (Node.js + Express)
- **Express.js** – For REST API routing
- **Mongoose** – MongoDB ODM
- **MongoDB** – NoSQL database
- **CORS** – For handling cross-origin requests
- **dotenv** – For environment variable management
- **nodemon** – For live development

### 🎨 Frontend (React)
- **React.js** – UI library
- **Axios** – For calling REST APIs
- **Lucide-React** – Icon library
- **Tailwind CSS** – For modern, utility-first UI styling

---

## 📁 Project Structure
product-inventory-system/
│
├── backend/ # Express.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .env
│ └── server.js
│
├── product-inventory-project/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── services/
│ │ └── App.tsx
│ └── tailwind.config.js
│
└── README.md

---

## 🚀 Features

- ✅ Add products with name, quantity, description, and categories
- 🧾 View product listings with pagination
- 🔍 Search products by name or filter by category
- 🗑️ Delete products from inventory
- 🛠️ Clean and responsive UI with Tailwind CSS

---

## 📦 Installation Guide

Follow these steps to run the project locally.


```bash

⚙️ 1. Clone the Repository
git clone https://github.com/RATHODKAUSHAL/Product-Inventory.git
cd product-inventory-system 

🛠️ 2. Setup Backend
cd backend
npm install

Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string

Start the backend server:
npm run server

🖥️ 3. Setup Frontend
cd ../product-inventory-project
npm install
npm run dev

🔗 API Base URL
Make sure the frontend communicates with the backend at:
http://localhost:5000/api

🙌 Contributing
Feel free to fork this project and contribute. Pull requests are welcome!

📄 License
This project is open-source and free to use.