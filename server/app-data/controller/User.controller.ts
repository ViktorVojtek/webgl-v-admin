import bcrypt from 'bcrypt';
import User, { IUser } from '../db/User.model';

export default class UserController {
  firstName: string;
  lastName: string;
  email: string;
  rawPassword: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    rawPassword: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.rawPassword = rawPassword;
  }

  public async get(email: string): Promise<IUser> {
    const user = await User.findOne({ email });

    return user;
  }

  public async create(): Promise<IUser> {
    console.log('CREATE METHODE');
    console.log(this.email);
    console.log('CR END L');

    const user: IUser = new User({
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: await bcrypt.hash(this.rawPassword, 10),
    });

    await User.create(user);

    return user;
  }
}
