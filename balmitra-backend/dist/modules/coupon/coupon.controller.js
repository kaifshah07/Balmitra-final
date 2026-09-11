"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const coupon_service_1 = require("./coupon.service");
class CouponController {
    static async create(req, res) {
        try {
            const coupon = await coupon_service_1.CouponService.create(req.body);
            return res.status(201).json({
                success: true,
                message: "Coupon created successfully",
                data: coupon,
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = String(req.query.search || "");
        const data = await coupon_service_1.CouponService.getAll(page, limit, search);
        return res.json({
            success: true,
            ...data,
        });
    }
    static async getById(req, res) {
        const coupon = await coupon_service_1.CouponService.getById(Number(req.params.id));
        return res.json({
            success: true,
            data: coupon,
        });
    }
    static async update(req, res) {
        const coupon = await coupon_service_1.CouponService.update(Number(req.params.id), req.body);
        return res.json({
            success: true,
            message: "Coupon updated successfully",
            data: coupon,
        });
    }
    static async activate(req, res) {
        const coupon = await coupon_service_1.CouponService.activate(Number(req.params.id));
        return res.json({
            success: true,
            message: "Coupon activated",
            data: coupon,
        });
    }
    static async deactivate(req, res) {
        const coupon = await coupon_service_1.CouponService.deactivate(Number(req.params.id));
        return res.json({
            success: true,
            message: "Coupon deactivated",
            data: coupon,
        });
    }
    static async delete(req, res) {
        await coupon_service_1.CouponService.delete(Number(req.params.id));
        return res.json({
            success: true,
            message: "Coupon deleted successfully",
        });
    }
    static async validateAndApply(req, res) {
        try {
            const { code, orderAmount } = req.body;
            const result = await coupon_service_1.CouponService.validateAndApply(code, Number(orderAmount));
            return res.json({
                success: true,
                message: "Coupon applied successfully",
                data: result,
            });
        }
        catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || "Failed to apply coupon",
            });
        }
    }
}
exports.CouponController = CouponController;
