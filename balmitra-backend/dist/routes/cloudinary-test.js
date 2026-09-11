"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const router = express_1.default.Router();
router.get("/", async (_req, res) => {
    try {
        const result = await cloudinary_1.default.api.ping();
        return res.json({
            success: true,
            result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            full: error,
        });
    }
});
exports.default = router;
