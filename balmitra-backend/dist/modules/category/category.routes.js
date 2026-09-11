"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
router.get("/public", category_controller_1.CategoryController.getAll);
/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
router.post("/", auth_middleware_1.authenticateAdmin, upload_middleware_1.upload.single("image"), category_controller_1.CategoryController.create);
router.get("/", auth_middleware_1.authenticateAdmin, category_controller_1.CategoryController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, category_controller_1.CategoryController.getById);
router.put("/:id", auth_middleware_1.authenticateAdmin, upload_middleware_1.upload.single("image"), category_controller_1.CategoryController.update);
router.delete("/:id", auth_middleware_1.authenticateAdmin, category_controller_1.CategoryController.delete);
exports.default = router;
