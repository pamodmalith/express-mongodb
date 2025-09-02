import { Router } from "express";
import User from "../model/user.mjs";
import Profile from "../model/profile.mjs";

const userRouter = Router();

userRouter.get("/", async (c, w) => {
  try {
    const users = await User.find();
    return w.status(200).send(users);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.get("/:id", async (c, w) => {
  const { id } = c.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return w.status(404).send("User not found");
    }
    return w.status(200).send(user);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.get("/profile/:userId", async (c, w) => {
  const { userId } = c.params;
  try {
    const profile = await User.findById(userId).populate("profile");
    if (!profile || !profile.profile) {
      return w.status(404).send("Profile not found");
    }
    return w.status(200).send(profile);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.post("/", async (c, w) => {
  const data = c.body;
  try {
    const newUser = await User.create(data);
    return w.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.put("/profile/:userId", async (c, w) => {
  const { image } = c.body;
  try {
    const profile = await Profile.create({ user: c.params.userId, image });
    const user = await User.findByIdAndUpdate(c.params.userId, {
      profile: profile._id,
    });

    console.log(profile);
    console.log(user);

    w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.delete("/profile/:profileId", async (c, w) => {
  const { profileId } = c.params;
  try {
    await User.updateOne({ profile: profileId }, { profile: null });
    await Profile.deleteOne({ _id: profileId });
    return w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

userRouter.delete("/:id", async (c, w) => {
  const { id } = c.params;
  try {
    await User.findByIdAndDelete(id);
    return w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

export default userRouter;
