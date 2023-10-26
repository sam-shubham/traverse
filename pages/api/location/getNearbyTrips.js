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
  let { latitude, longitude, radius } = req.body;
  var url = new URL(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE&type=tourist_attraction`
  );

  console.log(url);

  if (!latitude || !longitude) return;
  console.log(req.url);

  let { data } = await axios.get(url.href);

  //   let results = data.results
  //     .filter((i) => i?.cardTags && i.cardTags.length > 2)
  //     .map((i) => ({ place: i.cardTags[1], image: i.cardImageUrl }))
  //     .map(({ place: i, image }) => ({
  //       image,
  //       place: i[0].toUpperCase() + i.slice(1, i.length),
  //       // url:`/`
  //     }));

  //   results = results.filter((i, index) => results.indexOf(i) == index);
  console.log(data);

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
