"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = void 0;
const zod_1 = require("zod");
exports.adminLoginSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters"),
});
