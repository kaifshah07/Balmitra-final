"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseEnquiryController = void 0;
const franchise_enquiry_service_1 = require("./franchise-enquiry.service");
class FranchiseEnquiryController {
    static async create(req, res) {
        try {
            const enquiry = await franchise_enquiry_service_1.FranchiseEnquiryService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Franchise enquiry submitted successfully",
                data: enquiry,
            });
        }
        catch (error) {
            console.error("Franchise Enquiry Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message ||
                    "Unable to submit franchise enquiry",
            });
        }
    }
    static async getAll(req, res) {
        try {
            const enquiries = await franchise_enquiry_service_1.FranchiseEnquiryService.getAll();
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
            const enquiry = await franchise_enquiry_service_1.FranchiseEnquiryService.getById(Number(req.params.id));
            if (!enquiry) {
                return res.status(404).json({
                    success: false,
                    message: "Franchise enquiry not found",
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
            const enquiry = await franchise_enquiry_service_1.FranchiseEnquiryService.updateStatus(Number(req.params.id), req.body.status);
            return res.json({
                success: true,
                message: "Franchise enquiry status updated",
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
}
exports.FranchiseEnquiryController = FranchiseEnquiryController;
