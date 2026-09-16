"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseAuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class FranchiseAuthService {
    static async login(emailOrPhone, passwordString) {
        const user = await prisma.franchiseUser.findFirst({
            where: {
                OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
            },
        });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        if (!user.isActive) {
            throw new Error("Your franchise account is deactivated.");
        }
        const isMatch = await bcryptjs_1.default.compare(passwordString, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: "franchise", roleTier: user.roleTier }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return {
            token,
            user: {
                id: user.id,
                franchiseId: user.franchiseId,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                roleTier: user.roleTier,
                businessName: user.businessName,
                shopName: user.shopName,
            },
        };
    }
    static async requestOtp(email) {
        // In a real app, generate OTP and send via email/SMS
        const user = await prisma.franchiseUser.findUnique({ where: { email } });
        if (!user)
            throw new Error("User not found");
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60000); // 10 mins
        await prisma.franchiseUser.update({
            where: { email },
            data: { otpCode: otp, otpExpiresAt: expires },
        });
        // Mock sending email
        console.log(`[Mock] OTP for ${email} is ${otp}`);
        return { success: true, message: "OTP sent successfully" };
    }
    static async verifyOtpAndResetPassword(email, otp, newPassword) {
        const user = await prisma.franchiseUser.findUnique({ where: { email } });
        if (!user)
            throw new Error("User not found");
        if (user.otpCode !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            throw new Error("Invalid or expired OTP");
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        await prisma.franchiseUser.update({
            where: { email },
            data: {
                password: hashedPassword,
                otpCode: null,
                otpExpiresAt: null,
            },
        });
        return { success: true, message: "Password updated successfully" };
    }
}
exports.FranchiseAuthService = FranchiseAuthService;
