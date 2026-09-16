"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseUserService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
class FranchiseUserService {
    static async createFranchiseUser(data) {
        // Generate Franchise ID (e.g., BAL-FR-001)
        const count = await prisma.franchiseUser.count();
        const franchiseId = `BAL-FR-${String(count + 1).padStart(3, "0")}`;
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        return prisma.franchiseUser.create({
            data: {
                franchiseId,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                password: hashedPassword,
                roleTier: data.roleTier,
                gstNumber: data.gstNumber || null,
                parentId: data.parentId ? Number(data.parentId) : null,
                address: data.address,
                city: data.city,
                state: data.state,
                pincode: data.pincode,
                businessName: data.businessName,
                shopName: data.shopName,
                isActive: data.isActive !== undefined ? data.isActive : true,
            },
        });
    }
    static async getAllFranchiseUsers() {
        return prisma.franchiseUser.findMany({
            include: {
                parent: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async getFranchiseUserById(id) {
        return prisma.franchiseUser.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
            },
        });
    }
    static async updateFranchiseUser(id, data) {
        const updateData = { ...data };
        if (data.password) {
            updateData.password = await bcryptjs_1.default.hash(data.password, 10);
        }
        if (data.parentId !== undefined) {
            updateData.parentId = data.parentId ? Number(data.parentId) : null;
        }
        return prisma.franchiseUser.update({
            where: { id },
            data: updateData,
        });
    }
    static async toggleStatus(id, isActive) {
        return prisma.franchiseUser.update({
            where: { id },
            data: { isActive },
        });
    }
}
exports.FranchiseUserService = FranchiseUserService;
