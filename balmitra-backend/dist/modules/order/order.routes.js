"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const customer_auth_middleware_1 = require("../customer-auth/customer-auth.middleware");
const router = (0, express_1.Router)();
// =========================
// CUSTOMER ROUTES
// =========================
// Customer places order
router.post("/", customer_auth_middleware_1.authenticateCustomer, order_controller_1.OrderController.create);
// Customer orders
router.get("/my-orders", customer_auth_middleware_1.authenticateCustomer, order_controller_1.OrderController.getMyOrders);
// Customer single order
router.get("/my-orders/:id", customer_auth_middleware_1.authenticateCustomer, order_controller_1.OrderController.getMyOrderById);
// =========================
// ADMIN ROUTES
// =========================
router.get("/", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.getById);
router.patch("/:id/status", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.updateStatus);
router.delete("/:id", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.delete);
router.patch("/:id/payment", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.updatePaymentStatus);
router.patch("/:id/cancel", auth_middleware_1.authenticateAdmin, auth_middleware_1.requireAdmin, order_controller_1.OrderController.cancelOrder);
exports.default = router;
