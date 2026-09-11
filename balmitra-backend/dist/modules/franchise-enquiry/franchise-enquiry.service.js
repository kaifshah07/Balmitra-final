"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FranchiseEnquiryService = void 0;
const database_1 = require("../../config/database");
const brevo_1 = require("../../config/brevo");
class FranchiseEnquiryService {
    static async create(data) {
        const enquiry = await database_1.prisma.franchiseEnquiry.create({
            data: {
                fullName: data.fullName,
                mobile: data.mobile,
                email: data.email,
                city: data.city,
                state: data.state,
                ownsBusiness: data.ownsBusiness,
                currentBusinessName: data.currentBusinessName || null,
                currentBusinessType: data.currentBusinessType || null,
                businessExperience: data.businessExperience || null,
                preferredLocation: data.preferredLocation,
                preferredCity: data.preferredCity,
                preferredArea: data.preferredArea || null,
                investmentCapacity: data.investmentCapacity,
                storeType: data.storeType,
                startTimeline: data.startTimeline,
                message: data.message || null,
            },
        });
        try {
            await (0, brevo_1.sendFranchiseEnquiryEmail)(enquiry);
        }
        catch (error) {
            console.error("Franchise enquiry email failed:", error);
        }
        return enquiry;
    }
    static async getAll() {
        return database_1.prisma.franchiseEnquiry.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async getById(id) {
        return database_1.prisma.franchiseEnquiry.findUnique({
            where: {
                id,
            },
        });
    }
    static async updateStatus(id, status) {
        return database_1.prisma.franchiseEnquiry.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }
}
exports.FranchiseEnquiryService = FranchiseEnquiryService;
