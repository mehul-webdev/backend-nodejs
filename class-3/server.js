const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.json());

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(res.statusCode || 404)
    .json({ message: "Internal Server Error", error: err.message });
};

mongoose
  .connect(
    "mongodb+srv://mehulwebdev96:roxBDRz5DEW2PUAu@cluster0.byjqtj0.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// Define a schema for the product

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_description: { type: String, required: true },
    isInStock: { type: Boolean, required: true, default: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Add a new product
app.post("/ecommerce/add-product", async (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    isInStock,
    category,
  } = req?.body;

  try {
    const newProduct = await productModel.create({
      product_name,
      product_price,
      product_description,
      isInStock,
      category,
    });
    res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

// Get all products
app.get("/ecommerce/get-products", async (req, res) => {
  try {
    const products = await productModel.find();

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

app.patch("/ecommerce/update-product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const getUpdatedProduct = await productModel.findById(id);

    res.status(200).json({
      message: "Product updated successfully",
      data: getUpdatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error?.message });
  }
});

app.delete("/ecommerce/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ message: "Error deleting product", error: error?.message });
  }
});

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
