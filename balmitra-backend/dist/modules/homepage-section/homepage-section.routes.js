"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepage_section_controller_1 = require("./homepage-section.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", homepage_section_controller_1.HomepageSectionController.getAll);
router.put("/:key", auth_middleware_1.authenticateAdmin, homepage_section_controller_1.HomepageSectionController.update);
exports.default = router;
