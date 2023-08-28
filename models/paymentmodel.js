const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    userEmail: {
        type: String, 
        required: true
      },
  orderId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentId: {
    type: String,
  },
 
  paymentDate: {
    type: Date, // Store the date and time of payment
    default: Date.now, // Set the default value to the current date and time
  }
  
});

const membership = mongoose.model('membership', membershipSchema);

module.exports = membership;