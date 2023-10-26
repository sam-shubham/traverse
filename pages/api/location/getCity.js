import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";
import crypto from "crypto";
import { createkey, decrypthex } from "@/lib/Encryption/encryption";
import { JSDOM } from "jsdom";

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
}).post(async (req, res) => {
  let place_id = req.body.place_id;
  var enabled = [
    "ChIJO_PkYRozGQ0R0DaQ5L3rAAQ",
    "ChIJ0WGkg4FEzpQRrlsz_whLqZs",
    "ChIJOwg_06VPwokRYv534QaPC8g",
    "ChIJRcbZaklDXz4RYlEphFBu5r0",
  ];
  if (
    enabled.includes(req.body.place_id) ||
    req.body.key == "aditya_dev" ||
    true
  ) {
    if (req.body.mode == "name") {
      var url = new URL(
        "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE&inputtype=textquery"
      );
      url.searchParams.append("input", req.body.name);

      var { data: getplaceID } = await axios.get(url.href);
      if (getplaceID.status == "OK" && getplaceID.candidates[0]) {
        place_id = getplaceID.candidates[0].place_id;
      } else return;
    }

    if (!place_id) return;

    var url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE&fields=photos,name,formatted_address,url,vicinity,address_components"
    );
    url.searchParams.append("place_id", place_id);
    try {
      var { data: getRefrence } = await axios.get(url.href);
      // var getRedirect = await axios.get(
      //   "https://en.wikipedia.org/wiki/" + getRefrence.result.name
      // );
      // console.log(getRedirect);
      // console.log(getRefrence);

      var { data: getRedirect } = await axios.get(
        "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" +
          getRefrence.result.name
      );
      // console.log("asdsaf");
      // console.log(
      //   "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" +
      //     JSON.parse(JSON.stringify(getRedirect.pages))
      // );
      if (!getRedirect.pages[0]) {
        return res.send({
          success: true,
          data: getRefrence.result,
          desc: "",
        });
      }

      var filteredname = getRedirect.pages[0].key;
      var relative = getRefrence.result.address_components.filter((el) =>
        el.types.includes("administrative_area_level_1")
      )[0]?.long_name;
      var relativecontry = getRefrence.result.address_components.filter((el) =>
        el.types.includes("country")
      )[0]?.long_name;
      var getfilteredredirect = "";
      getRedirect.pages.forEach((el) => {
        // if (
        //   el.key.includes(filteredname) &&
        //   (el.key.includes(`,_${relative}`) ||
        //     el.key.includes(`,_${relativecontry}`) ||
        //     el.key.includes("_district") ||
        //     el.key.includes("_City") ||
        //     el.key.includes("_Country"))
        // )
        if (
          el.key == filteredname + `,_${relative}` ||
          el.key == filteredname + `,_${relativecontry}` ||
          el.key == filteredname + "_district" ||
          el.key == filteredname + "_City" ||
          el.key == filteredname + "_Country" ||
          el.key == filteredname + "_(country)"
        ) {
          if (getfilteredredirect == "") {
            getfilteredredirect = el.key;
          }
        }
      });
      var { data: getDescription } = await axios.get(
        "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&explaintext=true&titles=" +
          (getfilteredredirect || filteredname)
      );
      // var { data: getDescription } = await axios.get(
      //   "https://en.wikipedia.org/wiki/" + getRefrence.result.name
      // );
      // var {
      //   window: { document },
      // } = new JSDOM(getDescription);
      // var mainarr = [];
      // document
      //   .querySelector("#mw-content-text")
      //   .firstElementChild.querySelectorAll("p,ul")
      //   .forEach((el) => mainarr.push(el.textContent.replaceAll("\n", "")));

      // var replaceall = [
      //   ["(listen)", ""],
      //   [/\[\d+\]/, ""],
      // ];
      // mainarr = mainarr.map((el) => {
      //   replaceall.forEach((ell) => {
      //     if (typeof ell[0] == "object") {
      //       el = el.replace(ell[0], ell[1]);
      //       el = el.replace(/\[.*\]/gm, "");
      //       el = el.replace(/\(.*\)/gm, "");
      //     } else {
      //       el = el.replaceAll(ell[0], ell[1]);
      //     }
      //   });
      //   return el;
      // });
      // mainarr = mainarr.filter((el) => {
      //   if (el && el.length > 60) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // });

      var splitedText = getDescription.query.pages[
        Object.keys(getDescription.query.pages)[0]
      ].extract.replace(/==+/g, "==");
      splitedText = splitedText
        .split("==")
        .map((el, index) => {
          if (index == 0) {
            return { title: "Overview", desc: el };
          }
          if (
            splitedText.split("==")[index + 1] &&
            splitedText
              .split("==")
              [index + 1].replaceAll(/\t+/g, "")
              .replace(/\n+/g, "\n") != "\n" &&
            index % 2 == 1
          ) {
            var title = el;
            var desc = splitedText.split("==")[index + 1];
            return { title, desc };
          }
        })
        .filter((el) => el);

      res.send({
        success: true,
        data: getRefrence.result,
        desc: splitedText,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ success: false, data: "" });
    }
  } else {
    res.status(400).send({ success: false, data: "" });
  }
});

export default router;
