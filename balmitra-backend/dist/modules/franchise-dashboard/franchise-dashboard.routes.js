"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const franchise_dashboard_controller_1 = require("./franchise-dashboard.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateFranchise);
router.get("/", franchise_dashboard_controller_1.FranchiseDashboardController.getStats);
exports.default = router;
