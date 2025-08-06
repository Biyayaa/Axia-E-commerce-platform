require('dotenv').config();
const express = require('express');

const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());



app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res)=>{
    res.send('E-commerce platform API')
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
});