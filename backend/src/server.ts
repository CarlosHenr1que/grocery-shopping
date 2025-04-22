import { MongoHelper } from "./infra/repositories/mongo/helpers/mongo-helper";
import app from "./interface/http/express";

MongoHelper.connect("mongodb://localhost:27017/grocery")
  .then(() => {
    try {
      app.listen(3000, () => {
        console.log("Server started on port 3000");
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
