"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageHeroService = void 0;
const database_1 = require("../../config/database");
class HomepageHeroService {
    static async getAll() {
        return database_1.prisma.homepageHero.findMany({
            orderBy: {
                displayOrder: "asc",
            },
        });
    }
    static async getById(id) {
        return database_1.prisma.homepageHero.findUnique({
            where: { id },
        });
    }
    static async create(data) {
        return database_1.prisma.homepageHero.create({
            data,
        });
    }
    static async update(id, data) {
        return database_1.prisma.homepageHero.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        return database_1.prisma.homepageHero.delete({
            where: { id },
        });
    }
}
exports.HomepageHeroService = HomepageHeroService;
