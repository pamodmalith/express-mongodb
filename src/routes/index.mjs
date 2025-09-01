import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import categoryRouter from "./category.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);

export default rootRouter;
