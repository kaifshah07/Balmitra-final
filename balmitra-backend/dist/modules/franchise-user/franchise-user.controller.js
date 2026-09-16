"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseUserController = void 0;
const franchise_user_service_1 = require("./franchise-user.service");
class FranchiseUserController {
    static async create(req, res) {
        try {
            const user = await franchise_user_service_1.FranchiseUserService.createFranchiseUser(req.body);
            res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            if (error.code === 'P2002') {
                res.status(400).json({ success: false, message: "Email or phone already exists." });
                return;
            }
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getAll(req, res) {
        try {
            const users = await franchise_user_service_1.FranchiseUserService.getAllFranchiseUsers();
            res.json({ success: true, data: users });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async getById(req, res) {
        try {
            const user = await franchise_user_service_1.FranchiseUserService.getFranchiseUserById(Number(req.params.id));
            if (!user) {
                res.status(404).json({ success: false, message: "Franchise user not found" });
                return;
            }
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async update(req, res) {
        try {
            const user = await franchise_user_service_1.FranchiseUserService.updateFranchiseUser(Number(req.params.id), req.body);
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async toggleStatus(req, res) {
        try {
            const { isActive } = req.body;
            const user = await franchise_user_service_1.FranchiseUserService.toggleStatus(Number(req.params.id), isActive);
            res.json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.FranchiseUserController = FranchiseUserController;
