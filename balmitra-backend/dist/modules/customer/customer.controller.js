"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const customer_service_1 = require("./customer.service");
class CustomerController {
    static async getAll(req, res) {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = String(req.query.search || "");
            const result = await customer_service_1.CustomerService.getAll(page, limit, search);
            return res.json({
                success: true,
                ...result,
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
            const customer = await customer_service_1.CustomerService.getById(Number(req.params.id));
            if (!customer) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found",
                });
            }
            return res.json({
                success: true,
                data: customer,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async update(req, res) {
        try {
            const customer = await customer_service_1.CustomerService.update(Number(req.params.id), req.body);
            return res.json({
                success: true,
                message: "Customer updated successfully",
                data: customer,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async block(req, res) {
        try {
            const customer = await customer_service_1.CustomerService.block(Number(req.params.id));
            return res.json({
                success: true,
                message: "Customer blocked successfully",
                data: customer,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async unblock(req, res) {
        try {
            const customer = await customer_service_1.CustomerService.unblock(Number(req.params.id));
            return res.json({
                success: true,
                message: "Customer unblocked successfully",
                data: customer,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async delete(req, res) {
        try {
            await customer_service_1.CustomerService.delete(Number(req.params.id));
            return res.json({
                success: true,
                message: "Customer deleted successfully",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async create(req, res) {
        try {
            const result = await customer_service_1.CustomerService.create(req.body);
            return res.status(201).json(result);
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.CustomerController = CustomerController;
