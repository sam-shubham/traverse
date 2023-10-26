import nc from "next-connect";
import verifyauth from "@/lib/jsonWebToken/verifytoken";
import db from "@/lib/Database/dbconnect";
import usermodel from "@/lib/Database/models/usermodel";

const router = nc({
  onError(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send("Internal Server Error");
  },
})
  .use(verifyauth)
  .get(async (req, res) => {
    await db();
    const data = await usermodel.findById(req.user).select("-password");
    if (data) {
      res.json({
        success: true,
        msg: data,
      });
    } else {
      res.json({
        success: false,
        msg: "We Dont Have Corresponding Data Here",
      });
    }
  });

export default router;
