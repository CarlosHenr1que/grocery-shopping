/* eslint-disable no-console */
import dotenv from "dotenv";
import { MongoHelper } from "./infra/repositories/mongo/helpers/mongo-helper";
import app from "./interface/http/express";
dotenv.config();

MongoHelper.connect("mongodb://localhost:27017/grocery")
  .then(() => {
    try {
      app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
