require('dotenv').config();
const express = require('express');
const cors = require('cors');

const razorpayRouter = require('./routes/razorpayPaymentRouters');

const app = express();


app.use(express.json());
app.use(cors({
    origin: '*'
}));


app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'server is up and running successfully'
    })
});


app.use(razorpayRouter);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});