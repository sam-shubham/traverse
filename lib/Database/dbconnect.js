import mongoose from "mongoose";

const env = process.env.NODE_ENV;
var MONGODB_URI;
// if (env == "development") {
// MONGODB_URI = "mongodb://127.0.0.1:27017/books-store";
// } else if (env == "production") {
MONGODB_URI = process.env.MONGODB_URI;
// }
// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
