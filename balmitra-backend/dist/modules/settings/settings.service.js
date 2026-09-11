"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const database_1 = require("../../config/database");
class SettingsService {
    static async getSettings() {
        let settings = await database_1.prisma.websiteSetting.findFirst();
        if (!settings) {
            settings = await database_1.prisma.websiteSetting.create({
                data: {
                    websiteName: "Balmitra",
                    email: "info@balmitra.com",
                    phone: "9999999999",
                    address: "Aurangabad",
                },
            });
        }
        return settings;
    }
    static async update(data) {
        const settings = await database_1.prisma.websiteSetting.findFirst();
        if (!settings) {
            throw new Error("Website settings not found");
        }
        return database_1.prisma.websiteSetting.update({
            where: {
                id: settings.id,
            },
            data,
        });
    }
}
exports.SettingsService = SettingsService;
