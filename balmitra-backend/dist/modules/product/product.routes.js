"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
// CREATE
router.post("/", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, upload_middleware_1.upload.single("thumbnail"), product_controller_1.ProductController.create);
// GET ALL
router.get("/", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, product_controller_1.ProductController.getAll);
// GET ONE
router.get("/:id", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, product_controller_1.ProductController.getById);
// UPDATE
router.put("/:id", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, upload_middleware_1.upload.single("thumbnail"), product_controller_1.ProductController.update);
// DELETE
router.delete("/:id", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, product_controller_1.ProductController.delete);
exports.default = router;
