"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageHeroController = void 0;
const homepage_hero_service_1 = require("./homepage-hero.service");
const cloudinaryUploads_1 = require("../../utils/cloudinaryUploads");
class HomepageHeroController {
    static async getAll(req, res) {
        const data = await homepage_hero_service_1.HomepageHeroService.getAll();
        return res.json({
            success: true,
            data,
        });
    }
    static async create(req, res) {
        try {
            let desktopImage = "";
            let mobileImage = "";
            if (req.files) {
                const files = req.files;
                if (files.desktopImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.desktopImage[0].buffer, "balmitra/heroes");
                    desktopImage =
                        upload.secure_url;
                }
                if (files.mobileImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.mobileImage[0].buffer, "balmitra/heroes");
                    mobileImage =
                        upload.secure_url;
                }
            }
            const hero = await homepage_hero_service_1.HomepageHeroService.create({
                title: req.body.title,
                subtitle: req.body.subtitle || null,
                buttonText: req.body.buttonText || null,
                buttonUrl: req.body.buttonUrl || null,
                displayOrder: req.body.displayOrder !== undefined ? Number(req.body.displayOrder) : 0,
                isActive: req.body.isActive === undefined ? true : (req.body.isActive === true || req.body.isActive === "true"),
                desktopImage,
                mobileImage: mobileImage || null,
            });
            return res.status(201).json({
                success: true,
                data: hero,
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
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.desktopImage[0].buffer, "balmitra/heroes");
                    desktopImage =
                        upload.secure_url;
                }
                if (files.mobileImage?.[0]) {
                    const upload = await (0, cloudinaryUploads_1.uploadToCloudinary)(files.mobileImage[0].buffer, "balmitra/heroes");
                    mobileImage =
                        upload.secure_url;
                }
            }
            const updateData = {};
            if (req.body.title !== undefined)
                updateData.title = req.body.title;
            if (req.body.subtitle !== undefined)
                updateData.subtitle = req.body.subtitle || null;
            if (req.body.buttonText !== undefined)
                updateData.buttonText = req.body.buttonText || null;
            if (req.body.buttonUrl !== undefined)
                updateData.buttonUrl = req.body.buttonUrl || null;
            if (req.body.displayOrder !== undefined)
                updateData.displayOrder = Number(req.body.displayOrder);
            if (req.body.isActive !== undefined)
                updateData.isActive = req.body.isActive === true || req.body.isActive === "true";
            if (desktopImage)
                updateData.desktopImage = desktopImage;
            if (mobileImage)
                updateData.mobileImage = mobileImage;
            const hero = await homepage_hero_service_1.HomepageHeroService.update(Number(req.params.id), updateData);
            return res.json({
                success: true,
                data: hero,
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
        await homepage_hero_service_1.HomepageHeroService.delete(Number(req.params.id));
        return res.json({
            success: true,
            message: "Hero deleted successfully",
        });
    }
}
exports.HomepageHeroController = HomepageHeroController;
