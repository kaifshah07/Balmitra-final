"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homepage_advertisement_controller_1 = require("./homepage-advertisement.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const router = (0, express_1.Router)();
router.get("/", homepage_advertisement_controller_1.HomepageAdvertisementController.getAll);
router.get("/:id", homepage_advertisement_controller_1.HomepageAdvertisementController.getById);
router.post("/", auth_middleware_1.authenticateAdmin, upload_middleware_1.upload.fields([
    {
        name: "desktopImage",
        maxCount: 1,
    },
    {
        name: "mobileImage",
        maxCount: 1,
    },
]), homepage_advertisement_controller_1.HomepageAdvertisementController.create);
router.put("/:id", auth_middleware_1.authenticateAdmin, upload_middleware_1.upload.fields([
    {
        name: "desktopImage",
        maxCount: 1,
    },
    {
        name: "mobileImage",
        maxCount: 1,
    },
]), homepage_advertisement_controller_1.HomepageAdvertisementController.update);
router.delete("/:id", auth_middleware_1.authenticateAdmin, homepage_advertisement_controller_1.HomepageAdvertisementController.delete);
exports.default = router;
