"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const database_1 = require("../../config/database");
const client_1 = require("@prisma/client");
class DashboardService {
    static async getDashboard() {
        const [totalProducts, totalCategories, totalOrders, pendingOrders, deliveredOrders, cancelledOrders] = await Promise.all([
            database_1.prisma.product.count(),
            database_1.prisma.category.count(),
            database_1.prisma.order.count(),
            database_1.prisma.order.count({
                where: {
                    orderStatus: "PENDING"
                }
            }),
            database_1.prisma.order.count({
                where: {
                    orderStatus: "DELIVERED"
                }
            }),
            database_1.prisma.order.count({
                where: {
                    orderStatus: "CANCELLED"
                }
            })
        ]);
        const revenue = await database_1.prisma.order.aggregate({
            _sum: {
                totalAmount: true
            },
            where: {
                paymentStatus: "PAID"
            }
        });
        const lowStockProducts = await database_1.prisma.product.findMany({
            where: {
                stock: {
                    lte: 5
                }
            },
            orderBy: {
                stock: "asc"
            },
            take: 5
        });
        const recentOrders = await database_1.prisma.order.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            include: {
                items: true
            }
        });
        return {
            overview: {
                totalProducts,
                totalCategories,
                totalOrders,
                pendingOrders,
                deliveredOrders,
                cancelledOrders,
                totalRevenue: revenue._sum.totalAmount ??
                    new client_1.Prisma.Decimal(0)
            },
            lowStockProducts,
            recentOrders
        };
    }
}
exports.DashboardService = DashboardService;
