const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const auth = require('../middleware/authMiddleware')

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/', auth, async(req, res) => {
    const { firstname, lastname, email} = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.user.userId, {
            firstname, lastname, email
        });

        if(!user){
            return res.status(404).json({ error : 'User to be updated not found' });
        }
        console.log(user)
        return res.status(200).json({ message : 'user updated successfully!', user })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;