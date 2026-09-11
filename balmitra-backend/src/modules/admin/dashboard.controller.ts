import { Response } from "express";
import { prisma } from "../../config/database";
import { AuthRequest } from "../../middleware/auth.middleware";

export class DashboardController {
  static async getDashboard(req: AuthRequest, res: Response) {
    try {
      // Dashboard Statistics
      const [
        totalProducts,
        totalCategories,
      ] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
      ]);

      // Recent Products
      const recentProducts = await prisma.product.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
        },
      });

      // Low Stock Products
      const lowStockProducts = await prisma.product.findMany({
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
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}