"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusSchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(2),
    customerEmail: zod_1.z.string().email(),
    customerPhone: zod_1.z.string().min(10),
    address: zod_1.z.string(),
    paymentMethod: zod_1.z.enum(["COD", "ONLINE"]),
    items: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.number(),
        quantity: zod_1.z.number().min(1)
    }))
});
exports.updateStatusSchema = zod_1.z.object({
    orderStatus: zod_1.z.enum([
        "PENDING",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED"
    ])
});
