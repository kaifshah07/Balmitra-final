"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseOrderController = void 0;
const franchise_order_service_1 = require("./franchise-order.service");
class FranchiseOrderController {
    static async create(req, res) {
        try {
            const franchiseId = req.user.id;
            const { items } = req.body;
            const order = await franchise_order_service_1.FranchiseOrderService.createOrder(franchiseId, items);
            res.status(201).json({ success: true, data: order });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async getMyOrders(req, res) {
        try {
            const franchiseId = req.user.id;
            const orders = await franchise_order_service_1.FranchiseOrderService.getOrdersByFranchise(franchiseId);
            res.json({ success: true, data: orders });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getAllForAdmin(req, res) {
        try {
            const orders = await franchise_order_service_1.FranchiseOrderService.getAllOrders();
            res.json({ success: true, data: orders });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async updateStatus(req, res) {
        try {
            const { status } = req.body;
            const order = await franchise_order_service_1.FranchiseOrderService.updateOrderStatus(Number(req.params.id), status);
            res.json({ success: true, data: order });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseOrderController = FranchiseOrderController;
