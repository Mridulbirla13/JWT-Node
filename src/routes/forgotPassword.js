// routes/auth.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user');
const { sendResetPasswordEmail } = require('../services/emailService');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    sendResetPasswordEmail(user.email, token);

    res.status(200).json({ message: 'Password reset link sent to email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
      }
  
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error.' });
    }
  });

module.exports = router;
