"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const customer_auth_middleware_1 = require("../customer-auth/customer-auth.middleware");
const router = (0, express_1.Router)();
// =====================================================
// CUSTOMER PAYMENT APIs
// =====================================================
router.post("/create", customer_auth_middleware_1.authenticateCustomer, payment_controller_1.PaymentController.create);
router.post("/verify", customer_auth_middleware_1.authenticateCustomer, payment_controller_1.PaymentController.verify);
// =====================================================
// ADMIN PAYMENT APIs
// =====================================================
router.get("/", auth_middleware_1.authenticateAdmin, payment_controller_1.PaymentController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, payment_controller_1.PaymentController.getById);
router.patch("/:id/status", auth_middleware_1.authenticateAdmin, payment_controller_1.PaymentController.updateStatus);
router.patch("/:id/refund", auth_middleware_1.authenticateAdmin, payment_controller_1.PaymentController.refund);
exports.default = router;
