const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.use(errorHandler);

module.exports = app;
