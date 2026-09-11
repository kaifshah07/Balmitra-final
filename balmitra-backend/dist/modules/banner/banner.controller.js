"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerController = void 0;
const banner_service_1 = require("./banner.service");
const cloudinaryUploads_1 = require("../../utils/cloudinaryUploads");
class BannerController {
    static async create(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "Banner image is required" });
            }
            const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(req.file.buffer, "balmitra/banners");
            const banner = await banner_service_1.BannerService.create({
                ...req.body,
                image: upload.secure_url,
            });
            return res.status(201).json({
                success: true,
                message: "Banner created successfully",
                data: banner,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async getAll(req, res) {
        const banners = await banner_service_1.BannerService.getAll();
        return res.json({
            success: true,
            data: banners,
        });
    }
    static async getById(req, res) {
        const banner = await banner_service_1.BannerService.getById(Number(req.params.id));
        return res.json({
            success: true,
            data: banner,
        });
    }
    static async update(req, res) {
        try {
            const upload = req.file
                ? await (0, cloudinaryUploads_1.uploadToCloudinary)(req.file.buffer, "balmitra/banners")
                : null;
            const banner = await banner_service_1.BannerService.update(Number(req.params.id), {
                ...req.body,
                ...(upload && {
                    image: upload.secure_url,
                }),
            });
            return res.json({
                success: true,
                message: "Banner updated successfully",
                data: banner,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async delete(req, res) {
        await banner_service_1.BannerService.delete(Number(req.params.id));
        return res.json({
            success: true,
            message: "Banner deleted successfully",
        });
    }
}
exports.BannerController = BannerController;
