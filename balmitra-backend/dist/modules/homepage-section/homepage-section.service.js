"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageSectionService = void 0;
const database_1 = require("../../config/database");
class HomepageSectionService {
    static async getAll() {
        return database_1.prisma.homepageSection.findMany();
    }
    static async getByKey(key) {
        return database_1.prisma.homepageSection.findUnique({
            where: {
                key,
            },
        });
    }
    static async update(key, data) {
        return database_1.prisma.homepageSection.upsert({
            where: {
                key,
            },
            create: {
                key,
                ...data,
            },
            update: data,
        });
    }
}
exports.HomepageSectionService = HomepageSectionService;
