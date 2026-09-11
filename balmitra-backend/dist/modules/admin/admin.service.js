"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const database_1 = require("../../config/database");
const password_1 = require("../../utils/password");
const jwt_1 = require("../../config/jwt");
class AdminService {
    static async login(username, password) {
        const admin = await database_1.prisma.admin.findUnique({
            where: { username },
        });
        if (!admin) {
            throw new Error("Invalid username or password");
        }
        if (!admin.isActive) {
            throw new Error("Admin account is inactive");
        }
        const isPasswordValid = await (0, password_1.comparePassword)(password, admin.password);
        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }
        await database_1.prisma.admin.update({
            where: { id: admin.id },
            data: {
                lastLogin: new Date(),
            },
        });
        const token = (0, jwt_1.generateToken)({
            id: admin.id,
            username: admin.username,
            role: admin.role,
        });
        return {
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                fullName: admin.fullName,
                email: admin.email,
                role: admin.role,
            },
        };
    }
}
exports.AdminService = AdminService;
