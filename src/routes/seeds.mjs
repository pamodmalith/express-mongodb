import { Router } from "express";
import User from "../model/user.mjs";
import Profile from "../model/profile.mjs";

const seedRouter = Router();

const userData = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    username: "john_doe",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    username: "jane_smith",
  },
  {
    name: "Pamod Malith",
    email: "pamod@example.com",
    password: "password123",
    username: "pamodmalith",
  },
  {
    name: "New User",
    email: "newuser@example.com",
    password: "password123",
    username: "new_user",
  },
  {
    name: "Another User",
    email: "anotheruser@example.com",
    password: "password123",
    username: "another_user",
  },
];

const profileImage = [
  { image: "https://example.com/images/john_doe.jpg" },
  { image: "https://example.com/images/jane_smith.jpg" },
  { image: "https://example.com/images/pamodmalith.jpg" },
  { image: "https://example.com/images/new_user.jpg" },
  { image: "https://example.com/images/another_user.jpg" },
];

seedRouter.post("/register-user-and-profile", async (c, w) => {
  for (const u of userData) {
    const newUser = await User.create({
      name: u.name,
      email: u.email,
      password: u.password,
      username: u.username,
    });
    const index = userData.indexOf(u);
    const newProfile = await Profile.create({
      user: newUser._id,
      image: profileImage[index].image,
    });
    newUser.profile = newProfile._id;
    await newUser.save();
  }
  w.sendStatus(201);
});

export default seedRouter;
