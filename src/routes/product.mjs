import { Router } from "express";
import Product from "../model/product.mjs";
import User from "../model/user.mjs";

const productRouter = Router();

productRouter.get("/all", async (c, w) => {
  try {
    const allProducts = await Product.find();
    w.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

productRouter.post("/create", async (c, w) => {
  const { title, image, user } = c.body;
  try {
    const newProduct = await Product.create({
      title,
      image,
      user,
    });
    await User.updateOne(
      { _id: user },
      { $push: { products: newProduct._id } }
    );
    w.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

productRouter.put("/update/:productId", async (c, w) => {
  const { title, image, user } = c.body;
  const { productId } = c.params;
  try {
    const productData = await Product.findById(productId);

    productData.image = image;
    productData.title = title;

    if (user === productData.user) {
      await productData.save();

      return w.status(200).json(productData);
    }

    await User.updateOne(
      { _id: productData.user },
      { $pull: { products: productData._id } }
    );

    await User.updateOne(
      { _id: user },
      { $push: { products: productData._id } }
    );

    productData.user = user;
    await productData.save();

    return w.status(200).json(productData);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

export default productRouter;
