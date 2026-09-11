"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategory_controller_1 = require("./subcategory.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// =====================================================
// PUBLIC
// =====================================================
// Get all active subcategories for a category
router.get("/category/:categoryId", subcategory_controller_1.SubCategoryController.getByCategory);
// Get single subcategory
router.get("/:id", subcategory_controller_1.SubCategoryController.getById);
// =====================================================
// ADMIN
// =====================================================
// Get all subcategories
router.get("/", auth_middleware_1.authenticateAdmin, subcategory_controller_1.SubCategoryController.getAll);
// Create
router.post("/", auth_middleware_1.authenticateAdmin, subcategory_controller_1.SubCategoryController.create);
// Update
router.put("/:id", auth_middleware_1.authenticateAdmin, subcategory_controller_1.SubCategoryController.update);
// Delete
router.delete("/:id", auth_middleware_1.authenticateAdmin, subcategory_controller_1.SubCategoryController.delete);
exports.default = router;
