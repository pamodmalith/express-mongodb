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
    const user = await User.findById(c.params.userId);
    const profile = await Profile.create({ user: user._id, image: image });
    user.profile = profile._id;
    await user.save();

    console.log(profile);
    console.log(user);

    w.sendStatus(200);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

export default userRouter;
