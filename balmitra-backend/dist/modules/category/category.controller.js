"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const cloudinaryUploads_1 = require("../../utils/cloudinaryUploads");
class CategoryController {
    static async create(req, res) {
        try {
            const image = req.file
                ? (await (0, cloudinaryUploads_1.uploadToCloudinary)(req.file.buffer, "balmitra/categories")).secure_url
                : undefined;
            const category = await category_service_1.CategoryService.create({ ...req.body, ...(image && { image }) });
            return res.status(201).json({
                success: true,
                message: "Category created successfully",
                data: category,
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
        const categories = await category_service_1.CategoryService.getAll();
        return res.json({
            success: true,
            data: categories,
        });
    }
    static async getById(req, res) {
        const id = Number(req.params.id);
        const category = await category_service_1.CategoryService.getById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        return res.json({
            success: true,
            data: category,
        });
    }
    static async update(req, res) {
        const id = Number(req.params.id);
        const image = req.file
            ? (await (0, cloudinaryUploads_1.uploadToCloudinary)(req.file.buffer, "balmitra/categories")).secure_url
            : undefined;
        const category = await category_service_1.CategoryService.update(id, { ...req.body, ...(image && { image }) });
        return res.json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    }
    static async delete(req, res) {
        const id = Number(req.params.id);
        await category_service_1.CategoryService.delete(id);
        return res.json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    static async getBySlug(req, res) {
        try {
            const slug = String(req.params.slug);
            const category = await category_service_1.CategoryService.getBySlug(slug);
            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }
            return res.json({
                success: true,
                data: category,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.CategoryController = CategoryController;
