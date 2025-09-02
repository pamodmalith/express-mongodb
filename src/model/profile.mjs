import { model, Schema, Types } from "mongoose";
import User from "./user.mjs";

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

profileSchema.pre("deleteOne", async function (next) {
  const profile = await this.model.findOne(this.getQuery());
  if (profile) {
    await User.updateOne({ _id: profile.user }, { profile: null });
  }
  next();
});

const Profile = model("Profile", profileSchema);

export default Profile;
