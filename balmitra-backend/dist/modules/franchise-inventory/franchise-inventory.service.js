"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseInventoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FranchiseInventoryService {
    static async getFranchiseStock(franchiseId) {
        return prisma.franchiseStock.findMany({
            where: { franchiseId },
            include: {
                product: true,
            },
            orderBy: { quantity: "asc" }
        });
    }
    static async adjustStock(franchiseId, productId, delta) {
        return prisma.franchiseStock.upsert({
            where: {
                franchiseId_productId: {
                    franchiseId,
                    productId
                }
            },
            update: { quantity: { increment: delta } },
            create: {
                franchiseId,
                productId,
                quantity: delta
            }
        });
    }
}
exports.FranchiseInventoryService = FranchiseInventoryService;
