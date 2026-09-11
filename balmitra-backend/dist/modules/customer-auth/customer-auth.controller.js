"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthController = void 0;
const customer_auth_service_1 = require("./customer-auth.service");
class CustomerAuthController {
    // =========================
    // REGISTER
    // =========================
    static async register(req, res) {
        try {
            const result = await customer_auth_service_1.CustomerAuthService.register(req.body);
            return res.status(201).json({
                success: true,
                message: result.message,
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // LOGIN
    // =========================
    static async login(req, res) {
        try {
            const result = await customer_auth_service_1.CustomerAuthService.login(req.body.email, req.body.password);
            return res.json({
                success: true,
                message: "Login successful",
                data: result,
            });
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // ME
    // =========================
    static async me(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                });
            }
            const customer = await customer_auth_service_1.CustomerAuthService.getProfile(Number(customerId));
            return res.json({
                success: true,
                data: {
                    customer,
                },
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // VERIFY OTP
    // =========================
    static async verifyOtp(req, res) {
        try {
            const { customerId, otp } = req.body;
            if (!customerId || !otp) {
                return res.status(400).json({
                    success: false,
                    message: "Customer ID and OTP are required",
                });
            }
            const result = await customer_auth_service_1.CustomerAuthService.verifyOtp(Number(customerId), String(otp));
            return res.status(200).json({
                success: true,
                message: "Email verified successfully",
                data: result,
            });
        }
        catch (error) {
            console.error("Verify OTP Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // RESEND OTP
    // =========================
    static async resendOtp(req, res) {
        try {
            const { customerId } = req.body;
            if (!customerId) {
                return res.status(400).json({
                    success: false,
                    message: "Customer ID is required",
                });
            }
            const result = await customer_auth_service_1.CustomerAuthService.resendOtp(Number(customerId));
            return res.status(200).json({
                success: true,
                message: "Verification OTP resent",
                data: result,
            });
        }
        catch (error) {
            console.error("Resend OTP Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.CustomerAuthController = CustomerAuthController;
