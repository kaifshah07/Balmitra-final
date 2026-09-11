"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const franchise_enquiry_controller_1 = require("./franchise-enquiry.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public
router.post("/", franchise_enquiry_controller_1.FranchiseEnquiryController.create);
// Admin
router.get("/", auth_middleware_1.authenticateAdmin, franchise_enquiry_controller_1.FranchiseEnquiryController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, franchise_enquiry_controller_1.FranchiseEnquiryController.getById);
router.patch("/:id/status", auth_middleware_1.authenticateAdmin, franchise_enquiry_controller_1.FranchiseEnquiryController.updateStatus);
exports.default = router;
