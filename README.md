# Mithaas – MERN Inventory Management Application

## 🔗 Live Application URL  
https://sweetshop-ebbi.onrender.com
## 🔌 Backend API URL  
https://sweetshop-ebbi.onrender.com

## 🔐 Demo Login Credentials : use the below credentials for faster login

### Admin
Email: mithaasAdmin@gmail.com
Password: 123456

### User
Email: mithaas@gmail.com
Password: 123456

## 🧠 My AI Usage

### AI Tools Used
- ChatGPT
- GitHub Copilot
- Cursor AI
- Figma AI

### How I Used These Tools
- ChatGPT helped in debugging Express routes, improving UI concepts, generating component structures, handling JWT logic, and solving deployment issues.  
- GitHub Copilot auto-completed repetitive React JSX patterns, Express middleware, and CRUD operations.  
- Cursor AI refactored code across multiple files, improved TailwindCSS layout, and suggested better React structure.  
- Figma AI generated UI layout ideas for login/register screens, color palettes, and component spacing.

## 📦 Project Overview
SweetShop is a full-stack MERN application for managing sweets inventory, purchases, stock, and admin operations. It includes authentication, role-based access, image uploads, and a fully responsive interface. The frontend is hosted on Vercel, the backend on Cyclic.sh, and MongoDB Atlas is used as the database.

## 🛠 Tech Stack
**Frontend:** React (Vite), TailwindCSS, Lucide Icons, Vercel  
**Backend:** Node.js, Express.js, JWT, Multer, Cloudinary, Cyclic.sh  
**Database:** MongoDB Atlas  

## ⚙️ Environment Variables

### Backend `.env`
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

### Frontend `.env`
VITE_API_URL=https://your-backend.cyclic.app

## ▶️ Running Locally

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## 🧪 Basic API Routes
POST /api/auth/register
POST /api/auth/login
GET /api/sweets
POST /api/sweets
PUT /api/sweets/:id
DELETE /api/sweets/:id
