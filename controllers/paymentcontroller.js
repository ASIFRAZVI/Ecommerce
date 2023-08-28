const dotenv=require('dotenv')
const membership=require('../models/paymentmodel')
const signup=require('../models/signupmodel')
const Razorpay = require('razorpay');

//to load.env files
dotenv.config()
// Create a new instance of Razorpay with your API key and secret
const razorpay = new Razorpay({
  key_id:process.env.rzp_key_id,
  key_secret:process.env.rzp_key_secret
});


// Controller function to create a new order
exports.createOrder = async (req, res) => {
  try {
   const { amount, currency } = req.body;
   const userEmail = req.user.email;
    const userId = req.user.id;
    // Create the order using the Razorpay API
    const order = await razorpay.orders.create({
      amount, // Amount in the smallest currency unit (e.g., paise in India)
      currency,
      receipt: 'order_receipt', // Unique identifier for the order receipt
      payment_capture: 1, // Automatically capture the payment
    });



// Store the payment details in MongoDB
const membership1 = new membership({
  orderId: order.id,
  amount: order.amount,
  currency: order.currency,
  userId:userId,
  userEmail: userEmail,
   paymentId: '',
   paymentDate: new Date()
});
  

 await membership1.save();
 

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      
    });
  } catch (error) {
    res.render("error2");
  }
};

// Controller function to save membership and update isPro field
exports.saveMembership = async (req, res) => {
  try {
    const { orderId, paymentId, userId } = req.body;
    // Find the membership using the orderId
    const membership1 = await membership.findOne({ orderId });
    if (!membership1) {
      res.render("error2");
    }
    // Update the membership with paymentId
    membership1.paymentId = paymentId;
    membership1.paymentDate = new Date();
    await membership1.save();

    // Find the user using userId and update isPro field
    const user = await signup.findById(membership1.userId);
    if (!user) {
      res.render("error2");
    }
    await user.save();

    res.json({ message: 'Membership saved and isPro field updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save membership and update isPro field' });
  }
};


