"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageAdvertisementService = void 0;
const database_1 = require("../../config/database");
class HomepageAdvertisementService {
    static async getAll() {
        return database_1.prisma.homepageAdvertisement.findMany({
            orderBy: {
                displayOrder: "asc",
            },
        });
    }
    static async getById(id) {
        return database_1.prisma.homepageAdvertisement.findUnique({
            where: { id },
        });
    }
    static async create(data) {
        return database_1.prisma.homepageAdvertisement.create({
            data,
        });
    }
    static async update(id, data) {
        return database_1.prisma.homepageAdvertisement.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        return database_1.prisma.homepageAdvertisement.delete({
            where: { id },
        });
    }
}
exports.HomepageAdvertisementService = HomepageAdvertisementService;
