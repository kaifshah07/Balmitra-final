"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trust_feature_controller_1 = require("./trust-feature.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public route for frontend
router.get("/public", trust_feature_controller_1.TrustFeatureController.getActive);
// Admin routes
router.get("/", auth_middleware_1.authenticateAdmin, trust_feature_controller_1.TrustFeatureController.getAll);
router.post("/", auth_middleware_1.authenticateAdmin, trust_feature_controller_1.TrustFeatureController.create);
router.put("/:id", auth_middleware_1.authenticateAdmin, trust_feature_controller_1.TrustFeatureController.update);
router.delete("/:id", auth_middleware_1.authenticateAdmin, trust_feature_controller_1.TrustFeatureController.delete);
exports.default = router;
