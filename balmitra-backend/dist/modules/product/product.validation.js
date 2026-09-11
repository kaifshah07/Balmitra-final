"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    shortDescription: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
    ageGroup: zod_1.z.string().optional(),
    price: zod_1.z.number().positive(),
    discountPrice: zod_1.z.number().optional(),
    stock: zod_1.z.number().int().nonnegative(),
    categoryId: zod_1.z.number(),
    thumbnail: zod_1.z.string().optional(),
    isFeatured: zod_1.z.boolean().optional(),
    isTrending: zod_1.z.boolean().optional(),
    isNewArrival: zod_1.z.boolean().optional(),
    metaTitle: zod_1.z.string().optional(),
    metaDescription: zod_1.z.string().optional()
});
exports.updateProductSchema = exports.createProductSchema.partial();
