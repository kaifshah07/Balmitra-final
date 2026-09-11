"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtpSchema = exports.verifyOtpSchema = exports.loginCustomerSchema = exports.registerCustomerSchema = void 0;
const zod_1 = require("zod");
exports.registerCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters"),
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email"),
        phone: zod_1.z
            .string()
            .trim()
            .length(10, "Phone number must be 10 digits"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters"),
    }),
});
exports.loginCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email"),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters"),
    }),
});
exports.verifyOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.coerce.number().int().positive(),
        otp: zod_1.z
            .string()
            .trim()
            .length(6, "OTP must be 6 digits"),
    }),
});
exports.resendOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerId: zod_1.z.coerce.number().int().positive(),
    }),
});
