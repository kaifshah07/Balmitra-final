"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseDashboardService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FranchiseDashboardService {
    static async getDashboardStats(franchiseId) {
        // 1. Inventory Stats
        const stocks = await prisma.franchiseStock.findMany({
            where: { franchiseId },
        });
        let totalStock = 0;
        let lowStock = 0;
        let outOfStock = 0;
        stocks.forEach(stock => {
            totalStock += stock.quantity;
            if (stock.quantity === 0) {
                outOfStock++;
            }
            else if (stock.quantity < 10) {
                lowStock++;
            }
        });
        // 2. B2B Orders Count
        const totalOrders = await prisma.franchiseOrder.count({
            where: { franchiseId }
        });
        // 3. POS Sales Total
        const invoices = await prisma.franchiseInvoice.findMany({
            where: { franchiseId },
            select: { totalAmount: true }
        });
        const totalSales = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
        // 4. Recent B2B Orders
        const recentOrders = await prisma.franchiseOrder.findMany({
            where: { franchiseId },
            orderBy: { createdAt: "desc" },
            take: 5
        });
        // 5. Recent POS Invoices
        const recentInvoices = await prisma.franchiseInvoice.findMany({
            where: { franchiseId },
            orderBy: { createdAt: "desc" },
            take: 5
        });
        return {
            stats: {
                totalStock,
                lowStock,
                outOfStock,
                totalOrders,
                totalSales: totalSales.toFixed(2)
            },
            recentOrders,
            recentInvoices
        };
    }
}
exports.FranchiseDashboardService = FranchiseDashboardService;
