const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
dotenv.config(); 
connectDB();
const app = express();
app.use(cors());    
app.use(express.json());
//static folfer for images
app.use('/uploads', express.static('uploads'));
//routes
app.use('/api/auth', require('./routes/authRoutes'));
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
