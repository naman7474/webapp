export const dynamic = "force-dynamic";

import { updateAccessToken } from "@/services/amazon";
import { fetchCatalogItem, fetchItemData } from "@/services/amazon/catalog";
import {
  fetchFbaInventory,
  getFbaInboundEligibility,
} from "@/services/amazon/fba";
import { fetchFinances } from "@/services/amazon/finance";
import { fetchOrdersData } from "@/services/amazon/orders";
import {
  fetchProductFees,
  fetchProductOffers,
  fetchProductPricing,
} from "@/services/amazon/product";
import { fetchReport, fetchReportDocument } from "@/services/amazon/report";
import { fetchSalesData } from "@/services/amazon/sales";
import { fetchSellerData } from "@/services/amazon/seller";
import { PartnerService } from "@/services/database/partners/service";
import { SellerMarketplaceService } from "@/services/database/seller/service";
import { parseValue } from "@/utils";
import { downloadAndParseTsv } from "@/utils/csv";
import {
  BadRequestResponse,
  getUrlSearchParam,
  InternalServerErrorResponse,
  SuccessResponse,
} from "@/utils/request";

// const CODE = "RHYTEKondiNOONNNzxjh";
// Generated at 12:14
// const REFRESH_TOKEN =
// "Atzr|IwEBIH55gbjCBhKgAfUGXsj0yFMl1yrHEMC9qSZemaskWGrVUgLXf67GEkK3yE0FD45zhqfexPTtlAEoBfCMntxZEtUsFWQDzlQjyQ_sgclgZitFctdhJsu-UmXRnTZyYFiaKeMT48VNCczi4YXCVxNtPaVI5BnkApzHUUiG2lmGP7F7orzlHxINjrIuPXTx9xY8Eu9q6dbR88NeaqhD0Fv5DX4KKUlsqpNFunKdjBf1MxUmwFaDIT3S2bZciBBSRouZLpVGdQAe_osY7oXM8i3kvui_g1ZdsyAhCAZZg9GRkRVi1T8HAv1zykf50dsB_H_pREFwUAb56yz07aRiLkl4rmaw";

export async function GET(req: Request) {
  try {
    const urlSellerId = getUrlSearchParam(req.url, "sellerId");
    if (!urlSellerId) {
      return BadRequestResponse("Seller ID is required");
    }

    const seller = await PartnerService.getPartnerDetail(
      parseInt(urlSellerId, 10) || 0
    );

    if (!seller) {
      return BadRequestResponse("Seller not found");
    }

    const sellerId = seller.id || 0;

    // const seller = sellers.partners[0];
    await updateAccessToken(seller?.refreshToken || "");
    const sellerItems = await fetchSellerData(sellerId);
    await SellerMarketplaceService.createSellerMarketplace(
      sellerId,
      sellerItems
    );
    const marketplaceIds = sellerItems.map((item: any) => item.marketplaceId);
    // const sales = await fetchSalesData(marketplaceIds);
    // await SellerMarketplaceService.addSalesData(seller.id, sales);

    const orders = await fetchOrdersData(marketplaceIds);
    await SellerMarketplaceService.addOrdersData(sellerId, orders);

    const finances = [];
    for (const order of orders) {
      const finance = await fetchFinances(order.orderId);
      finances.push(finance);
    }

    const items = [];
    const catalogItems = [];
    const fbaItems = [];
    const offers = [];
    const fees = [];
    const reports = await fetchReport();
    const reportDocumentId = reports?.reports?.[0]?.reportDocumentId;
    if (reportDocumentId) {
      const documentData = await fetchReportDocument(reportDocumentId);
      const documentUrl = parseValue(documentData?.url);
      if (documentUrl) {
        const reportData: any = await downloadAndParseTsv(documentUrl);
        const skus = reportData.map(
          (item: Record<string, any>) => item["seller-sku"]
        );
        for (const sku of skus) {
          const itemData = await fetchItemData(
            marketplaceIds,
            seller.sellerId || "",
            sku
          );

          items.push(itemData);
          const catalogData = await fetchCatalogItem(
            marketplaceIds,
            itemData?.summaries[0]?.asin
          );
          catalogItems.push(catalogData);
          const fbaItem = await getFbaInboundEligibility(
            marketplaceIds,
            itemData?.summaries[0]?.asin
          );

          fbaItems.push(fbaItem);

          const offerData = await fetchProductOffers(marketplaceIds[0], sku);
          console.log(JSON.stringify(offerData));
          offers.push(offerData);

          for (const offerItem of offers) {
            const feesData = await fetchProductFees(
              marketplaceIds[0],
              offerItem.sku
            );
            console.log(JSON.stringify(feesData));
            fees.push(feesData);
          }
          const feesData = await fetchProductFees(marketplaceIds[0], sku);
          console.log(JSON.stringify(feesData));
          fees.push(feesData);
        }

        const pricingData = await fetchProductPricing(marketplaceIds[0], skus); // max 20 skus
        console.log(JSON.stringify(pricingData));
      }
    }
    const fbaInventory = await fetchFbaInventory(
      marketplaceIds,
      seller.sellerId || ""
    );

    return SuccessResponse({
      message: "Updated data",
      sellerItems,
      fbaInventory,
      orders,
      // sales,
      // finances,
      items,
      catalogItems,
      fbaItems,
      offers,
      fees,
    });
  } catch (err: any) {
    console.error(err);
    return InternalServerErrorResponse(err?.message || "Something went wrong");
  }
}
