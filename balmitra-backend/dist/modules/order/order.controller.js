"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    // =========================
    // CUSTOMER CREATE ORDER
    // =========================
    static async create(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Customer authentication required",
                });
            }
            const order = await order_service_1.OrderService.create({
                ...req.body,
                customerId: Number(customerId),
            });
            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: order,
            });
        }
        catch (error) {
            console.error("Create Order Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // CUSTOMER MY ORDERS
    // =========================
    static async getMyOrders(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Customer authentication required",
                });
            }
            const orders = await order_service_1.OrderService.getCustomerOrders(Number(customerId));
            return res.json({
                success: true,
                data: orders,
            });
        }
        catch (error) {
            console.error("Get Customer Orders Error:", error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // CUSTOMER SINGLE ORDER
    // =========================
    static async getMyOrderById(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Customer authentication required",
                });
            }
            const order = await order_service_1.OrderService.getCustomerOrderById(Number(req.params.id), Number(customerId));
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }
            return res.json({
                success: true,
                data: order,
            });
        }
        catch (error) {
            console.error("Get Customer Order Error:", error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // ADMIN
    // =========================
    static async getAll(req, res) {
        try {
            const data = await order_service_1.OrderService.getAll(req.query);
            return res.status(200).json({
                success: true,
                ...data,
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
            const order = await order_service_1.OrderService.getById(Number(req.params.id));
            return res.json({
                success: true,
                data: order,
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
        const order = await order_service_1.OrderService.updateStatus(Number(req.params.id), req.body.orderStatus);
        return res.json({
            success: true,
            message: "Order status updated",
            data: order,
        });
    }
    static async delete(req, res) {
        await order_service_1.OrderService.delete(Number(req.params.id));
        return res.json({
            success: true,
            message: "Order deleted successfully",
        });
    }
    static async updatePaymentStatus(req, res) {
        try {
            const order = await order_service_1.OrderService.updatePaymentStatus(Number(req.params.id), req.body.paymentStatus);
            return res.json({
                success: true,
                message: "Payment status updated successfully",
                data: order,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async cancelOrder(req, res) {
        try {
            const order = await order_service_1.OrderService.cancelOrder(Number(req.params.id));
            return res.json({
                success: true,
                message: "Order cancelled successfully",
                data: order,
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
exports.OrderController = OrderController;
