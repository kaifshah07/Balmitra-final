"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendor_enquiry_controller_1 = require("./vendor-enquiry.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public
router.post("/", vendor_enquiry_controller_1.VendorEnquiryController.create);
// Admin
router.get("/", auth_middleware_1.authenticateAdmin, vendor_enquiry_controller_1.VendorEnquiryController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, vendor_enquiry_controller_1.VendorEnquiryController.getById);
router.patch("/:id/status", auth_middleware_1.authenticateAdmin, vendor_enquiry_controller_1.VendorEnquiryController.updateStatus);
router.delete("/:id", auth_middleware_1.authenticateAdmin, vendor_enquiry_controller_1.VendorEnquiryController.delete);
exports.default = router;
