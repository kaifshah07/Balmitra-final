"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrustFeatureController = void 0;
const trust_feature_service_1 = require("./trust-feature.service");
class TrustFeatureController {
    static async getAll(req, res) {
        try {
            const features = await trust_feature_service_1.TrustFeatureService.getAll();
            return res.json({ success: true, data: features });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getActive(req, res) {
        try {
            const features = await trust_feature_service_1.TrustFeatureService.getActive();
            return res.json({ success: true, data: features });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    static async create(req, res) {
        try {
            const feature = await trust_feature_service_1.TrustFeatureService.create(req.body);
            return res.status(201).json({ success: true, message: "Created successfully", data: feature });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
    static async update(req, res) {
        try {
            const feature = await trust_feature_service_1.TrustFeatureService.update(Number(req.params.id), req.body);
            return res.json({ success: true, message: "Updated successfully", data: feature });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
    static async delete(req, res) {
        try {
            await trust_feature_service_1.TrustFeatureService.delete(Number(req.params.id));
            return res.json({ success: true, message: "Deleted successfully" });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.TrustFeatureController = TrustFeatureController;
