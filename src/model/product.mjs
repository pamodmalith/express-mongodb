import { model, Schema, Types } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: [
      {
        type: Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
