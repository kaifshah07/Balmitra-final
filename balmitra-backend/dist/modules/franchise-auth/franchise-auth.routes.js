"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const franchise_auth_controller_1 = require("./franchise-auth.controller");
const router = (0, express_1.Router)();
router.post("/login", franchise_auth_controller_1.FranchiseAuthController.login);
router.post("/forgot-password", franchise_auth_controller_1.FranchiseAuthController.forgotPassword);
router.post("/reset-password", franchise_auth_controller_1.FranchiseAuthController.resetPassword);
exports.default = router;
