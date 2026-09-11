"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
class ProductController {
    // =========================
    // CREATE PRODUCT
    // =========================
    static async create(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "A product image is required. Select an image and try again.",
                });
            }
            const product = await product_service_1.ProductService.create({
                ...req.body,
                file: req.file,
            });
            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });
        }
        catch (error) {
            console.error("========== PRODUCT ERROR ==========");
            console.error(error);
            console.error("MESSAGE:", error?.message);
            console.error("FULL RESPONSE:", error?.response);
            console.error("===================================");
            return res.status(400).json({
                success: false,
                message: error?.message || "Unknown error",
            });
        }
    }
    // =========================
    // GET ALL PRODUCTS
    // =========================
    static async getAll(req, res) {
        try {
            const products = await product_service_1.ProductService.getAll();
            return res.json({
                success: true,
                data: products,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // GET PRODUCT BY ID
    // =========================
    static async getById(req, res) {
        try {
            const product = await product_service_1.ProductService.getById(Number(req.params.id));
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            return res.json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // UPDATE PRODUCT
    // =========================
    static async update(req, res) {
        try {
            const product = await product_service_1.ProductService.update(Number(req.params.id), {
                ...req.body,
                imageFile: req.file,
            });
            return res.json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });
        }
        catch (error) {
            console.error("Update Product Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message ||
                    "Failed to update product",
            });
        }
    }
    // =========================
    // DELETE PRODUCT
    // =========================
    static async delete(req, res) {
        try {
            await product_service_1.ProductService.delete(Number(req.params.id));
            return res.json({
                success: true,
                message: "Product deleted successfully",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // PUBLIC PRODUCTS
    // =========================
    static async getPublicProducts(req, res) {
        try {
            const products = await product_service_1.ProductService.getPublicProducts(req.query);
            return res.json({
                success: true,
                data: products,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // =========================
    // PUBLIC PRODUCT BY ID
    // =========================
    static async getPublicProductById(req, res) {
        try {
            const product = await product_service_1.ProductService.getPublicProductById(Number(req.params.id));
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                });
            }
            return res.json({
                success: true,
                data: product,
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
exports.ProductController = ProductController;
