"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const settings_service_1 = require("./settings.service");
class SettingsController {
    static async get(req, res) {
        try {
            const settings = await settings_service_1.SettingsService.getSettings();
            return res.json({
                success: true,
                data: settings,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async update(req, res) {
        try {
            const settings = await settings_service_1.SettingsService.update(req.body);
            return res.json({
                success: true,
                message: "Settings updated successfully",
                data: settings,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.SettingsController = SettingsController;
