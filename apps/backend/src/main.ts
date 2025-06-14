import { MongoHelper } from './infra/repositories/mongo/helpers/mongo-helper';
import { createServer } from 'http';
import app from './interface/http/express';
import { socketServer } from './interface/http/socket';

import env from './config/environment';
const httpServer = createServer(app);

MongoHelper.connect(env.DATABASE_URL)
  .then(() => {
    try {
      socketServer.initialize(httpServer);

      httpServer.listen(env.PORT, () => {
        console.log(`Server started on port ${env.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  })
  .catch(() => {
    console.log('Server could not connect to database');
    process.exit(1);
  });
