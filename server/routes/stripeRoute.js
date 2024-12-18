const express = require('express');
const Stripe = require('stripe');
const router = express.Router();
const dotenv = require('dotenv').config();
const Order = require('../models/anotherOrder');

const stripe = Stripe(process.env.STRIPE_SECRETE_KEY); 


router.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'zar', 
        product_data: {
          name: item.title, 
        },
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: 'http://localhost:3000/payment-successful', 
      cancel_url: 'http://localhost:3000/payment-cancelled',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});


// const stripe = require('stripe')('your-stripe-secret-key');
 // Import your Order schema


// Stripe webhook secret (get this from the Stripe Dashboard)
const endpointSecret = 'whsec_c96d7627cd898915912e7206ab34c8bcde57f2e376be9730ce55f24fc87b877f';

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    // Save the order to the database
    const order = new Order({
      userId: session.metadata.userId || null, // Optional
      items: lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: item.amount_total / 100, // Convert cents to main currency unit
      })),
      totalAmount: session.amount_total / 100, // Convert cents to main currency unit
      paymentStatus: session.payment_status,
      paymentIntentId: session.payment_intent,
      customerDetails: {
        name: session.customer_details.name,
        email: session.customer_details.email,
        phone: session.customer_details.phone,
        address: session.customer_details.address,
      },
    });

    try {
      await order.save();
      console.log('Order saved:', order);
    } catch (err) {
      console.error('Error saving order:', err.message);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});





module.exports = router;
