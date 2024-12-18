const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.DATABASE_CONNECTION).then(() => {
    console.log('Database connected');
});

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/api/users', require('./routes/userRoute.js'));
app.use('/api/products', require('./routes/productRoute.js'));
app.use('/api/orders', require('./routes/orderRoute.js'));
app.use('/api/profile', require('./routes/profileRoute.js'));
app.use('/api/stripe', require('./routes/stripeRoute.js'));

app.listen(process.env.PORT, () => {
    console.log('listening to port ' + process.env.PORT);
})

