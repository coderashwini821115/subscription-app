import {instance} from '../server.js';
import crypto from "crypto";
export const checkout = async(req, res) => {
const options = {
    amount: Number(req.body.plan)*100,
    currency: 'INR',
};
const order = await instance.orders.create(options)
.catch((e) => console.log(e));
console.log(order);
res.status(200).json({
    success: true,
    order,
});
};

export const paymentVerification = async (req, res) => {
    res.status(200).json({
        success: true,
    })
  };
