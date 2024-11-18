const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const apiLimiter = require('./middlewares/rateLimiter');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(apiLimiter); 

connectDB();

app.use('/auth', authRoutes);
app.use('/api', tradeRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})