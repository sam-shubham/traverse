import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";
import crypto from "crypto";
import { createkey, encrypthex } from "@/lib/Encryption/encryption";

var encryptText = (text) => {
  let cipher = crypto.createCipheriv(
    "AES-128-ECB",
    Buffer.from("ForMapsEncryptedKey".substring(0, 16), "utf8"),
    Buffer.alloc(0)
  );
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).get(async (req, res) => {
  await dbConnect();
  var cities = [];
  var citiesLength = await allCityModel.count();
  var random = Math.floor(Math.random() * citiesLength);

  var allcities = await allCityModel
    .find(
      {},
      { photos: 1, name: 1, url: 1, icon_background_color: 1, place_id: 1 }
    )
    .skip(
      random -
        new URL("https://example.com/" + req.url).searchParams.get("limit") >=
        0
        ? random -
            new URL("https://example.com/" + req.url).searchParams.get("limit")
        : 0
    )
    .limit(new URL("https://example.com/" + req.url).searchParams.get("limit"));

  res.send({ success: true, data: allcities });
  //   allcities.allCity = allcities.allCity.map((el) => {
  //     el.photos = el.photos.map((ele) => ({
  //       ...ele,
  //       photo_reference:
  //         //   encryptText(
  //         ele.photo_reference,
  //       // ),
  //     }));
  //     return el;
  //   });
  //   if (new URL("https://example.com/" + req.url).searchParams.get("limit")) {
  //     for (
  //       let index = 0;
  //       index <
  //       Number(
  //         new URL("https://example.com/" + req.url).searchParams.get("limit")
  //       );
  //       index++
  //     ) {
  //       cities.push(
  //         allcities.allCity[Math.floor(Math.random() * allcities.allCity.length)]
  //       );
  //     }
  //   } else {
  //     for (let index = 0; index < 10; index++) {
  //       cities.push(
  //         allcities.allCity[Math.floor(Math.random() * allcities.allCity.length)]
  //       );
  //     }
  //     res.send({ success: true, data: cities });
  //   }
});

export default router;
