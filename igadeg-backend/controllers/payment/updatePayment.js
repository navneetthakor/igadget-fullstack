// to connect with payment collection
const Order = require("../../models/Order");
const Payment = require("../../models/Payment");


const updatePayment = async (req, res) => {
  try {

    // destructuring request body
    const { order_id, session_id, payment_id } = req.body;
    const newPayment = {};

    if (order_id) { //to add order id in payment document
      newPayment.order_id = order_id;

      const ans = await Payment.findByIdAndUpdate(
        payment_id,
        { $set: newPayment },
        { new: true }
      );

      return res.json({ payment: ans, signal: "green" });
    } else if (payment_id) { //to mark payment status by using admin panel
      const oldPayment = await Payment.findById(payment_id);

      if(req.body.status === 'Cancelled') {
        if(oldPayment.status === 'Completed') newPayment.status = 'Send-Back';
        else newPayment.status = 'Cancelled'
      }
      else if(req.body.status === 'Returned'){
        newPayment.status = 'Refunded';
      }
      else {
        newPayment.status = req.body.status;
      }
      const ans = await Payment.findByIdAndUpdate(
        payment_id,
        { $set: newPayment },
        { new: true }
      );

      return res.json({ payment: ans, signal: "green" });
    }
    
    // if code reaches here that means that payment made throud stripe and it's completed now 
      newPayment.session_id = session_id;
      newPayment.status = req.body.status;

      const ans = await Payment.findOneAndUpdate(
        {session_id: session_id},
        { $set: newPayment },
        { new: true }
      );

    // if payment is cancelled through stripe session then
    // correspoing order should also be cancelled 
    let order = {};
    if(req.body.status === 'Cancelled'){
        order = await Order.findByIdAndUpdate(
        ans.order_id,
        {$set: {status: "Cancelled"}},
        {new: true}
        );
    }

      return res.json({ payment: ans, order: order, signal: "green" });

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "internal server error", signal: "red" });
  }
};

module.exports = updatePayment;
