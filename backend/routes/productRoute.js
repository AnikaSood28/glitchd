const express = require("express");
const {
  getProducts,
  getProductById,
  getProductsBySource,
  getProductsByGender,
  getProductsBySourceAndGender,
  deleteProductsBySource,
  getProductsBySourceAndCategory,
  getProductsByGenderAndCategory,
  getProductsBySalePriceCategoryAndGender,
  getProductsBySalePrice,
  getProductsBySalePriceAndGender,
  searchProducts,
} = require("../controllers/productController");

const router = express.Router();

// ✅ Middleware to block direct access
router.use((req, res, next) => {
  if (!req.headers["x-proxy-request"]) {
    return res.status(403).json({ error: "Direct API access is forbidden!" });
  }
  next();
});

router.get("/search", searchProducts);
router.get("/sale", getProductsBySalePrice);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/source/:source", getProductsBySource);
router.get("/gender/:gender", getProductsByGender);
router.get("/source/gender/:source/:gender", getProductsBySourceAndGender);
router.delete("/source/:source", deleteProductsBySource);
router.get("/source/category/:source/:category", getProductsBySourceAndCategory);
router.get("/gender/category/:gender/:category", getProductsByGenderAndCategory);
router.get("/sales/gender/category/:gender/:category", getProductsBySalePriceCategoryAndGender);
router.get("/sale/gender/:gender", getProductsBySalePriceAndGender);

module.exports = router;
