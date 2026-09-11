"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoryService = void 0;
const database_1 = require("../../config/database");
class SubCategoryService {
    // Get all subcategories
    static async getAll() {
        return database_1.prisma.subcategory.findMany({
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    // Get subcategories by main category
    static async getByCategory(categoryId) {
        return database_1.prisma.subcategory.findMany({
            where: {
                categoryId,
                isActive: true,
            },
            orderBy: {
                displayOrder: "asc",
            },
        });
    }
    // Get single subcategory
    static async getById(id) {
        return database_1.prisma.subcategory.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
    }
    // Create subcategory
    static async create(data) {
        const categoryId = Number(data.categoryId);
        if (!Number.isInteger(categoryId) || categoryId <= 0) {
            throw new Error("Please select a valid parent category");
        }
        const name = String(data.name || "").trim();
        if (name.length < 2) {
            throw new Error("Subcategory name must contain at least 2 characters");
        }
        // Make sure category exists
        const category = await database_1.prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!category) {
            throw new Error("Category not found");
        }
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
        const existing = await database_1.prisma.subcategory.findFirst({
            where: {
                categoryId,
                OR: [{ name }, { slug }],
            },
        });
        if (existing) {
            throw new Error("This subcategory already exists in the selected category");
        }
        return database_1.prisma.subcategory.create({
            data: {
                name,
                slug,
                description: data.description || null,
                image: data.image || null,
                displayOrder: Number(data.displayOrder || 0),
                isActive: data.isActive === undefined
                    ? true
                    : data.isActive === true ||
                        data.isActive === "true",
                categoryId,
            },
            include: {
                category: true,
            },
        });
    }
    // Update subcategory
    static async update(id, data) {
        const existing = await database_1.prisma.subcategory.findUnique({
            where: {
                id,
            },
        });
        if (!existing) {
            throw new Error("Subcategory not found");
        }
        const updateData = {};
        if (data.name !== undefined) {
            updateData.name = data.name;
            updateData.slug = data.name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-");
        }
        if (data.description !== undefined) {
            updateData.description =
                data.description || null;
        }
        if (data.image !== undefined) {
            updateData.image =
                data.image || null;
        }
        if (data.displayOrder !== undefined) {
            updateData.displayOrder =
                Number(data.displayOrder);
        }
        if (data.isActive !== undefined) {
            updateData.isActive =
                data.isActive === true ||
                    data.isActive === "true";
        }
        if (data.categoryId !== undefined) {
            const categoryId = Number(data.categoryId);
            const category = await database_1.prisma.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (!category) {
                throw new Error("Category not found");
            }
            updateData.categoryId = categoryId;
        }
        return database_1.prisma.subcategory.update({
            where: {
                id,
            },
            data: updateData,
            include: {
                category: true,
            },
        });
    }
    // Delete subcategory
    static async delete(id) {
        const existing = await database_1.prisma.subcategory.findUnique({
            where: {
                id,
            },
        });
        if (!existing) {
            throw new Error("Subcategory not found");
        }
        return database_1.prisma.subcategory.delete({
            where: {
                id,
            },
        });
    }
}
exports.SubCategoryService = SubCategoryService;
