"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = require("../../config/database");
class CategoryService {
    static async create(data) {
        const slug = data.name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");
        const existing = await database_1.prisma.category.findFirst({
            where: {
                OR: [
                    { name: data.name },
                    { slug }
                ]
            }
        });
        if (existing) {
            throw new Error("Category already exists");
        }
        return database_1.prisma.category.create({
            data: {
                ...data,
                slug,
                displayOrder: Number(data.displayOrder || 0),
                isActive: data.isActive === undefined
                    ? true
                    : data.isActive === true || data.isActive === "true",
            },
        });
    }
    static async getAll() {
        return database_1.prisma.category.findMany({
            orderBy: {
                displayOrder: "asc",
            },
        });
    }
    static async getById(id) {
        return database_1.prisma.category.findUnique({
            where: { id },
        });
    }
    static async update(id, data) {
        const updateData = {
            ...data,
            ...(data.displayOrder !== undefined && {
                displayOrder: Number(data.displayOrder || 0),
            }),
            ...(data.isActive !== undefined && {
                isActive: data.isActive === true || data.isActive === "true",
            }),
        };
        return database_1.prisma.category.update({
            where: { id },
            data: updateData,
        });
    }
    static async delete(id) {
        return database_1.prisma.category.delete({
            where: { id },
        });
    }
    static async getBySlug(slug) {
        return database_1.prisma.category.findUnique({
            where: { slug },
            include: {
                subcategories: {
                    where: { isActive: true },
                    orderBy: { displayOrder: "asc" },
                },
                products: {
                    where: { isActive: true },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
    }
}
exports.CategoryService = CategoryService;
