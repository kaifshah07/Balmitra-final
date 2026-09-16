"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseDashboardController = void 0;
const franchise_dashboard_service_1 = require("./franchise-dashboard.service");
class FranchiseDashboardController {
    static async getStats(req, res) {
        try {
            const franchiseId = req.user.id;
            const data = await franchise_dashboard_service_1.FranchiseDashboardService.getDashboardStats(franchiseId);
            res.json({ success: true, data });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseDashboardController = FranchiseDashboardController;
