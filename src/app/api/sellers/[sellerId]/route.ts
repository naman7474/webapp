import { PartnerService } from "@/services/database/partners/service";
import { SellerMarketplaceService } from "@/services/database/seller/service";
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "@/utils/request";

export async function GET(req: Request, context: any) {
  const { params } = context;
  const sellerId = params.sellerId || "";
  try {
    const seller = await PartnerService.getPartnerDetail(
      parseInt(sellerId, 10) || 0
    );

    if (!seller?.id) {
      return BadRequestResponse("Seller not found");
    }

    const sales = await SellerMarketplaceService.getSalesData(seller.id);
    const orders = await SellerMarketplaceService.getOrdersData(seller.id);

    return SuccessResponse({ sales, orders, totalOrders: orders.length });
  } catch (err: any) {
    console.error(err);
    return InternalServerErrorResponse(err?.message || "Something went wrong");
  }
}
