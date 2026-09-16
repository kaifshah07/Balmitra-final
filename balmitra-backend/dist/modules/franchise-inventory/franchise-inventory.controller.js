"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseInventoryController = void 0;
const franchise_inventory_service_1 = require("./franchise-inventory.service");
class FranchiseInventoryController {
    static async getMyStock(req, res) {
        try {
            const franchiseId = req.user.id;
            const stock = await franchise_inventory_service_1.FranchiseInventoryService.getFranchiseStock(franchiseId);
            res.json({ success: true, data: stock });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async adjustStock(req, res) {
        try {
            const franchiseId = req.user.id;
            const { productId, delta } = req.body;
            const result = await franchise_inventory_service_1.FranchiseInventoryService.adjustStock(franchiseId, productId, delta);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseInventoryController = FranchiseInventoryController;
