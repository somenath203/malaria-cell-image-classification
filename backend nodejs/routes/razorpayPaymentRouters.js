const router = require('express').Router();

const { order, validateOrder } = require('../controllers/razorpayControllers');


router.post('/order', order);

router.post('/validate-transaction', validateOrder);



module.exports = router;