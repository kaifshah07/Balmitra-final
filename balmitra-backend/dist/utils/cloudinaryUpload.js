"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const stream_1 = require("stream");
const env_1 = require("../config/env");
const uploadToCloudinary = (buffer, folder = "balmitra/products") => {
    if (!env_1.env.CLOUDINARY_CLOUD_NAME ||
        !env_1.env.CLOUDINARY_API_KEY ||
        !env_1.env.CLOUDINARY_API_SECRET) {
        return Promise.reject(new Error("Cloudinary is not configured. Add the Cloudinary environment variables to the backend."));
    }
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder,
            resource_type: "image",
        }, (error, result) => {
            if (error) {
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
        stream_1.Readable.from(buffer).pipe(uploadStream);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
