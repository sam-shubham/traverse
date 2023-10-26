// ENCRYPTION------------------------------
const crypto = require("crypto");
var iv = crypto.randomBytes(16);
var currentiv;

// aes 256-bit cipher block chaining (cbc) encryption/decryption
function encrypthex(secret_message, key = createkey(process.env.secretkey)) {
  currentiv = iv;
  let cipher = crypto.createCipheriv("aes-256-cbc", key, currentiv);
  let encrypted = cipher.update(secret_message, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // console.log("encrypted: " + encrypted + ", IV:" + currentiv);
  return [encrypted, currentiv];
}

function decrypthex(
  encryptedtext,
  key = createkey(process.env.secretkey),
  curriv
) {
  let decipher = crypto.createDecipheriv("aes-256-cbc", key, curriv);
  let decrypted = decipher.update(encryptedtext, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  // console.log("decrypted: " + decrypted);
  return decrypted;
}

function createkey(stringkey) {
  return crypto
    .createHash("sha256")
    .update(String(stringkey))
    .digest("base64")
    .substr(0, 32);
}

module.exports = {
  createkey,
  decrypthex,
  encrypthex,
};

//---------------------ENCRYPTION------------------------------
