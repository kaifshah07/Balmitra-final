"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubCategorySchema = void 0;
const zod_1 = require("zod");
exports.createSubCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .trim()
            .min(2, "Subcategory name is required"),
        categoryId: zod_1.z.coerce
            .number()
            .int()
            .positive("Category is required"),
        description: zod_1.z
            .string()
            .trim()
            .optional(),
        image: zod_1.z
            .string()
            .trim()
            .optional(),
        displayOrder: zod_1.z.coerce
            .number()
            .int()
            .min(0)
            .optional(),
        isActive: zod_1.z
            .boolean()
            .optional(),
    }),
});
