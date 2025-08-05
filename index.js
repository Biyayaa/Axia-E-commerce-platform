require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('E-commerce platform API')
});
app.use(authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
    
});