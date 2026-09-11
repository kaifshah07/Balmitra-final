"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
class PaymentController {
    static async getAll(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const result = await payment_service_1.PaymentService.getAll(page, limit, search);
        return res.json({
            success: true,
            ...result,
        });
    }
    static async getById(req, res) {
        const payment = await payment_service_1.PaymentService.getById(Number(req.params.id));
        return res.json({
            success: true,
            data: payment,
        });
    }
    static async updateStatus(req, res) {
        const payment = await payment_service_1.PaymentService.updateStatus(String(req.params.id), req.body.paymentStatus);
        return res.json({
            success: true,
            message: "Payment Updated",
            data: payment,
        });
    }
    static async refund(req, res) {
        const payment = await payment_service_1.PaymentService.refund(Number(req.params.id));
        return res.json({
            success: true,
            message: "Refund Successful",
            data: payment,
        });
    }
    static async create(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Customer authentication required",
                });
            }
            const orderId = Number(req.body.orderId);
            if (!orderId) {
                return res.status(400).json({
                    success: false,
                    message: "Order ID is required",
                });
            }
            const payment = await payment_service_1.PaymentService.createPayment(orderId, Number(customerId));
            return res.status(201).json({
                success: true,
                message: "Payment created successfully",
                data: payment,
            });
        }
        catch (error) {
            console.error("Create Payment Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
    static async verify(req, res) {
        try {
            const customerId = req.customer?.id;
            if (!customerId) {
                return res.status(401).json({
                    success: false,
                    message: "Customer authentication required",
                });
            }
            const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature, } = req.body;
            if (!paymentId ||
                !razorpayPaymentId ||
                !razorpayOrderId ||
                !razorpaySignature) {
                return res.status(400).json({
                    success: false,
                    message: "Payment verification data is incomplete",
                });
            }
            const payment = await payment_service_1.PaymentService.verifyPayment(paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature, Number(customerId));
            return res.json({
                success: true,
                message: "Payment verified successfully",
                data: payment,
            });
        }
        catch (error) {
            console.error("Verify Payment Error:", error);
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}
exports.PaymentController = PaymentController;
