const result = require('dotenv').config({ path: 'config.env' });
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require("stripe")(process.env.STRIPE_KEY);
const mongoose = require('mongoose');
const morgan=require("morgan")
app.use(morgan('tiny'));
const app = module.exports = express();

const connectDb = async () => {
  try {       
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDb();

app.use(helmet());
app.use(cookieParser());

var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false
  },
  resave: false,
  saveUninitialized: true,
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

app.use(session(sess))

if (result.error) throw result.error;

app.use(bodyParser.json());

app.get('/product-info/:id', function (req, res) {
  stripe.skus.list({ product: req.params.id },
    function (err, product) {
      if (err) {
        console.error("Stripe SKU list error:", err);
        return res.status(500).send(err);
      }
      res.json(product);
    });
});

app.get('/product-info/', function (req, res) {
  stripe.skus.list(
    function (err, skus) {
      if (err) {
        console.error("Stripe SKU list error:", err);
        return res.status(500).send(err);
      }
      res.json(skus.data);
    });
});

app.use(express.static(path.join(__dirname, '.', 'build')));

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '.', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Listening on port", PORT);
});
