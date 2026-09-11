"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const database_1 = require("../../config/database");
const env_1 = require("../../config/env");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const razorpay = new razorpay_1.default({
    key_id: env_1.env.RAZORPAY_KEY_ID,
    key_secret: env_1.env.RAZORPAY_KEY_SECRET,
});
class PaymentService {
    // =====================================================
    // CUSTOMER — CREATE RAZORPAY PAYMENT
    // =====================================================
    static async createPayment(orderId, customerId) {
        console.log("RAZORPAY KEY:", env_1.env.RAZORPAY_KEY_ID);
        console.log("RAZORPAY SECRET:", env_1.env.RAZORPAY_KEY_SECRET
            ? "FOUND"
            : "MISSING");
        const order = await database_1.prisma.order.findFirst({
            where: {
                id: orderId,
                customerId,
            },
            include: {
                payment: true,
            },
        });
        if (!order) {
            throw new Error("Order not found");
        }
        if (order.paymentStatus === "PAID") {
            throw new Error("Order is already paid");
        }
        // If payment already exists, return existing Razorpay order
        if (order.payment?.razorpayOrderId) {
            return {
                paymentId: order.payment.paymentId,
                razorpayOrderId: order.payment.razorpayOrderId,
                amount: Number(order.payment.amount),
                currency: "INR",
                key: env_1.env.RAZORPAY_KEY_ID,
            };
        }
        const amountInPaise = Math.round(Number(order.totalAmount) * 100);
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: order.orderNumber,
        });
        const paymentId = `PAY-${Date.now()}`;
        const payment = await database_1.prisma.payment.create({
            data: {
                paymentId,
                razorpayOrderId: razorpayOrder.id,
                orderId: order.id,
                amount: order.totalAmount,
                paymentMethod: "ONLINE",
                paymentStatus: "PENDING",
            },
        });
        return {
            paymentId: payment.paymentId,
            razorpayOrderId: razorpayOrder.id,
            amount: amountInPaise,
            currency: "INR",
            key: env_1.env.RAZORPAY_KEY_ID,
        };
    }
    // =====================================================
    // CUSTOMER — VERIFY RAZORPAY PAYMENT
    // =====================================================
    static async verifyPayment(paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature, customerId) {
        const payment = await database_1.prisma.payment.findUnique({
            where: {
                paymentId,
            },
            include: {
                order: true,
            },
        });
        if (!payment) {
            throw new Error("Payment record not found");
        }
        if (payment.order.customerId !== customerId) {
            throw new Error("Unauthorized payment verification");
        }
        if (payment.razorpayOrderId !== razorpayOrderId) {
            throw new Error("Invalid Razorpay order");
        }
        const body = razorpayOrderId +
            "|" +
            razorpayPaymentId;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", env_1.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");
        if (expectedSignature !==
            razorpaySignature) {
            throw new Error("Invalid payment signature");
        }
        const result = await database_1.prisma.$transaction(async (tx) => {
            const updatedPayment = await tx.payment.update({
                where: {
                    paymentId,
                },
                data: {
                    razorpayPaymentId,
                    razorpaySignature,
                    paymentStatus: "PAID",
                    transactionId: razorpayPaymentId,
                },
            });
            await tx.order.update({
                where: {
                    id: payment.orderId,
                },
                data: {
                    paymentStatus: "PAID",
                    orderStatus: "CONFIRMED",
                },
            });
            return updatedPayment;
        });
        return result;
    }
    // =====================================================
    // ADMIN — GET ALL PAYMENTS
    // =====================================================
    static async getAll(page = 1, limit = 10, search = "", paymentStatus = "") {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                {
                    paymentId: {
                        contains: search,
                    },
                },
                {
                    razorpayPaymentId: {
                        contains: search,
                    },
                },
                {
                    transactionId: {
                        contains: search,
                    },
                },
            ];
        }
        if (paymentStatus) {
            where.paymentStatus = paymentStatus;
        }
        const [payments, total] = await Promise.all([
            database_1.prisma.payment.findMany({
                where,
                skip,
                take: limit,
                include: {
                    order: {
                        include: {
                            customer: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
            database_1.prisma.payment.count({
                where,
            }),
        ]);
        return {
            payments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    // =====================================================
    // ADMIN — GET PAYMENT BY ID
    // =====================================================
    static async getById(id) {
        return database_1.prisma.payment.findUnique({
            where: {
                id,
            },
            include: {
                order: {
                    include: {
                        customer: true,
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
    // =====================================================
    // ADMIN — REFUND
    // =====================================================
    static async refund(id) {
        return database_1.prisma.payment.update({
            where: {
                id,
            },
            data: {
                refunded: true,
                refundDate: new Date(),
                paymentStatus: "REFUNDED",
            },
        });
    }
    // =====================================================
    // ADMIN — UPDATE PAYMENT STATUS
    // =====================================================
    static async updateStatus(paymentId, status) {
        const payment = await database_1.prisma.payment.findUnique({
            where: {
                paymentId,
            },
        });
        if (!payment) {
            throw new Error("Payment not found");
        }
        const updatedPayment = await database_1.prisma.payment.update({
            where: {
                paymentId,
            },
            data: {
                paymentStatus: status,
            },
        });
        await database_1.prisma.order.update({
            where: {
                id: payment.orderId,
            },
            data: {
                paymentStatus: status,
            },
        });
        return updatedPayment;
    }
}
exports.PaymentService = PaymentService;
