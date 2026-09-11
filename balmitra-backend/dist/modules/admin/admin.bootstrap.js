"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureInitialAdmin = ensureInitialAdmin;
const client_1 = require("@prisma/client");
const env_1 = require("../../config/env");
const database_1 = require("../../config/database");
const password_1 = require("../../utils/password");
async function ensureInitialAdmin() {
    const { INITIAL_ADMIN_USERNAME, INITIAL_ADMIN_PASSWORD, INITIAL_ADMIN_EMAIL } = env_1.env;
    if (!INITIAL_ADMIN_USERNAME && !INITIAL_ADMIN_PASSWORD && !INITIAL_ADMIN_EMAIL)
        return;
    if (!INITIAL_ADMIN_USERNAME || !INITIAL_ADMIN_PASSWORD || !INITIAL_ADMIN_EMAIL) {
        throw new Error("INITIAL_ADMIN_USERNAME, INITIAL_ADMIN_PASSWORD, and INITIAL_ADMIN_EMAIL must all be set");
    }
    const existingAdmin = await database_1.prisma.admin.findUnique({
        where: { username: INITIAL_ADMIN_USERNAME },
    });
    if (existingAdmin)
        return;
    await database_1.prisma.admin.create({
        data: {
            username: INITIAL_ADMIN_USERNAME,
            password: await (0, password_1.hashPassword)(INITIAL_ADMIN_PASSWORD),
            fullName: "Initial Administrator",
            email: INITIAL_ADMIN_EMAIL.toLowerCase().trim(),
            role: client_1.AdminRole.SUPER_ADMIN,
            isActive: true,
        },
    });
    console.log("Initial administrator created.");
}
