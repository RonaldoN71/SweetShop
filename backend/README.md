# Mithaas Backend (Express + MongoDB)

This is the backend API for the SweetShop MERN application.  
Built with **Node.js**, **Express**, **MongoDB**, **JWT Auth**,**Multer** and **Cloudinary** for image uploads.

## 🚀 Start Locally
npm install
npm run dev

## ⚙️ Environment Variables
Create `.env`:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

## 🔌 Main Routes
POST /api/auth/register
POST /api/auth/login
GET /api/sweets
POST /api/sweets
PUT /api/sweets/:id
DELETE /api/sweets/:id

## 🌐 Deployment
Backend hosted on **Cyclic.sh**.