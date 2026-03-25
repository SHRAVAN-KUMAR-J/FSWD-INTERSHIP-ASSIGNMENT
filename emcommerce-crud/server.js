const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

