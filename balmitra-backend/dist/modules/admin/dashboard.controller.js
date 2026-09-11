"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const database_1 = require("../../config/database");
class DashboardController {
    static async getDashboard(req, res) {
        try {
            // Dashboard Statistics
            const [totalProducts, totalCategories,] = await Promise.all([
                database_1.prisma.product.count(),
                database_1.prisma.category.count(),
            ]);
            // Recent Products
            const recentProducts = await database_1.prisma.product.findMany({
                take: 5,
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
                    stock: {
                        lte: 5,
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
                    // These will be implemented later
                    totalOrders: 0,
                    totalCustomers: 0,
                    totalRevenue: 0,
                    pendingOrders: 0,
                    completedOrders: 0,
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
