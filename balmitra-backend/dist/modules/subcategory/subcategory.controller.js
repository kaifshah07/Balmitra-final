"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryController = void 0;
const subcategory_service_1 = require("./subcategory.service");
class SubCategoryController {
    // GET ALL
    static async getAll(req, res) {
        try {
            const subCategories = await subcategory_service_1.SubCategoryService.getAll();
            return res.json({
                success: true,
                data: subCategories,
            });
        }
        catch (error) {
            console.error("Get Subcategories Error:", error);
            return res.status(500).json({
                success: false,
                message: error.message ||
                    "Unable to fetch subcategories",
            });
        }
    }
    // GET BY CATEGORY
    static async getByCategory(req, res) {
        try {
            const categoryId = Number(req.params.categoryId);
            if (isNaN(categoryId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category ID",
                });
            }
            const subCategories = await subcategory_service_1.SubCategoryService.getByCategory(categoryId);
            return res.json({
                success: true,
                data: subCategories,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message ||
                    "Unable to fetch subcategories",
            });
        }
    }
    // GET BY ID
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const subCategory = await subcategory_service_1.SubCategoryService.getById(id);
            if (!subCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Subcategory not found",
                });
            }
            return res.json({
                success: true,
                data: subCategory,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // CREATE
    static async create(req, res) {
        try {
            const subCategory = await subcategory_service_1.SubCategoryService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Subcategory created successfully",
                data: subCategory,
            });
        }
        catch (error) {
            console.error("Create Subcategory Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message ||
                    "Unable to create subcategory",
            });
        }
    }
    // UPDATE
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            const subCategory = await subcategory_service_1.SubCategoryService.update(id, req.body);
            return res.json({
                success: true,
                message: "Subcategory updated successfully",
                data: subCategory,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message ||
                    "Unable to update subcategory",
            });
        }
    }
    // DELETE
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await subcategory_service_1.SubCategoryService.delete(id);
            return res.json({
                success: true,
                message: "Subcategory deleted successfully",
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message ||
                    "Unable to delete subcategory",
            });
        }
    }
}
exports.SubCategoryController = SubCategoryController;
