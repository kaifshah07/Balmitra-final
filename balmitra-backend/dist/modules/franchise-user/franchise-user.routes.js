"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const franchise_user_controller_1 = require("./franchise-user.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// These routes should be protected by Admin auth
router.use(auth_middleware_1.authenticateAdmin);
router.post("/", franchise_user_controller_1.FranchiseUserController.create);
router.get("/", franchise_user_controller_1.FranchiseUserController.getAll);
router.get("/:id", franchise_user_controller_1.FranchiseUserController.getById);
router.put("/:id", franchise_user_controller_1.FranchiseUserController.update);
router.patch("/:id/status", franchise_user_controller_1.FranchiseUserController.toggleStatus);
exports.default = router;
