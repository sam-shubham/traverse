import nc from "next-connect";
import { body, validationResult } from "express-validator";
import DB from "@/lib/Database/dbconnect";
import usermodel from "@/lib/Database/models/usermodel";
import { decrypthex, createkey, encrypthex } from "@/lib/Encryption/encryption";
import createtoken from "@/lib/jsonWebToken/createToken";

const route = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.send("Internal Error Occured");
  },
}).post(async (req, res) => {
  const HARDCODEKEY = createkey(process.env.secretkey);
  await DB();
  try {
    var userId = JSON.parse(
      decrypthex(
        JSON.parse(atob(req.body.userToken))[0],
        HARDCODEKEY,
        Buffer.from(JSON.parse(atob(req.body.userToken))[1])
      )
    );
    if (userId.date == new Date().toDateString()) {
      var secpassword = encrypthex(req.body.newPassword, HARDCODEKEY);
      var updateUser = await usermodel.findByIdAndUpdate(userId.id, {
        password: secpassword,
      });
      res.send({
        success: true,
        data: "Your Password Is Successfully Changed",
      });
    } else {
      res.send({ success: false, data: "Expired Link" });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, data: "We Got An Error" });
  }
});
export default route;
