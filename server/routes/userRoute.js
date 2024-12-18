const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const auth = require('../middleware/authMiddleware')

router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        if(users.length < 1){
            return res.status(404).json({ error : 'No users found' })
        }
        return res.status(200).json({ users })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
           return res.status(404).json({ error : 'User not found' })
        }
        return res.status(200).json({ user })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.post('/register', async(req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        if(!user){
            return res.status(400).json({ error : "Faild to create a user" });
        }

        await user.save();
        return res.status(201).json({ message : "User created successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User with this email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const payload = {
            userId: user._id,
            firstname : user.firstname,
            lastname : user.lastname,
            isAdmin : user.isAdmin,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' });
        res.json({  token, user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.put('/:id', async(req, res) => {
    const { fistname, lastname, email, password, isAdmin } = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            fistname, lastname, email, password, isAdmin
        });

        if(!user){
            return res.status(404).json({ error : 'User to be updated not found' });
        }
        return res.status(200).json({ message : 'user updated successfully!', user })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({ error : 'User to be deleted not found' })
        }
        return res.status(200).json({ message : 'User deleted successfully', user })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
});

// router.get('/profile', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

//forgot password functionality here........................................

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate password reset token
  const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_TOKEN_SECRET, {
    expiresIn: '1h',
  });

  // Save reset token to user document
  user.passwordResetToken = resetToken;
  await user.save();

  // Send password reset email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USERNAME,
    to: user.email,
    subject: 'Password Reset Request',
    text: `
      Click this link to reset your password: 
      ${process.env.FRONTEND_URL}/reset-password/${resetToken}
    `,
  };

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Password reset email sent successfully' });
  });
});

// routes/auth.js
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    jwt.verify(token, process.env.RESET_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
  
      const userId = decoded.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = await bcrypt.hash(password, 12);
      user.passwordResetToken = null;
      await user.save();
  
      res.json({ message: 'Password reset successfully' });
    });
  });


module.exports = router;