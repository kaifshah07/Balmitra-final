"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("./customer.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const customer_validation_1 = require("./customer.validation");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.getById);
router.put("/:id", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.update);
router.patch("/:id/block", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.block);
router.patch("/:id/unblock", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.unblock);
router.delete("/:id", auth_middleware_1.authenticateAdmin, customer_controller_1.CustomerController.delete);
router.post("/", (0, validateRequest_1.default)(customer_validation_1.createCustomerSchema), customer_controller_1.CustomerController.create);
exports.default = router;
