"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseAuthController = void 0;
const franchise_auth_service_1 = require("./franchise-auth.service");
class FranchiseAuthController {
    static async login(req, res) {
        try {
            const { identifier, password } = req.body;
            const result = await franchise_auth_service_1.FranchiseAuthService.login(identifier, password);
            res.json({ success: true, ...result });
        }
        catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await franchise_auth_service_1.FranchiseAuthService.requestOtp(email);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    static async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;
            const result = await franchise_auth_service_1.FranchiseAuthService.verifyOtpAndResetPassword(email, otp, newPassword);
            res.json(result);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseAuthController = FranchiseAuthController;
