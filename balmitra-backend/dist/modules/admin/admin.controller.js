"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
class AdminController {
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await admin_service_1.AdminService.login(username, password);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.AdminController = AdminController;
