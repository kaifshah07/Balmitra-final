"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = require("../../config/database");
const cloudinaryUploads_1 = require("../../utils/cloudinaryUploads");
class ProductService {
    // =========================================================
    // CREATE PRODUCT
    // =========================================================
    static async create(data) {
        console.log("=== PRODUCT CREATE STARTED ===");
        let thumbnailUrl = null;
        let thumbnailPublicId = null;
        if (data.file) {
            console.log("FILE RECEIVED:", !!data.file);
            console.log("FILE SIZE:", data.file?.buffer?.length);
            const uploaded = await (0, cloudinaryUploads_1.uploadToCloudinary)(data.file.buffer, "balmitra/products");
            console.log("CLOUDINARY RESPONSE:", uploaded);
            thumbnailUrl =
                uploaded.secure_url;
            thumbnailPublicId =
                uploaded.public_id;
        }
        const slug = data.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
        const sku = `BAL-${Date.now()}`;
        const categoryId = Number(data.categoryId);
        // Check main category
        const category = await database_1.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            throw new Error("Category not found");
        }
        // Check subcategory if provided
        let subcategoryId = null;
        if (data.subcategoryId !== null &&
            data.subcategoryId !== undefined &&
            data.subcategoryId !== "") {
            subcategoryId = Number(data.subcategoryId);
            const subcategory = await database_1.prisma.subcategory.findUnique({
                where: {
                    id: subcategoryId,
                },
            });
            if (!subcategory) {
                throw new Error("Subcategory not found");
            }
            // Make sure subcategory belongs to selected category
            if (subcategory.categoryId !== categoryId) {
                throw new Error("Selected subcategory does not belong to the selected category");
            }
        }
        return database_1.prisma.product.create({
            data: {
                name: data.name,
                description: data.description || null,
                shortDescription: data.shortDescription || null,
                brand: data.brand || null,
                ageGroup: data.ageGroup || null,
                categoryId,
                subcategoryId,
                price: Number(data.price),
                discountPrice: data.discountPrice !== undefined &&
                    data.discountPrice !== "" &&
                    data.discountPrice !== null
                    ? Number(data.discountPrice)
                    : null,
                stock: Number(data.stock),
                thumbnail: thumbnailUrl,
                thumbnailPublicId: thumbnailPublicId,
                isFeatured: data.isFeatured === true ||
                    data.isFeatured === "true",
                isTrending: data.isTrending === true ||
                    data.isTrending === "true",
                isNewArrival: data.isNewArrival === true ||
                    data.isNewArrival === "true",
                isFlashSale: data.isFlashSale === true ||
                    data.isFlashSale === "true" ||
                    data.isflashSale === true ||
                    data.isflashSale === "true",
                isBestSeller: data.isBestSeller === true ||
                    data.isBestSeller === "true" ||
                    data.isbestSeller === true ||
                    data.isbestSeller === "true",
                isActive: data.isActive === undefined
                    ? true
                    : data.isActive === true ||
                        data.isActive === "true",
                metaTitle: data.metaTitle || null,
                metaDescription: data.metaDescription || null,
                slug,
                sku,
            },
            include: {
                category: true,
                subcategory: true,
            },
        });
    }
    // =========================================================
    // GET ALL PRODUCTS - ADMIN
    // =========================================================
    static async getAll() {
        return database_1.prisma.product.findMany({
            include: {
                category: true,
                subcategory: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    // =========================================================
    // UPDATE PRODUCT
    // =========================================================
    static async update(id, data) {
        const existingProduct = await database_1.prisma.product.findUnique({
            where: {
                id,
            },
        });
        if (!existingProduct) {
            throw new Error("Product not found");
        }
        const updateData = {};
        // -------------------------------------------------------
        // Basic fields
        // -------------------------------------------------------
        if (data.name !== undefined) {
            updateData.name = data.name;
        }
        if (data.description !== undefined) {
            updateData.description =
                data.description || null;
        }
        if (data.shortDescription !== undefined) {
            updateData.shortDescription =
                data.shortDescription || null;
        }
        if (data.brand !== undefined) {
            updateData.brand =
                data.brand || null;
        }
        if (data.ageGroup !== undefined) {
            updateData.ageGroup =
                data.ageGroup || null;
        }
        // -------------------------------------------------------
        // Category
        // -------------------------------------------------------
        let categoryId = existingProduct.categoryId;
        if (data.categoryId !== undefined) {
            categoryId = Number(data.categoryId);
            const category = await database_1.prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (!category) {
                throw new Error("Category not found");
            }
            updateData.categoryId =
                categoryId;
        }
        // -------------------------------------------------------
        // Subcategory
        // -------------------------------------------------------
        if (data.subcategoryId !== undefined) {
            if (data.subcategoryId === "" ||
                data.subcategoryId === null) {
                updateData.subcategoryId = null;
            }
            else {
                const subcategoryId = Number(data.subcategoryId);
                const subcategory = await database_1.prisma.subcategory.findUnique({
                    where: {
                        id: subcategoryId,
                    },
                });
                if (!subcategory) {
                    throw new Error("Subcategory not found");
                }
                // Make sure subcategory belongs
                // to selected main category
                if (subcategory.categoryId !==
                    categoryId) {
                    throw new Error("Selected subcategory does not belong to the selected category");
                }
                updateData.subcategoryId =
                    subcategoryId;
            }
        }
        // -------------------------------------------------------
        // Price
        // -------------------------------------------------------
        if (data.price !== undefined) {
            updateData.price =
                Number(data.price);
        }
        // -------------------------------------------------------
        // Discount Price
        // -------------------------------------------------------
        if (data.discountPrice !== undefined) {
            updateData.discountPrice =
                data.discountPrice === "" ||
                    data.discountPrice === null
                    ? null
                    : Number(data.discountPrice);
        }
        // -------------------------------------------------------
        // Stock
        // -------------------------------------------------------
        if (data.stock !== undefined) {
            updateData.stock =
                Number(data.stock);
        }
        // -------------------------------------------------------
        // Boolean fields
        // -------------------------------------------------------
        if (data.isFeatured !== undefined) {
            updateData.isFeatured =
                data.isFeatured === true ||
                    data.isFeatured === "true";
        }
        if (data.isTrending !== undefined) {
            updateData.isTrending =
                data.isTrending === true ||
                    data.isTrending === "true";
        }
        if (data.isNewArrival !== undefined) {
            updateData.isNewArrival =
                data.isNewArrival === true ||
                    data.isNewArrival === "true";
        }
        if (data.isActive !== undefined) {
            updateData.isActive =
                data.isActive === true ||
                    data.isActive === "true";
        }
        if (data.isFlashSale !== undefined || data.isflashSale !== undefined) {
            updateData.isFlashSale =
                data.isFlashSale === true ||
                    data.isFlashSale === "true" ||
                    data.isflashSale === true ||
                    data.isflashSale === "true";
        }
        if (data.isBestSeller !== undefined || data.isbestSeller !== undefined) {
            updateData.isBestSeller =
                data.isBestSeller === true ||
                    data.isBestSeller === "true" ||
                    data.isbestSeller === true ||
                    data.isbestSeller === "true";
        }
        // -------------------------------------------------------
        // Thumbnail
        // -------------------------------------------------------
        if (data.thumbnail !== undefined) {
            updateData.thumbnail =
                data.thumbnail;
        }
        // -------------------------------------------------------
        // SEO
        // -------------------------------------------------------
        if (data.metaTitle !== undefined) {
            updateData.metaTitle =
                data.metaTitle || null;
        }
        if (data.metaDescription !== undefined) {
            updateData.metaDescription =
                data.metaDescription || null;
        }
        // -------------------------------------------------------
        // Update slug when name changes
        // -------------------------------------------------------
        if (data.name !== undefined) {
            updateData.slug = data.name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-");
        }
        // -------------------------------------------------------
        // Upload new image
        // -------------------------------------------------------
        const fileToUpload = data.imageFile || data.file;
        if (fileToUpload && fileToUpload.buffer) {
            const uploaded = await (0, cloudinaryUploads_1.uploadToCloudinary)(fileToUpload.buffer, "balmitra/products");
            updateData.thumbnail = uploaded.secure_url;
            updateData.thumbnailPublicId = uploaded.public_id;
        }
        // -------------------------------------------------------
        // Update database
        // -------------------------------------------------------
        return database_1.prisma.product.update({
            where: {
                id,
            },
            data: updateData,
            include: {
                category: true,
                subcategory: true,
            },
        });
    }
    // =========================================================
    // DELETE PRODUCT
    // =========================================================
    static async delete(id) {
        return database_1.prisma.product.delete({
            where: {
                id,
            },
        });
    }
    // =========================================================
    // GET PRODUCT BY ID
    // =========================================================
    static async getById(id) {
        return database_1.prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
                subcategory: true,
                gallery: true,
                orderItems: true,
            },
        });
    }
    // =========================================================
    // GET PUBLIC PRODUCTS
    // =========================================================
    static async getPublicProducts(query = {}) {
        const { search, categoryId, subcategoryId, ageGroup, type, flashSale, sort, } = query;
        const where = {
            isActive: true,
            stock: {
                gt: 0,
            },
        };
        if (search) {
            where.OR = [
                { name: { contains: String(search), mode: "insensitive" } },
                { description: { contains: String(search), mode: "insensitive" } },
                { brand: { contains: String(search), mode: "insensitive" } },
            ];
        }
        if (categoryId) {
            where.categoryId = Number(categoryId);
        }
        if (subcategoryId) {
            where.subcategoryId = Number(subcategoryId);
        }
        if (ageGroup) {
            where.ageGroup = { contains: String(ageGroup), mode: "insensitive" };
        }
        const t = (type || "").toLowerCase().trim();
        if (t === "featured" || t === "featured-products") {
            where.isFeatured = true;
        }
        else if (t === "trending" || t === "trending-products") {
            where.isTrending = true;
        }
        else if (t === "new-arrivals" || t === "new-arrival" || t === "newarrivals") {
            where.isNewArrival = true;
        }
        else if (t === "best-sellers" || t === "best-seller" || t === "bestsellers") {
            where.isBestSeller = true;
        }
        else if (t === "flash-sale" || t === "flash-sales" || t === "flashsale" || flashSale === "true" || flashSale === true) {
            where.isFlashSale = true;
        }
        let orderBy = { createdAt: "desc" };
        if (sort === "price_asc") {
            orderBy = { price: "asc" };
        }
        else if (sort === "price_desc") {
            orderBy = { price: "desc" };
        }
        return database_1.prisma.product.findMany({
            where,
            include: {
                category: true,
                subcategory: true,
            },
            orderBy,
        });
    }
    // =========================================================
    // GET PUBLIC PRODUCT BY ID
    // =========================================================
    static async getPublicProductById(id) {
        return database_1.prisma.product.findFirst({
            where: {
                id,
                isActive: true,
            },
            include: {
                category: true,
                subcategory: true,
                gallery: true,
            },
        });
    }
}
exports.ProductService = ProductService;
