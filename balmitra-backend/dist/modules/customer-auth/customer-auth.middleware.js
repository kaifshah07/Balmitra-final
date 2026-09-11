"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateCustomer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../config/database");
const authenticateCustomer = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token required",
            });
        }
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.substring(7)
            : authHeader;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "CUSTOMER") {
            return res.status(403).json({
                success: false,
                message: "Customer access required",
            });
        }
        const customer = await database_1.prisma.customer.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Customer not found",
            });
        }
        if (customer.isBlocked) {
            return res.status(403).json({
                success: false,
                message: "Account blocked",
            });
        }
        req.customer = {
            id: customer.id,
            email: customer.email,
            role: "CUSTOMER",
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.authenticateCustomer = authenticateCustomer;
