const app = require('./index.js');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Email = require('email-templates');
app.use(bodyParser.json());
const config = require('./src/assets/store_config.json');
const OrderModel = require('./models/Order.js');
const Counter = require('./models/Counter.js');

const getNextSequence = async (name) => {
  if (await Counter.exists({ name: name })) {
    let ret = await Counter.findOneAndUpdate({ name: name }, { $inc: { seq: 1 } }, {
      new: true
    });
    return ret.seq
  }

  let ret = new Counter({ name: name });
  await ret.save();
  return ret.seq
}


let transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});



const email = new Email({
  message: {
    from: process.env.EMAIL_ADDRESS
  },
  send: true,
  views: {
    options: {
      extension: 'hbs'
    }
  },
  transport: transporter
});

function sendEmail(status, order) {

  const time = new Date(order.createdAt);
  email
    .send({
      template: status,
      message: {
        to: order.email,
      },
      locals: {
        order: order,
        order_id: order.order_id,
        order_total: (order.total / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        order_date: `${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`,
        order_shipping: order.shipping.cost,
        items: order.items,
      }
    }).catch(console.error)
}



app.post('/order/pay', async function (req, res) {
  try {
    const orderBody = req.body.orderBody
    orderBody.order_id = await getNextSequence("order_id_sequence")
    orderBody.status = "Ordered"
    const order = new OrderModel(req.body.orderBody)
    order.total = 0
    await order.save();

    let total = 0
    order.items.forEach(item => {
      total = total + (item.price * item.quantity)
    })


    order.total = (total + order.shipping.cost) * 100
    orderBody.total = order.total
    orderBody.createdAt = order.createdAt
    await order.save()

    const charge = await stripe.charges.create({
      amount: Math.round(order.total),
      currency: 'usd',
      source: req.body.source,
      description: 'Charge for phone lasso test',
    });
    sendEmail(order.status, orderBody)
    res.json(order);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
    return;
  }
});

app.post('/order/update', async function (req, res) {
  try {
    const orderBody = req.body
    orderBody.status = "Shipped"

    await OrderModel.findByIdAndUpdate(orderBody._id, orderBody)
    sendEmail(orderBody.status, orderBody)
    res.json(orderBody)
  } catch (err) {
    console.log(err);
  }
});


app.get('/orders/all', async function (req, res) {
  let orders = await OrderModel.find()
  res.json(orders)
});

app.get('/orders/:status', async function (req, res) {
  let orders = await OrderModel.find({ status: req.params.status })
  res.json(orders)
});