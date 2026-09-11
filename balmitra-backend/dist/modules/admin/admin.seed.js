"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const existingAdmin = await prisma.admin.findUnique({
        where: {
            username: "admin",
        },
    });
    if (existingAdmin) {
        console.log("Admin already exists.");
        return;
    }
    const hashedPassword = await bcrypt_1.default.hash("Admin@123", 10);
    await prisma.admin.create({
        data: {
            username: "admin",
            password: hashedPassword,
            fullName: "Super Admin",
            email: "admin@balmitra.com",
            role: client_1.AdminRole.SUPER_ADMIN,
            isActive: true,
        },
    });
    console.log("✅ Super Admin Created");
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
