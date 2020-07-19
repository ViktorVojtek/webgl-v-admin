import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../db/User.model';
import { errorName } from './constants';

const resolvers = {
  Query: {
    auth: async (root: any, args: any, ctx: any) => {
      const { token } = ctx;

      if (token) {
        const decoded = jwt.verify(token, 'superSecreftMadafaka');
        const { email } = decoded as any;

        const user = await User.findOne({ email });
        const { _id, __v, password, ...data } = user.toObject();

        data.id = _id;

        return data;
      } else {
        return {};
      }
    },
    hello: () => {
      return 'Hello world!';
    },
  },
  Mutation: {
    createUser: async ({ input }) => {
      const { firstName, lastName, email, password: userPswd } = input;
      const user: IUser = new User({
        firstName,
        lastName,
        email,
        password: userPswd,
      });

      await User.create(user);

      const { password, _id, __v, ...data } = user.toObject();
      data.id = _id;

      return data;
    },
    loginUser: async (root, args, ctx) => {
      try {
        console.log(args);
        const { input } = args;
        const { email, password: userPswd } = input;
        const userExist: IUser = await User.findOne({ email });

        console.log(userExist);

        if (!userExist) {
          throw new Error(errorName.NOT_FOUND);
        }

        const { password } = userExist;
        const pwdMatch: boolean = await bcrypt.compare(userPswd, password);

        console.log(pwdMatch);

        if (!pwdMatch) {
          console.log(errorName.INVALID_DATA);
          throw new Error(errorName.INVALID_DATA);
        }

        const {
          password: notUsedPwd,
          _id,
          __v,
          ...data
        } = userExist.toObject();

        const token = jwt.sign(
          { email: userExist.email },
          'superSecreftMadafaka'
        );
        data.token = token;
        data.id = _id;

        console.log(data);

        return data;
      } catch (err) {
        throw new Error(errorName.SERVER_ERROR);
      }
    },
  },
};

export default resolvers;
