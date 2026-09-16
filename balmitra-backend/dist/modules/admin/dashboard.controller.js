"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const database_1 = require("../../config/database");
class DashboardController {
    static async getDashboard(req, res) {
        try {
            // Dashboard Statistics
            const [totalProducts, totalCategories, totalOrders, totalCustomers, pendingOrders, completedOrders, paidOrders] = await Promise.all([
                database_1.prisma.product.count({ where: { isDeleted: false } }),
                database_1.prisma.category.count(),
                database_1.prisma.order.count(),
                database_1.prisma.customer.count(),
                database_1.prisma.order.count({ where: { orderStatus: { in: ["PENDING", "CONFIRMED", "PACKED", "SHIPPED"] } } }),
                database_1.prisma.order.count({ where: { orderStatus: "DELIVERED" } }),
                database_1.prisma.order.findMany({
                    where: { paymentStatus: "PAID" },
                    select: { totalAmount: true }
                })
            ]);
            const totalRevenue = paidOrders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
            // Recent Products
            const recentProducts = await database_1.prisma.product.findMany({
                take: 5,
                where: { isDeleted: false },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    category: true,
                },
            });
            // Low Stock Products
            const lowStockProducts = await database_1.prisma.product.findMany({
                where: {
                    isDeleted: false,
                    stock: {
                        lte: 10,
                    },
                },
                orderBy: {
                    stock: "asc",
                },
            });
            return res.status(200).json({
                success: true,
                message: "Dashboard loaded successfully",
                admin: req.admin,
                statistics: {
                    totalProducts,
                    totalCategories,
                    totalOrders,
                    totalCustomers,
                    totalRevenue: totalRevenue.toFixed(2),
                    pendingOrders,
                    completedOrders,
                },
                recentProducts,
                lowStockProducts,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.DashboardController = DashboardController;
