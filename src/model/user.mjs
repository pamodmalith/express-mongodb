import { model, Schema, Types } from "mongoose";

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

const User = model("User", userSchema);

export default User;
