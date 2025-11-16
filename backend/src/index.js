const connectDB = require('./config/db');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
