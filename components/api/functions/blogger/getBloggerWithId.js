import mongoose from 'mongoose';
import { userModel } from '../../models/user';
export async function getBloggerWithId(id) {
  const mongoDbUrl = process.env.mongoDb_url;
  mongoose.connect(mongoDbUrl);

  try {
    let user = await userModel.findOne({...id });
    if (user === null) {
      throw 'no bloggers found';
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
