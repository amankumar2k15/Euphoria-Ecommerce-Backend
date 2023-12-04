const { error, success } = require("../helper/baseResponse");
const ProductModel = require("../models/product");

const createProduct = async (req, res) => {
  try {
    let avatarPaths = [];

    if (!req.files) {
      return res
        .status(500)
        .json({ message: "Error is occuring when requesting a file" });
    } else {
      // Assuming 'avatar' is the key used in the form-data
      console.log(req.files, "req-file");
      avatarPaths = req.files.map((file) => file.path);
    }

    let newProduct = new ProductModel({ ...req.body, avatar: avatarPaths });
    await newProduct.save();
    return res
      .status(201)
      .json(success("Product created successfully", null, 201));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

const getProduct = async (req, res) => {
  try {
    return res.send(await ProductModel.find());
  } catch (error) {
    return res.status(500).json(error(err.message, 500));
  }
};

const searchProductByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    if (!title) {
      return res
        .status(400)
        .json(error("Title parameter is required for search", 400));
    }
    const searchResults = await ProductModel.find({
      $text: { $search: title },
    });
    return res
      .status(200)
      .json(success("Products found successfully", searchResults, 200));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

const editProduct = async (req, res) => {
    console.log("Edit Request Body:", req.body);
  const productId = req.params.id; // Assuming the product ID is passed as a route parameter
  console.log("product id:", productId);
  console.log("Edit Request:", req.body);

  try {
    const existingProduct = await ProductModel.findById(productId);
    console.log("Existing Product:", existingProduct);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    let updatedAvatarPaths = existingProduct.avatar;
    console.log("Request Files:", req.files);
    if (req.files) {
        console.log("Request Files 2:", req.files);
      updatedAvatarPaths = req.files.map((file) => file.path);
    }
    console.log("Before Update:", existingProduct);
    console.log("checking error before update:", req.body);
    // Update the product details and avatar paths
    existingProduct.set({ ...req.body, avatar: updatedAvatarPaths });
    console.log("Updated Avatar Paths:", updatedAvatarPaths);
    console.log("After Update(before save):", existingProduct);
    await existingProduct.save();
    console.log("After Update(after save):", existingProduct);

    return res
      .status(200)
      .json(success("Product updated successfully", null, 200));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    // Find the product by ID
    const result = await ProductModel.deleteOne({ _id: productId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    // await existingProduct.remove();
    return res
      .status(200)
      .json(success("Product deleted successfully", null, 200));
  } catch (err) {
    return res.status(500).json(error(err.message, 500));
  }
};

module.exports = {
  createProduct,
  getProduct,
  searchProductByTitle,
  editProduct,
  deleteProduct,
};

// router.get("/search/:s", async (req, res) => {
//     const s = req.params.s;
//     if (!s) {
//       return res.status(400).json("not found")
//     }
//     try {
//       const products = await Product.find(
//         {
//           $or: [
//             { "title": { $regex: s, $options: "i" } },
//             { "productno": { $regex: s, $options: "i" } },
//             { "desc": { $regex: s, $options: "i" } },
//             { "categories": { $in: [s] } }
//           ]
//         },
//         {
//           title: 1,
//           _id: 1
//         }
//       ).limit(5)

//       return res.status(200).json(products)
//     } catch (error) {
//       console.log(error)
//       return res.status(500).json("internal server error")
//     }
//   })

// API for multiple things - pagination , category, color , size
// router.get("/allinfo", async (req, res) => {
//     const { page = 1, limit = 5 } = req.query;
//     const startIndex = (page - 1) * limit;
//     const qCategory = req.query.category;
//     const qsort = req.query.sort;
//     const qColor = req.query.color;
//     const qSize = req.query.size;
//     const qs = req.query.s;

//     try {
//       let query = Product.find()

//       const filterArr = [];
//       if (qs) filterArr.push({
//         $or: [
//           { "title": { $regex: qs, $options: "i" } },
//           { "productno": { $regex: qs, $options: "i" } },
//           { "desc": { $regex: qs, $options: "i" } },
//           { "categories": { $in: [qs] } }
//         ]
//       })

//       if (qCategory) filterArr.push({ categories: { $in: [qCategory] } });
//       if (qColor) filterArr.push({ color: { $in: [qColor] } });
//       if (qSize) filterArr.push({ size: { $in: [qSize] } });
//       if (filterArr.length !== 0) {
//         query = query.find({ $and: filterArr });
//       }

//       if (qsort === "Newest") {
//         query.sort({ createdAt: -1 })
//       } else if (qsort === "price-asc") {
//         query.sort({ price: 1 })
//       } else if (qsort === "price-desc") {
//         query.sort({ price: -1 })
//       } else if (qsort === "toppurchased") {
//         query.sort({ purchasedCount: -1 })
//       } else if (qsort === "topRated") {
//         query.sort({ ratingsAverage: -1, ratingsQuantity: -1 })
//       } else if (qsort === "topreviewed") {
//         query.sort({ ratingsQuantity: -1 })
//       }
//       query.skip(startIndex).limit(limit)

//       const products = await query.exec()

//       if (products.length < 1) return res.status(404).json({ message: "No more product Found!" });

//       res.status(200).json(products);

//     } catch (error) {
//       res.status(500).json({ message: "failed to get Product" });
//     }

//   });
