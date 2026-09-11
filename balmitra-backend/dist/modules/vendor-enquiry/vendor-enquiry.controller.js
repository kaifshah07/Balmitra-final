"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorEnquiryController = void 0;
const vendor_enquiry_service_1 = require("./vendor-enquiry.service");
class VendorEnquiryController {
    static async create(req, res) {
        try {
            const enquiry = await vendor_enquiry_service_1.VendorEnquiryService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Vendor enquiry submitted successfully",
                data: enquiry,
            });
        }
        catch (error) {
            console.error("Vendor Enquiry Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getAll(req, res) {
        try {
            const enquiries = await vendor_enquiry_service_1.VendorEnquiryService.getAll();
            return res.json({
                success: true,
                data: enquiries,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getById(req, res) {
        try {
            const enquiry = await vendor_enquiry_service_1.VendorEnquiryService.getById(Number(req.params.id));
            if (!enquiry) {
                return res.status(404).json({
                    success: false,
                    message: "Vendor enquiry not found",
                });
            }
            return res.json({
                success: true,
                data: enquiry,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async updateStatus(req, res) {
        try {
            const enquiry = await vendor_enquiry_service_1.VendorEnquiryService.updateStatus(Number(req.params.id), req.body.status);
            return res.json({
                success: true,
                message: "Vendor enquiry status updated",
                data: enquiry,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async delete(req, res) {
        try {
            await vendor_enquiry_service_1.VendorEnquiryService.delete(Number(req.params.id));
            return res.json({
                success: true,
                message: "Vendor enquiry deleted successfully",
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.VendorEnquiryController = VendorEnquiryController;
