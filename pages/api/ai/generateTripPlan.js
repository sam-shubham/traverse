import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";
import crypto from "crypto";
import { createkey, decrypthex } from "@/lib/Encryption/encryption";

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).post(async (req, res) => {
  let { travel_days, interests, extras, destination } = req.body;
  var url = new URL(
    `https://www.buildai.space/api/run?appId=5KrHivL0dPGT2TVXKrzv`
  );

  if (!extras) extras = "";
  console.log(req.url);

  let { data } = await axios({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userInput: extras,
      followupChat: [],
      fields: {
        travel_days,
        interests,
        destination,
      },
    },
  });

  //   let results = data.results
  //     .filter((i) => i?.cardTags && i.cardTags.length > 2)
  //     .map((i) => ({ place: i.cardTags[1], image: i.cardImageUrl }))
  //     .map(({ place: i, image }) => ({
  //       image,
  //       place: i[0].toUpperCase() + i.slice(1, i.length),
  //     }));

  //   results = results.filter((i, index) => results.indexOf(i) == index);

  res.send(data);

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
