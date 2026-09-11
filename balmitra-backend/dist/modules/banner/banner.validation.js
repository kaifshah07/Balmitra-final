"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBannerSchema = exports.createBannerSchema = void 0;
const zod_1 = require("zod");
exports.createBannerSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    subtitle: zod_1.z.string().optional(),
    redirectUrl: zod_1.z.string().optional(),
    displayOrder: zod_1.z.number().optional(),
});
exports.updateBannerSchema = exports.createBannerSchema.partial();
