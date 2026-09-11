"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendorEnquirySchema = void 0;
const zod_1 = require("zod");
exports.createVendorEnquirySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters"),
    mobile: zod_1.z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
    email: zod_1.z
        .string()
        .trim()
        .email("Invalid email")
        .optional()
        .or(zod_1.z.literal("")),
    city: zod_1.z
        .string()
        .trim()
        .min(2, "City is required"),
    state: zod_1.z
        .string()
        .trim()
        .min(2, "State is required"),
    currentBusiness: zod_1.z
        .string()
        .trim()
        .optional(),
    investmentCapacity: zod_1.z
        .string()
        .trim()
        .optional(),
    preferredLocation: zod_1.z
        .string()
        .trim()
        .optional(),
    message: zod_1.z
        .string()
        .trim()
        .optional(),
});
