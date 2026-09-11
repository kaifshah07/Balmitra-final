"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsSchema = void 0;
const zod_1 = require("zod");
exports.settingsSchema = zod_1.z.object({
    websiteName: zod_1.z.string().optional(),
    logo: zod_1.z.string().optional(),
    favicon: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    facebook: zod_1.z.string().optional(),
    instagram: zod_1.z.string().optional(),
    youtube: zod_1.z.string().optional(),
    linkedin: zod_1.z.string().optional(),
    footerText: zod_1.z.string().optional(),
    seoTitle: zod_1.z.string().optional(),
    seoDescription: zod_1.z.string().optional(),
    smtpHost: zod_1.z.string().optional(),
    smtpPort: zod_1.z.number().optional(),
    smtpUser: zod_1.z.string().optional(),
    smtpPassword: zod_1.z.string().optional(),
});
