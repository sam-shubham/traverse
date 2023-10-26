// import AfterPayment from "@/lib/utils/AfterPayment";
import { buffer } from "micro";
// var buffer = Buffer.Buffer;
// const stripe = require("stripe")(
//   "sk_test_51MS1EgSAwZgT5apjsbyzu8QJJF0ZGi55ICzYxAmmUmEt31nm4FoZ4TpXSxc4Hh3Dw7SNM7ltpy4gcYlLJCVeChzl008ZvZ79rb"
// );
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const webhookSecret =
//   "whsec_e70fa58959e3fba96a664df1d867d8c43295bbae96862ccf094f4780c9ed5f0c";
const webhookSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;
const fs = require("fs");

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

var SuccessPayment = (data) => {
  console.log(data);
};

const webhookHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // fs.appendFileSync(
    //   "eventLogs.txt",
    //   JSON.stringify({ type: event.type, event })
    // );

    // if (event.data.object.metadata) {
    //   console.log({ mt: event.data.object.metadata, ev: event.type });
    // }

    // console.log(event.type);

    // fs.appendFileSync(
    //   `eventLogNew.txt`,
    //   JSON.stringify({ type: event.type, event }) + ", \n"
    // );
    // console.log("Got The Event");
    // if (event.type == "invoice.paid") {
    //   // console.log("Got The 'invoice.paid || invoice.payment_succeeded' Event");
    //   // let coustomerPhoneNo = event.data.object.customer_phone;
    //   res.status(200).send({ status: true });
    //   try {
    //     // console.log("accept");
    //     // console.log(event.data.object);
    //     // console.log("accept");
    //     AfterPayment(event.data.object);
    //   } catch {
    //     console.log("Error");
    //   }

    //   // Sconsole.log(event.type, event);
    //   // fs.appendFileSync(
    //   //   `eventLogNew.txt`,
    //   //   JSON.stringify({ type: event.type, event }) + ", \n"
    //   // );
    //   return;
    //   // console.log();
    // } else {
    //   res.status(200).send({ status: true });
    //   return;
    // }

    switch (event.type) {
      case "payment_intent.payment_failed":
        res.status(200).send({ status: true });
        // Then define and call a function to handle the event payment_intent.payment_failed
        break;
      case "payment_intent.succeeded":
        res.status(200).send({ status: true });
        // Then define and call a function to handle the event payment_intent.succeeded
        break;

      case "payment_intent.created":
        res.status(200).send({ status: true });
        break;

      case "charge.succeeded":
        // AfterPayment(event.data.object);
        res.status(200).json({ status: "success" });

        break;
      default:
      // console.log(`Unhandled event type ${event.type}`);
    }
  }
};
import Cors from "micro-cors";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});
// ...
export default cors(webhookHandler);
