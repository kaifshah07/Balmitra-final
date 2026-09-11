"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponSchema = void 0;
const zod_1 = require("zod");
exports.couponSchema = zod_1.z.object({
    code: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    discountType: zod_1.z.enum([
        "PERCENTAGE",
        "FIXED",
    ]),
    discountValue: zod_1.z.number().positive(),
    minOrderAmount: zod_1.z.number().optional(),
    maxDiscount: zod_1.z.number().optional(),
    usageLimit: zod_1.z.number().optional(),
    expiresAt: zod_1.z.string().optional(),
});
