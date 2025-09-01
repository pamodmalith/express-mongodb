import { Router } from "express";
import Category from "../model/category.mjs";
import Product from "../model/product.mjs";

const categoryRouter = Router();

//get all
categoryRouter.get("/all", async (c, w) => {
  try {
    const categories = await Category.find();
    return w.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

//create
categoryRouter.post("/create", async (c, w) => {
  const { title } = c.body;
  try {
    const newCategory = await Category.create({ title });
    return w.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

//add product to category
categoryRouter.put("/update/:id", async (c, w) => {
  const { id: cat_id } = c.params;
  const productId = c.query.product;
  if (!productId || !cat_id) {
    return w.status(400).send("bad request");
  }
  try {
    const categoryData = await Category.findById(cat_id);
    const productData = await Product.findById(productId);

    if (!categoryData || !productData) {
      return w.status(404).send("Category or Product not found");
    }
    categoryData.products.push(productId);
    productData.category.push(cat_id);
    await categoryData.save();
    await productData.save();
    return w.status(200).json({
      message: "Product added to category successfully",
      categoryData,
      productData,
    });
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

//remove a product from all categories
categoryRouter.delete("/remove/:id", async (c, w) => {
  const productId = c.params.id;
  if (!productId) {
    return w.status(400).send("bad request");
  }
  try {
    await Category.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );
    await Product.findByIdAndUpdate(productId, { category: [] });
    return w.status(200).json({
      message: "Product removed from all categories successfully",
    });
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal Server Error");
  }
});

export default categoryRouter;
