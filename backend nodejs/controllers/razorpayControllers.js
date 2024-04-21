const Razorpay = require('razorpay');
const crypto = require('crypto');

const order = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    const orderFromFrontend = req.body;

    const orderCreated = await razorpay.orders.create(orderFromFrontend);

    if (!orderCreated) {
      return res.status(500).send({
        success: false,
        message: 'failed to generate order ID',
      });
    }

    res.status(201).send(orderCreated);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error?.message,
    });
  }
};

const validateOrder = async (req, res) => {
  try {
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest('hex');

    if (digest !== razorpay_signature) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Transaction',
      });
    }

    res.status(200).send({
      success: true,
      message: 'transaction is successful',
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: error?.message,
    });
  }
};

module.exports = {
  order,
  validateOrder,
};
