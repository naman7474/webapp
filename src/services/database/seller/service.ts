import Prisma from "@/services/database";

export class SellerMarketplaceService {
  static async createSellerMarketplace(
    sellerAccountId: number,
    data: Array<Record<string, any>>
  ) {
    await Prisma.$transaction(async (tx) => {
      const marketplacesData = await tx.amazonSellerMarketplace.findFirst({
        where: { sellerAccountId },
      });
      if (!marketplacesData) {
        await tx.amazonSellerMarketplace.createMany({
          data: data.map((item) => ({
            sellerAccountId,
            ...item,
          })),
        });
      }
    });
  }

  static async addSalesData(
    sellerAccountId: number,
    data: Array<Record<string, any>>
  ) {
    await Prisma.$transaction(async (tx) => {
      const marketplacesData = await tx.amazonSales.findFirst({
        where: { sellerAccountId },
      });
      if (!marketplacesData) {
        await tx.amazonSales.createMany({
          data: data.map((item) => ({
            sellerAccountId,
            ...item,
            startUnixTimestamp: new Date(item.startUnixTimestamp).toISOString(),
            endUnixTimestamp: new Date(item.endUnixTimestamp).toISOString(),
          })),
        });
      }
    });
  }

  static async getSalesData(sellerAccountId: number) {
    return await Prisma.amazonSales.findMany({
      where: { sellerAccountId },
    });
  }

  static async addOrdersData(
    sellerAccountId: number,
    data: Array<Record<string, any>>
  ) {
    await Prisma.$transaction(async (tx) => {
      const marketplacesData = await tx.amazonOrders.findFirst({
        where: { sellerAccountId },
      });
      if (!marketplacesData) {
        await tx.amazonOrders.createMany({
          data: data.map((item) => ({
            sellerAccountId,
            orderId: item.orderId,
            ...item,
          })),
        });
      }
    });
  }

  static async getOrdersData(sellerAccountId: number) {
    return await Prisma.amazonOrders.findMany({
      where: { sellerAccountId },
    });
  }
}
