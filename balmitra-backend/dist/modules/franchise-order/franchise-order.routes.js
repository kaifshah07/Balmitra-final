"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const franchise_order_controller_1 = require("./franchise-order.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Used by Franchise Panel
router.post("/", auth_middleware_1.authenticateFranchise, franchise_order_controller_1.FranchiseOrderController.create);
router.get("/me", auth_middleware_1.authenticateFranchise, franchise_order_controller_1.FranchiseOrderController.getMyOrders);
// Used by Admin Panel
router.get("/admin", auth_middleware_1.authenticateAdmin, franchise_order_controller_1.FranchiseOrderController.getAllForAdmin);
router.patch("/:id/status", auth_middleware_1.authenticateAdmin, franchise_order_controller_1.FranchiseOrderController.updateStatus);
exports.default = router;
