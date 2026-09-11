"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("../admin/admin.routes"));
const router = (0, express_1.Router)();
router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API is healthy",
    });
});
router.use("/admin", admin_routes_1.default);
exports.default = router;
