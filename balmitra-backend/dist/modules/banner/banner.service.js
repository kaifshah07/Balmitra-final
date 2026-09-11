"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerService = void 0;
const database_1 = require("../../config/database");
class BannerService {
    static async create(data) {
        return database_1.prisma.banner.create({
            data
        });
    }
    static async getAll() {
        return database_1.prisma.banner.findMany({
            orderBy: {
                displayOrder: "asc"
            }
        });
    }
    static async getById(id) {
        return database_1.prisma.banner.findUnique({
            where: { id }
        });
    }
    static async update(id, data) {
        return database_1.prisma.banner.update({
            where: { id },
            data
        });
    }
    static async delete(id) {
        return database_1.prisma.banner.delete({
            where: { id }
        });
    }
}
exports.BannerService = BannerService;
