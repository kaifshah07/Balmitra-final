"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
// Public: Get active products
router.get("/", product_controller_1.ProductController.getPublicProducts);
// Public: Get single active product
router.get("/:id", product_controller_1.ProductController.getPublicProductById);
exports.default = router;
