import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";
import crypto from "crypto";
import { createkey, decrypthex } from "@/lib/Encryption/encryption";

// var decryptText = (text) => {
//   console.log(text);
//   let cipher = crypto.createCipheriv(
//     "AES-128-ECB",
//     Buffer.from("ForMapsEncryptedKey".substring(0, 16), "utf8"),
//     Buffer.alloc(0)
//   );
//   let encrypted = cipher.update(text, "hex", "utf-8");
//   encrypted += cipher.final("utf-8");
//   return encrypted;
// };
const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).get(async (req, res) => {
  var url = new URL(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE"
  );
  url.searchParams.append(
    "input",
    // decryptText(
    new URL("https://example.com/" + req.url).searchParams.get("input")
    // )
  );
  try {
    var { data: axres } = await axios.get(url.href);
    res.send({
      success: true,
      data:
        axres?.predictions.filter(
          (el) =>
            el.types.includes("locality") ||
            el.types.includes("administrative_area_level_1")
        ) || [],
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(axres);
  }
});

export default router;
