import Product from "../product/Product.js";
import mongoose from "mongoose";

export const create = async (req, res) => {
  try {
    ///
    const { name, slug, description, price } = req.body;
    ///
    const productExists = await Product.findOne({ slug });
    if (productExists)
      return res.status(400).json({ message: "Product already exists." });
    ///
    const product = await Product.create({ name, slug, description, price });
    res.status(201).json({ message: "Product listing successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price } = req.body;
    ///
    const productExists = await Product.findOne({ slug });
    if (!productExists)
      return res.status(400).json({ message: "Product does not exist." });
    ///
    const productFields = {
      name,
      slug,
      description,
      price,
      updatedAt: new Date(),
    };
    const product = await Product.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: productFields },
    );
    res.status(201).json({ message: "Product listing successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
