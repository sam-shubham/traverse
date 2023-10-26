import usermodel from "@/lib/Database/models/usermodel";
import dbConnect from "@/lib/Database/dbconnect";
import jwt from "jsonwebtoken";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

export default async function handler(req, res) {
  var authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization) {
    res.send({ success: false, msg: "Please Login To Access" });
    return;
  }
  if (
    authorization.includes(" ") &&
    (authorization.includes("bearer") || authorization.includes("Bearer"))
  ) {
    authorization = authorization.split(" ")[1];
  }
  var token = authorization;
  var verifyOptions = {
    issuer: process.env.Issuer,
    subject: process.env.Subject,
    audience: process.env.Audience,
    // algorithm: ["RS256"],
  };
  // var publicKEY = `${process.env.publicKEY}`;
  try {
    var legit = jwt.verify(
      token,
      "websitepasswordProtected-AppAmbient",
      verifyOptions
    );
    req.user = legit._id;
  } catch (error) {
    res.send({ error: true, msg: "Please login to purchase" });
    return;
  }
  await dbConnect();
  const { items } = req.body;
  const origin = req.headers.origin;

  var User = await usermodel.findById(req.user);
  if (!User) {
    res.send({ error: true, msg: "Please Register" });
    return;
  }
  if (User.StripeCustomer) {
    var customer = User.StripeCustomer;
  } else {
    var customer = await stripe.customers.create();
    await usermodel.findByIdAndUpdate(req.user, {
      StripeCustomer: customer,
    });
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-08-01" }
  );

  // var amount = await calculateOrderAmount(items);
  var currency = "inr";
  var price = 6999;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100),
    currency: currency,
    automatic_payment_methods: {
      enabled: true,
    },
    description: "Travel Chatbot Service",
    customer: customer.id,
    metadata: {
      link: `/bookings/${customer.id}`,
    },
  });

  // return;
  res.send({
    customerOptions: {
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    },
    currency: currency,
    PaymentMoney: price,
    clientSecret: paymentIntent.client_secret,
  });
}
