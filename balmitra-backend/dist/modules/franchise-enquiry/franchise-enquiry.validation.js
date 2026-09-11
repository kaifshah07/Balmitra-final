"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFranchiseEnquirySchema = void 0;
const zod_1 = require("zod");
exports.createFranchiseEnquirySchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string()
            .trim()
            .min(2, "Full name is required"),
        mobile: zod_1.z
            .string()
            .trim()
            .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
        email: zod_1.z
            .string()
            .trim()
            .email("Invalid email address"),
        city: zod_1.z
            .string()
            .trim()
            .min(2, "City is required"),
        state: zod_1.z
            .string()
            .trim()
            .min(2, "State is required"),
        ownsBusiness: zod_1.z.boolean(),
        currentBusinessName: zod_1.z
            .string()
            .trim()
            .optional(),
        currentBusinessType: zod_1.z
            .string()
            .trim()
            .optional(),
        businessExperience: zod_1.z
            .string()
            .trim()
            .optional(),
        preferredLocation: zod_1.z
            .string()
            .trim()
            .min(2, "Preferred location is required"),
        preferredCity: zod_1.z
            .string()
            .trim()
            .min(2, "Preferred city is required"),
        preferredArea: zod_1.z
            .string()
            .trim()
            .optional(),
        investmentCapacity: zod_1.z
            .string()
            .trim()
            .min(1, "Investment capacity is required"),
        storeType: zod_1.z
            .string()
            .trim()
            .min(1, "Store type is required"),
        startTimeline: zod_1.z
            .string()
            .trim()
            .min(1, "Start timeline is required"),
        message: zod_1.z
            .string()
            .trim()
            .optional(),
    }),
});
