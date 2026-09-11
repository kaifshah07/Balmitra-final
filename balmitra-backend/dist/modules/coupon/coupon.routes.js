"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coupon_controller_1 = require("./coupon.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Customer / Public coupon validation
router.post("/apply", coupon_controller_1.CouponController.validateAndApply);
router.post("/", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.create);
router.get("/", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.getAll);
router.get("/:id", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.getById);
router.put("/:id", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.update);
router.patch("/:id/activate", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.activate);
router.patch("/:id/deactivate", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.deactivate);
router.delete("/:id", auth_middleware_1.authenticateAdmin, coupon_controller_1.CouponController.delete);
exports.default = router;
