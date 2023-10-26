var allmainCityArray = [
  "Bangkok ",
  "Paris ",
  "London ",
  "Dubai ",
  "New York City ",
  "Singapore ",
  "Kuala Lumpur ",
  "Phuket ",
  "Tokyo ",
  "Istanbul ",
  "Macau ",
  "Delhi ",
  "Miami ",
  "Rome ",
  "Taipei ",
  "Bali ",
  "Mumbai ",
  "Mecca ",
  "Prague ",
  "Hong Kong ",
  "Pattaya ",
  "Seoul ",
  "Barcelona ",
  "Shenzhen ",
  "Shanghai ",
  "Milan ",
  "Cancún ",
  "Agra ",
  "Las Vegas ",
  "Amsterdam ",
  "Antalya ",
  "Denpasar ",
  "Osaka ",
  "Los Angeles ",
  "Vienna ",
  "Berlin ",
  "Madrid ",
  "Johor Bahru ",
  "Johannesburg ",
  "Riyadh ",
  "Ho Chi Minh City ",
  "Venice ",
  "Orlando ",
  "Chennai ",
  "Jaipur ",
  "Athens ",
  "Dublin ",
  "Florence ",
  "Moscow ",
  "Toronto ",
  "Hanoi ",
  "Beijing ",
  "Ha Long ",
  "Sydney ",
  "Budapest ",
  "Punta Cana ",
  "San Francisco ",
  "Jakarta ",
  "Dammam ",
  "Munich ",
  "Lisbon ",
  "Zhuhai ",
  "Heraklion ",
  "Penang Island ",
  "Cairo ",
  "Copenhagen ",
  "Kyoto ",
  "Phnom Penh ",
  "Doha ",
  "Chiang Mai ",
  "Edirne ",
  "Jerusalem ",
  "Saint Petersburg ",
  "Warsaw ",
  "Melbourne ",
  "Marrakesh ",
  "Vancouver ",
  "Auckland ",
  "Tel Aviv ",
  "Honolulu ",
  "Artvin ",
  "Kolkata ",
  "Krakow ",
  "Guilin ",
  "Brussels ",
  "Frankfurt am Main ",
  "Stockholm ",
  "Jeju ",
  "Mexico City ",
  "Siem Reap ",
  "Lima ",
  "Rio de Janeiro ",
  "Rhodes ",
  "Buenos Aires ",
  "Colombo ",
  "Abu Dhabi ",
  "Taichung ",
  "Washington D.C. ",
  "Chiba ",
  "Nice ",
];
// allmainCityArray = ["sao paulo", "lisbon"];
import dbConnect from "@/lib/Database/dbconnect";
import allCityModel from "@/lib/Database/models/allCity";
import axios from "axios";
import nc from "next-connect";

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
}).get(async (req, res) => {
  await dbConnect();
  var allCityArray = [];
  var errorCityArray = [];
  for (const city of allmainCityArray) {
    var url = new URL(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE&inputtype=textquery"
    );
    url.searchParams.append("input", city);
    try {
      var { data: getplaceID } = await axios.get(url.href);
      if (getplaceID.status == "OK") {
        var url = new URL(
          "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDrcowv7Suh4IPyb8D44HZQWXBe7O_zITE"
        );
        url.searchParams.append("place_id", getplaceID.candidates[0].place_id);
        var { data: getRefrence } = await axios.get(url.href);
        allCityArray.push(getRefrence.result);
        var tosaveCity = new allCityModel(getRefrence.result);

        // console.log();
        await tosaveCity.save();
        console.log(getRefrence.result.name);
      } else {
        console.log("error in", city);
        errorCityArray.push(city);
      }
    } catch (error) {
      console.log("error in", city);
      errorCityArray.push(city);
    }
  }
  console.log("done", allCityArray);
  console.log("errors", errorCityArray);
});

export default router;
