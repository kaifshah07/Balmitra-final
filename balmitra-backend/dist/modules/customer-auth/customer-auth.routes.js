"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_auth_controller_1 = require("./customer-auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const customer_auth_validation_1 = require("./customer-auth.validation");
const customer_auth_middleware_1 = require("./customer-auth.middleware");
const router = (0, express_1.Router)();
// REGISTER
router.post("/register", (0, validateRequest_1.default)(customer_auth_validation_1.registerCustomerSchema), customer_auth_controller_1.CustomerAuthController.register);
// VERIFY OTP
router.post("/verify-otp", (0, validateRequest_1.default)(customer_auth_validation_1.verifyOtpSchema), customer_auth_controller_1.CustomerAuthController.verifyOtp);
// RESEND OTP
router.post("/resend-otp", (0, validateRequest_1.default)(customer_auth_validation_1.resendOtpSchema), customer_auth_controller_1.CustomerAuthController.resendOtp);
// LOGIN
router.post("/login", (0, validateRequest_1.default)(customer_auth_validation_1.loginCustomerSchema), customer_auth_controller_1.CustomerAuthController.login);
// CURRENT CUSTOMER
router.get("/me", customer_auth_middleware_1.authenticateCustomer, customer_auth_controller_1.CustomerAuthController.me);
exports.default = router;
