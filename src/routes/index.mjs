import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import categoryRouter from "./category.mjs";
import seedRouter from "./seeds.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/seed", seedRouter);

export default rootRouter;
