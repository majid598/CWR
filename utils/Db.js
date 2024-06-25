import mongoose from "mongoose";

export const dbConnect = (uri) => {
  mongoose
    .connect(uri, { dbName: "cwr-components" })
    .then((data) => console.log(`DB Connected To: ${data.connection.host}`))
    .catch((err) => {
      console.log(`Failed to connect Db: ${err}`);
    });
};
