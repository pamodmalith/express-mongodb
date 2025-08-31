import "dotenv/config";
import express, { json } from "express";
import dbconnect from "./src/db/config.mjs";
import rootRouter from "./src/routes/index.mjs";

const server = express();
const PORT = process.env.PORT || 4001;

server.use(json());

server.use("/api/v1", rootRouter);

server.get("/", (c, w) => {
  w.send("Welcome to the Express MongoDB API");
});

dbconnect
  .then(() => {
    console.log("Database connected successfully");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
