/* eslint-disable no-console */
import { MongoHelper } from "./infra/repositories/mongo/helpers/mongo-helper";
import app from "./interface/http/express";

import env from './config/environment'

MongoHelper.connect(env.DATABASE_URL)
  .then(() => {
    try {
      app.listen(env.PORT, () => {
        console.log(`Server started on port ${env.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch(() => {
    console.log("Server could not connect to database");
    process.exit(1);
  });
