"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const stream_1 = require("stream");
const uploadToCloudinary = (buffer, folder = "balmitra/products") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: "image",
        }, (error, result) => {
            if (error) {
                console.error("========== CLOUDINARY ERROR ==========");
                console.error("MESSAGE:", error?.message);
                console.error("HTTP CODE:", error?.http_code);
                console.error("ERROR:", JSON.stringify(error, null, 2));
                reject(error);
                return;
            }
            if (!result) {
                reject(new Error("Cloudinary upload failed"));
                return;
            }
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
            });
        });
        stream_1.Readable.from(buffer).pipe(stream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
