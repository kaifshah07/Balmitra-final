import { prisma } from "../../config/database";

export class SettingsService {

  static async getSettings() {

    let settings = await prisma.websiteSetting.findFirst();

    if (!settings) {

      settings = await prisma.websiteSetting.create({
        data: {
          websiteName: "Balmitra",
          email: "info@balmitra.com",
          phone: "9999999999",
          address: "Aurangabad",
        },
      });

    }

    return settings;
  }

  static async update(data: any) {

    const settings = await prisma.websiteSetting.findFirst();

    if (!settings) {
      throw new Error("Website settings not found");
    }

    return prisma.websiteSetting.update({
      where: {
        id: settings.id,
      },
      data,
    });

  }

}