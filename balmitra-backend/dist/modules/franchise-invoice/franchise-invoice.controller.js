"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseInvoiceController = void 0;
const franchise_invoice_service_1 = require("./franchise-invoice.service");
class FranchiseInvoiceController {
    static async generate(req, res) {
        try {
            const franchiseId = req.user.id;
            const invoice = await franchise_invoice_service_1.FranchiseInvoiceService.generateInvoice(franchiseId, req.body);
            res.status(201).json({ success: true, data: invoice });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async getMyInvoices(req, res) {
        try {
            const franchiseId = req.user.id;
            const invoices = await franchise_invoice_service_1.FranchiseInvoiceService.getMyInvoices(franchiseId);
            res.json({ success: true, data: invoices });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseInvoiceController = FranchiseInvoiceController;
