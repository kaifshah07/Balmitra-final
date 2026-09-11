"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageAdvertisementController = void 0;
const homepage_advertisement_service_1 = require("./homepage-advertisement.service");
const cloudinaryUploads_1 = require("../../utils/cloudinaryUploads");
class HomepageAdvertisementController {
    static async getAll(req, res) {
        const ads = await homepage_advertisement_service_1.HomepageAdvertisementService.getAll();
        return res.json({
            success: true,
            data: ads,
        });
    }
    static async getById(req, res) {
        const ad = await homepage_advertisement_service_1.HomepageAdvertisementService.getById(Number(req.params.id));
        return res.json({
            success: true,
            data: ad,
        });
    }
    static async create(req, res) {
        try {
            let desktopImage = "";
            let mobileImage = "";
            if (req.files) {
                const files = req.files;
                if (files.desktopImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.desktopImage[0].buffer, "balmitra/ads");
                    desktopImage =
                        upload.secure_url;
                }
                if (files.mobileImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.mobileImage[0].buffer, "balmitra/ads");
                    mobileImage =
                        upload.secure_url;
                }
            }
            const ad = await homepage_advertisement_service_1.HomepageAdvertisementService.create({
                title: req.body.title || null,
                redirectUrl: req.body.redirectUrl || null,
                position: req.body.position || "banner_strip",
                displayOrder: req.body.displayOrder !== undefined ? Number(req.body.displayOrder) : 0,
                isActive: req.body.isActive === undefined ? true : (req.body.isActive === true || req.body.isActive === "true"),
                desktopImage,
                mobileImage: mobileImage || null,
            });
            return res.status(201).json({
                success: true,
                data: ad,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async update(req, res) {
        try {
            let desktopImage;
            let mobileImage;
            if (req.files) {
                const files = req.files;
                if (files.desktopImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.desktopImage[0].buffer, "balmitra/ads");
                    desktopImage =
                        upload.secure_url;
                }
                if (files.mobileImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.mobileImage[0].buffer, "balmitra/ads");
                    mobileImage =
                        upload.secure_url;
                }
            }
            const updateData = {};
            if (req.body.title !== undefined)
                updateData.title = req.body.title || null;
            if (req.body.redirectUrl !== undefined)
                updateData.redirectUrl = req.body.redirectUrl || null;
            if (req.body.position !== undefined)
                updateData.position = req.body.position;
            if (req.body.displayOrder !== undefined)
                updateData.displayOrder = Number(req.body.displayOrder);
            if (req.body.isActive !== undefined)
                updateData.isActive = req.body.isActive === true || req.body.isActive === "true";
            if (desktopImage)
                updateData.desktopImage = desktopImage;
            if (mobileImage)
                updateData.mobileImage = mobileImage;
            const ad = await homepage_advertisement_service_1.HomepageAdvertisementService.update(Number(req.params.id), updateData);
            return res.json({
                success: true,
                data: ad,
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
        await homepage_advertisement_service_1.HomepageAdvertisementService.delete(Number(req.params.id));
        return res.json({
            success: true,
            message: "Advertisement deleted",
        });
    }
}
exports.HomepageAdvertisementController = HomepageAdvertisementController;
