import { model, Schema, Types } from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    image: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);

export default Profile;
