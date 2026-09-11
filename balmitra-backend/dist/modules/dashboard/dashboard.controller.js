"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
class DashboardController {
    static async getDashboard(req, res) {
        try {
            const dashboard = await dashboard_service_1.DashboardService.getDashboard();
            return res.json({
                success: true,
                dashboard
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}
exports.DashboardController = DashboardController;
