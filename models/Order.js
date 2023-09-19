const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  status: String,
  order_id: Number,
  shipping: {
    cost: Number,
    name: String,
    tracking_number: {
      type: String,
      default: null
    },
    address: {
      line1: {
        default: '',
        type: String
      },
      line2: {
        default: '',
        type: String
      },
      city: {
        default: '',
        type: String
      },
      state: {
        default: '',
        type: String
      },
      country: {
        default: '',
        type: String
      },
      postal_code: {
        default: '',
        type: String
      },
    },
  },
  email: String,
  total: Number,
}, { timestamps: true });




module.exports = OrderModel = mongoose.model("OrderModel", OrderSchema);
