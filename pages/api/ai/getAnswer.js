import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";
import crypto from "crypto";
import { createkey, decrypthex } from "@/lib/Encryption/encryption";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).post(async (req, res) => {
  // if (!extras) extras = "";
  // console.log(req.url);

  //   let { data } = await axios({
  //     url,
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       userInput: extras,
  //       followupChat: [],
  //       fields: {
  //         travel_days,
  //         interests,
  //         destination,
  //       },
  //     },
  //   });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 400,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful Travel assistant bot. Your Name is TRAVERSE AI, You Work For A trip Planning Website Traverse. You help clients in planning their trips",
      },
      ...req.body.messages,
    ],
  });

  let resp = response.choices[0].message;

  let jsonResp = resp;

  res.send({ success: true, message: jsonResp });

  //   let results = data.results
  //     .filter((i) => i?.cardTags && i.cardTags.length > 2)
  //     .map((i) => ({ place: i.cardTags[1], image: i.cardImageUrl }))
  //     .map(({ place: i, image }) => ({
  //       image,
  //       place: i[0].toUpperCase() + i.slice(1, i.length),
  //     }));

  //   results = results.filter((i, index) => results.indexOf(i) == index);

  // res.send(data);

  //   console.log(results);

  // return;

  //   try {
  //     var { data: axres } = await axios.get(url.href, { responseType: "stream" });
  //     res.send(axres);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).send(axres);
  //   }
});

export default router;
