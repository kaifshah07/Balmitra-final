"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentStatusSchema = void 0;
const zod_1 = require("zod");
exports.paymentStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        paymentStatus: zod_1.z.enum([
            "PENDING",
            "PAID",
            "FAILED",
            "REFUNDED",
        ]),
    }),
});
