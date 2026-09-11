"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import testCloudinaryRoute from "/cloudinary-test"
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Security
app.use((0, helmet_1.default)());
const allowedOrigins = [
    "http://localhost:3000",
    "https://balmitra.vercel.app",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// Body Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Cookies
app.use((0, cookie_parser_1.default)());
// Compression
app.use((0, compression_1.default)());
// Logger
app.use((0, morgan_1.default)("dev"));
// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Balmitra Backend API is Running 🚀",
    });
});
// app.use("/test-cloudinary", testCloudinaryRoute);
// API Routes
app.use("/api", routes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
exports.default = app;
