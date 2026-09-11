"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const database_1 = require("../../config/database");
class CustomerService {
    static async getAll(page = 1, limit = 10, search = "") {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    {
                        name: {
                            contains: search,
                        },
                    },
                    {
                        email: {
                            contains: search,
                        },
                    },
                    {
                        phone: {
                            contains: search,
                        },
                    },
                ],
            }
            : {};
        const [customers, total] = await Promise.all([
            database_1.prisma.customer.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    orders: {
                        select: {
                            id: true,
                            totalAmount: true,
                            orderStatus: true,
                            paymentStatus: true,
                            createdAt: true,
                        },
                    },
                },
            }),
            database_1.prisma.customer.count({
                where,
            }),
        ]);
        return {
            customers,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    static async getById(id) {
        return database_1.prisma.customer.findUnique({
            where: {
                id,
            },
            include: {
                orders: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });
    }
    static async update(id, data) {
        return database_1.prisma.customer.update({
            where: {
                id,
            },
            data,
        });
    }
    static async block(id) {
        return database_1.prisma.customer.update({
            where: {
                id,
            },
            data: {
                isBlocked: true,
            },
        });
    }
    static async unblock(id) {
        return database_1.prisma.customer.update({
            where: {
                id,
            },
            data: {
                isBlocked: false,
            },
        });
    }
    static async delete(id) {
        return database_1.prisma.customer.delete({
            where: {
                id,
            },
        });
    }
    static async create(data) {
        const emailExists = await database_1.prisma.customer.findUnique({
            where: {
                email: data.email,
            },
        });
        if (emailExists) {
            throw new Error("Email already exists");
        }
        const phoneExists = await database_1.prisma.customer.findUnique({
            where: {
                phone: data.phone,
            },
        });
        if (phoneExists) {
            throw new Error("Phone already exists");
        }
        const customer = await database_1.prisma.customer.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                // Customer created from admin panel
                // gets a temporary password.
                password: "Temp@123",
            },
        });
        return {
            success: true,
            message: "Customer created successfully",
            customer,
        };
    }
}
exports.CustomerService = CustomerService;
