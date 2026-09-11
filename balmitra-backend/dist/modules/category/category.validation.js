"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Category name is required"),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    displayOrder: zod_1.z.number().optional(),
});
exports.updateCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    displayOrder: zod_1.z.number().optional(),
    isActive: zod_1.z.boolean().optional(),
});
