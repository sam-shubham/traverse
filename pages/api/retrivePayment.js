import nc from "next-connect";

import axios from "axios";
import dbConnect from "@/lib/Database/dbconnect";
import ordermodel from "@/lib/Database/models/ordermodel";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post(async (req, res) => {
  await dbConnect();
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.body.intent);
    const charge = await stripe.charges.retrieve(
      paymentIntent["latest_charge"]
    );

    await ordermodel.findByIdAndUpdate(paymentIntent.metadata.orderId);

    res.send({
      link: paymentIntent.metadata.link,
      receipt: charge.receipt_url,

      //   msg:
      //     "Congrats Your Account Is Updated With " +
      //     datresp.currentCredit +
      //     " Credit" +
      //     " At Your Number :- " +
      //     paymentIntent.metadata.number +" On " +,
    });
  } catch (error) {
    console.log(error);
    res.send({ error: true });
  }
  //   console.log(paymentIntent.metadata);
});

export default handler;
