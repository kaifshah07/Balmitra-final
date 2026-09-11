"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../config/database");
const brevo_1 = require("../../config/brevo");
const env_1 = require("../../config/env");
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function generateOtpExpiry() {
    return new Date(Date.now() + 10 * 60 * 1000);
}
function generateToken(customer) {
    return jsonwebtoken_1.default.sign({
        id: customer.id,
        email: customer.email,
        role: "CUSTOMER",
    }, env_1.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}
class CustomerAuthService {
    // =========================
    // REGISTER
    // =========================
    static async register(data) {
        const email = data.email.toLowerCase().trim();
        const existingEmail = await database_1.prisma.customer.findUnique({
            where: {
                email,
            },
        });
        if (existingEmail) {
            if (!existingEmail.isVerified) {
                const otp = generateOtp();
                const otpExpiresAt = generateOtpExpiry();
                await database_1.prisma.customer.update({
                    where: {
                        id: existingEmail.id,
                    },
                    data: {
                        otpCode: otp,
                        otpExpiresAt,
                    },
                });
                await (0, brevo_1.sendOtpEmail)(existingEmail.email, existingEmail.name, otp);
                return {
                    requiresVerification: true,
                    customerId: existingEmail.id,
                    email: existingEmail.email,
                    message: "Verification OTP sent",
                };
            }
            throw new Error("Email already registered");
        }
        const existingPhone = await database_1.prisma.customer.findUnique({
            where: {
                phone: data.phone,
            },
        });
        if (existingPhone) {
            throw new Error("Phone number already registered");
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const otp = generateOtp();
        const otpExpiresAt = generateOtpExpiry();
        const customer = await database_1.prisma.customer.create({
            data: {
                name: data.name,
                email,
                phone: data.phone,
                password: hashedPassword,
                isVerified: false,
                otpCode: otp,
                otpExpiresAt,
            },
        });
        await (0, brevo_1.sendOtpEmail)(customer.email, customer.name, otp);
        return {
            requiresVerification: true,
            customerId: customer.id,
            email: customer.email,
            message: "Verification OTP sent",
        };
    }
    // =========================
    // VERIFY OTP
    // =========================
    static async verifyOtp(customerId, otp) {
        const customer = await database_1.prisma.customer.findUnique({
            where: {
                id: customerId,
            },
        });
        if (!customer) {
            throw new Error("Customer not found");
        }
        if (customer.isVerified) {
            throw new Error("Account is already verified");
        }
        if (!customer.otpCode) {
            throw new Error("No OTP found. Please request a new OTP");
        }
        if (!customer.otpExpiresAt ||
            customer.otpExpiresAt < new Date()) {
            throw new Error("OTP has expired. Please request a new OTP");
        }
        if (customer.otpCode !== otp) {
            throw new Error("Invalid OTP");
        }
        const updatedCustomer = await database_1.prisma.customer.update({
            where: {
                id: customer.id,
            },
            data: {
                isVerified: true,
                otpCode: null,
                otpExpiresAt: null,
            },
        });
        const token = generateToken({
            id: updatedCustomer.id,
            email: updatedCustomer.email,
        });
        return {
            customer: {
                id: updatedCustomer.id,
                name: updatedCustomer.name,
                email: updatedCustomer.email,
                phone: updatedCustomer.phone,
                isBlocked: updatedCustomer.isBlocked,
                isVerified: updatedCustomer.isVerified,
            },
            token,
        };
    }
    // =========================
    // RESEND OTP
    // =========================
    static async resendOtp(customerId) {
        const customer = await database_1.prisma.customer.findUnique({
            where: {
                id: customerId,
            },
        });
        if (!customer) {
            throw new Error("Customer not found");
        }
        if (customer.isVerified) {
            throw new Error("Account is already verified");
        }
        const otp = generateOtp();
        const otpExpiresAt = generateOtpExpiry();
        await database_1.prisma.customer.update({
            where: {
                id: customer.id,
            },
            data: {
                otpCode: otp,
                otpExpiresAt,
            },
        });
        await (0, brevo_1.sendOtpEmail)(customer.email, customer.name, otp);
        return {
            customerId: customer.id,
            email: customer.email,
            message: "New OTP sent",
        };
    }
    // =========================
    // LOGIN
    // =========================
    static async login(email, password) {
        const customer = await database_1.prisma.customer.findUnique({
            where: {
                email: email.toLowerCase().trim(),
            },
        });
        if (!customer) {
            throw new Error("Invalid email or password");
        }
        if (customer.isBlocked) {
            throw new Error("Your account has been blocked");
        }
        if (!customer.isVerified) {
            throw new Error("Please verify your email before logging in");
        }
        const passwordMatch = await bcryptjs_1.default.compare(password, customer.password);
        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }
        const token = generateToken({
            id: customer.id,
            email: customer.email,
        });
        return {
            customer: {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                isBlocked: customer.isBlocked,
                isVerified: customer.isVerified,
            },
            token,
        };
    }
    // =========================
    // PROFILE
    // =========================
    static async getProfile(id) {
        const customer = await database_1.prisma.customer.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isBlocked: true,
                isVerified: true,
                createdAt: true,
            },
        });
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }
}
exports.CustomerAuthService = CustomerAuthService;
