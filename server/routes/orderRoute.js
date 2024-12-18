const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const auth = require('../middleware/authMiddleware');

router.post("/", auth, async (req, res) => {
    try {
      const { cartItems } = req.body;
  
    const newOrder = new Order({
        userId : req.user.userId,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        isAdmin : req.user.isAdmin,
        deliveredDate : null,
        items: cartItems,
      });
      await newOrder.save();
  
      res.status(201).json({ message: "Order saved successfully!" });
    } catch (error) {
      console.error("Error saving data: ", error);
      res.status(500).json({ message: "Failed to place an order" });
    }
  });

  router.get('/', async(req, res) => {

    const { tab } = req.query;
    try{
        const orders = await Order.find({ status : tab }).sort({ createdAt : -1, firstname : 1, lastname : 1 });
        if(orders.length < 1){
            return res.status(404).json({ error : 'No orders found' })
        }
        return res.status(200).json({ orders })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.get('/my-orders', auth, async(req, res) => {
  const { tab } = req.query;
  try{
      const orders = await Order.find({ userId : req.user.userId, status : tab }).sort({ createdAt : -1, firstname : 1, lastname : 1 });
      if(orders.length < 1){
          return res.status(404).json({ error : 'No orders found' })
      }
      return res.status(200).json({ orders });
      console.log(orders)
  }catch(err){
      res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      if (!order) {
          return res.status(400).json({ error: "The order not found" });
      }
      return res.status(200).json({ order })
  } catch (err) {
      res.status(500).json({ error: "Server error", message: err.message })
  }
});

router.put('/:id', async (req, res) => {
  const {  firstname, lastname, email, status, deliveredDate } = req.body;
  try {
      const order = await Order.findByIdAndUpdate(req.params.id, {
           firstname, lastname, email, status, deliveredDate
      });

      if (!order) {
          return res.status(400).json({ error: "order to be updated not found" })
      }
      return res.status(200).json({ message: "order updated successfrully", order })
  } catch (err) {
      res.status(500).json({ error: "Server error", message: err.message })
  }
});

module.exports = router;