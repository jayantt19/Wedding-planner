import mongoose from "mongoose";
import Products from "../models/Products.js";
import { createError } from "../error.js";

// ✅ Add Multiple Products
export const addProducts = async (req, res, next) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      return next(createError(400, "Invalid request. Expected an array of products."));
    }

    const createdProducts = await Products.insertMany(productsData);

    return res
      .status(201)
      .json({ message: "Products added successfully", createdProducts });
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Products with Filters
export const getproducts = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, sizes, search } = req.query;

    const filter = {};

    if (categories) {
      filter.category = { $in: categories.split(",") };
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) filter["price.org"]["$gte"] = parseFloat(minPrice);
      if (maxPrice) filter["price.org"]["$lte"] = parseFloat(maxPrice);
    }

    if (sizes) {
      filter.sizes = { $in: sizes.split(",") };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    const products = await Products.find(filter);
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// ✅ Get Product by ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }

    const product = await Products.findById(id);

    if (!product) {
      return next(createError(404, "Product not found"));
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
