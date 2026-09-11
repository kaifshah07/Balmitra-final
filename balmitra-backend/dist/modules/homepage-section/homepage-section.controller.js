"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageSectionController = void 0;
const homepage_section_service_1 = require("./homepage-section.service");
class HomepageSectionController {
    static async getAll(req, res) {
        const sections = await homepage_section_service_1.HomepageSectionService.getAll();
        return res.json({
            success: true,
            data: sections,
        });
    }
    static async update(req, res) {
        const section = await homepage_section_service_1.HomepageSectionService.update(String(req.params.key), req.body);
        return res.json({
            success: true,
            data: section,
        });
    }
}
exports.HomepageSectionController = HomepageSectionController;
