import membersmodel from "../database/models/membersmodel";
import paymentsys from "../database/models/paymentsys";
import axios from "axios";
import { generateEtags } from "@/next.config";
import { createVerify, randomBytes } from "crypto";
import dbConnect from "../Database/dbconnect";
import userStage from "../database/models/userStage";
import contrycodes from "./ContryCodes";
import BotSettings from "../database/models/BotSettings";

export default async (object, user) => {
  await dbConnect();
  //   console.log(object);
  var datresp = await paymentsys.findOne({ type: "MoneyCreditRatio" });
  var creditsToUpdate = datresp.currentCredit;
  var contrycode = "";
  contrycodes.forEach((el) => {
    if (el.code == object.account_country) {
      contrycode = el.dial_code.replace("+", "").trim();
    }
  });
  var botsetting = await BotSettings.findOne({ type: "msgproccess" });
  if (botsetting.data["Add Contry Code Forcefully after payment "]) {
    object.customer_phone =
      contrycode + String(object.customer_phone).replace("+", "").trim();
  }
  // console.log(object.customer_phone);
  var member = await membersmodel.findOne({
    number: String(object.customer_phone).replace("+", "").trim(),
  });
  if (!member) {
    var userNumber = String(object.customer_phone).replace("+", "").trim();
    // return;
    await createUser({
      number: userNumber,
      name: object.customer_name.trim(),
      email: object.customer_email,
      industry: "N/A",
      generatedPass: true,
      password: randomBytes(2).toString("hex"),
      membership: true,
      trailCredits: Math.floor(
        (parseFloat(object.amount_paid) / 100) * creditsToUpdate
      ),
      StripeCustomer: { id: object.customer },
      StripePaymentIntent: object.payment_intent,
    });
    await userStage.deleteMany({ number: userNumber });
    var toup = new userStage({
      number: userNumber,
      stage: "takeIndustryWhenSignupWithStripe",
    });
    await toup.save();

    return;
  }

  //   email: {
  //     type: String,
  //     required: true,
  //   },
  //   password: {
  //     type: String,
  //     require: true,
  //   },
  //   generatedPass: {
  //     type: Boolean,
  //     require: true,
  //   },
  //   industry: object.,

  //   membership: true,
  //   trailCredits: "",
  //   StripeCustomer: "",
  //   StripeSubscriptionID: "",
  // });
  var member = await membersmodel.findOneAndUpdate(
    { number: object.customer_phone.replace("+", "").trim() },
    {
      $inc: {
        trailCredits: Math.floor(
          (parseFloat(object.amount_paid) / 100) * creditsToUpdate
        ),
      },
      membership: true,
    }
  );
  await axios.post(
    "https://hook.us1.make.com/chqww5c8et7s2zkqp6zlh5ak5dnlrpkm",
    {
      number: object.customer_phone.replace("+", "").trim(),
      membership: true,
      email: member.email,
      industry: member.industry,
    }
  );

  console.log(member, "paid");

  axios
    .post("http://localhost:8081/sendMessage", {
      number: object.customer_phone.replace("+", "").trim(),
      credits: (parseFloat(object.amount_paid) / 100) * creditsToUpdate,
      // totalCredits: member.trailCredits,
    })
    .catch((er) => console.log(er));

  console.log("Payment Recieved");
};

async function createUser(data) {
  try {
    let user = new membersmodel({
      ...data,
    });

    let d = await user.save();
    try {
      var NewMemberforHook = {
        number: data.number,
        name: data.name,
        email: data.email,
        industry: data.industry,
        membership: true,
        verified: false,
      };
      try {
        await axios.post(
          "https://hook.us1.make.com/5terlzxosvqikod7o6nw6wk4nyt4534t",
          NewMemberforHook
        );
      } catch (error) {
        console.log(error);
      }
      // await axios.post(
      //   "https://hook.eu1.make.com/xqbvjedooy9w8vxy4wc1bvfe4mte4x6k",
      //   {
      //     number: data.number,
      //     membership: true,
      //     email: data.email,
      //     industry: data.industry,
      //   }
      // );
    } catch {}

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
