// to connect with payment collection
const Order = require("../../models/Order");
const Admin = require("../../models/Admin");

// to request payment endpoint 
const axios = require('axios');

const updateOrder = async (req, res) => {
  try {

    // first of all check whether this request is made by admin or not
      // fetching the id provided by fetchAdmin middleware
      const adminId = req.admin.id;

      // gethering the details of admin with provided id
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res
          .status(401)
          .json({ error: "Authentication fail please login", signal: "red" });
      }

    // destructuring request body
    const { payment_id, order_id, status} = req.body;

    // updating payment status 
    const url = `${process.env.BACKEND_URL}/payment/updatePayment`;
    const header = {
      "Content-type": "application/json"
    }
    const body = {
      payment_id: payment_id,
      status: status
    }
    const response = await axios.put(url,body);
    const paymentUpdate = response.data;

    if(paymentUpdate.signal === 'red'){
      return res.json({error: "payment is not updated" , signal: "red"});
    }


      // updating order 
      let newOrder = {};
      newOrder.status = status;
      const ans = await Order.findByIdAndUpdate(
        order_id,
        { $set: newOrder },
        { new: true }
      );


      return res.json({ order: ans, payment: paymentUpdate.payment, signal: "green" });

  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ error: "internal server error", signal: "red" });
  }
};

module.exports = updateOrder;
