import { model, Schema, Types } from "mongoose";
import Product from "./product.mjs";
import Category from "./category.mjs";
import Profile from "./profile.mjs";

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: Types.ObjectId,
      ref: "Profile",
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("deleteOne", async function (next) {
  try {
    const user = await this.model.findOne(this.getQuery());
    if (user) {
      const products = user.products;
      if (products.length > 0) {
        for (const productId of products) {
          await Category.updateMany(
            { products: productId },
            { $pull: { products: productId } }
          );
          await Product.findByIdAndDelete(productId);
        }
      }
      await Profile.deleteOne({ _id: user._id });
    }
    next();
  } catch (error) {
    next(error);
  }
});

const User = model("User", userSchema);

export default User;
