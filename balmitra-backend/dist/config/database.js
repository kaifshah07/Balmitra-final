"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Ensure .env is explicitly loaded from backend directory
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
dotenv_1.default.config(); // fallback
const dbUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;
exports.prisma = new client_1.PrismaClient({
    log: ["warn", "error"],
    datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
});
const connectDatabase = async (retries = 3, delayMs = 2000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await exports.prisma.$connect();
            console.log("✅ PostgreSQL Database Connected Successfully");
            return;
        }
        catch (error) {
            console.warn(`⚠️ Database connection attempt ${attempt}/${retries} failed: ${error.message}`);
            if (attempt < retries) {
                await new Promise((r) => setTimeout(r, delayMs));
            }
            else {
                console.error("❌ Database Connection Failed after retries");
                console.error(error);
                process.exit(1);
            }
        }
    }
};
exports.connectDatabase = connectDatabase;
