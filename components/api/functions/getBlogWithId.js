import mongoose from "mongoose"
import { blogModel } from "../models/blog"

export default async function getBlogWithId({id}) {

    let mongoDb_url = process.env.mongoDb_url
    mongoose.connect(mongoDb_url)

  try {
    let blog = await blogModel.findOne({id : id});
    if (blog === null) {
      throw 'blog not found';
    }
    return blog;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
