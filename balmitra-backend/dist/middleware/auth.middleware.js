"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSuperAdmin = exports.requireAdmin = exports.authenticateAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "ADMIN" &&
            decoded.role !== "SUPER_ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Admin access required",
            });
        }
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.authenticateAdmin = authenticateAdmin;
const requireAdmin = (req, res, next) => {
    if (req.admin?.role !== "ADMIN" &&
        req.admin?.role !== "SUPER_ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Admin access required",
        });
    }
    next();
};
exports.requireAdmin = requireAdmin;
const requireSuperAdmin = (req, res, next) => {
    if (req.admin?.role !== "SUPER_ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Super Admin access required",
        });
    }
    next();
};
exports.requireSuperAdmin = requireSuperAdmin;
