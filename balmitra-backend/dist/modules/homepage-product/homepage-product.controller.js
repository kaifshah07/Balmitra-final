"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageProductController = void 0;
const homepage_product_service_1 = require("./homepage-product.service");
class HomepageProductController {
    static async getProducts(req, res) {
        const type = String(req.params.type || req.query.type || "");
        const products = await homepage_product_service_1.HomepageProductService.getProducts(type);
        return res.json({
            success: true,
            data: products,
        });
    }
    static async updateProducts(req, res) {
        const type = String(req.params.type || req.body.type || "");
        const productIds = Array.isArray(req.body.productIds) ? req.body.productIds.map(Number) : [];
        await homepage_product_service_1.HomepageProductService.updateProducts(type, productIds);
        return res.json({
            success: true,
            message: "Updated successfully",
        });
    }
}
exports.HomepageProductController = HomepageProductController;
