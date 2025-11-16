const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Sweet = require("./src/models/Sweet");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const sweets = [
  { name: "Gulab Jamun", category: "Indian", price: 20, quantity: 50 },
  { name: "Rasgulla", category: "Bengali", price: 15, quantity: 40 },
  { name: "Barfi", category: "Indian", price: 25, quantity: 60 },
  { name: "Ladoo", category: "Indian", price: 10, quantity: 100 },
  { name: "Milk Cake", category: "Milk Based", price: 30, quantity: 35 },
];

async function seed() {
  await Sweet.deleteMany();          // Clears old data (optional)
  await Sweet.insertMany(sweets);    // Inserts many at once
  console.log("Inserted sweets!");
  mongoose.disconnect();
}

seed();
