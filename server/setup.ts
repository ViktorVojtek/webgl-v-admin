import UserController from './app-data/controller/User.controller';
import config from './app-data/config';

const { email, firstName, lastName, password } = config;

export default () =>
  new Promise(async (resolve, reject) => {
    try {
      const admin = new UserController(firstName, lastName, email, password);
      const exist = await admin.get(email);

      if (!exist) {
        await admin.create();
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
