import { callSpApi } from "@/services/amazon/index";

const parseFbaInventory = (data: any) => {
  if (!data?.payload) {
    return [];
  }

  return data?.payload?.inventorySummaries?.map((item: any) => ({
    asin: item.asin,
    fnSku: item.fnSku,
    sellerSku: "EMTEC 1 GB",
    condition: "NewItem",
    inventoryDetails: {
      fulfillableQuantity: 0,
      inboundWorkingQuantity: 0,
      inboundShippedQuantity: 0,
      inboundReceivingQuantity: 0,
      reservedQuantity: {
        totalReservedQuantity: 0,
        pendingCustomerOrderQuantity: 0,
        pendingTransshipmentQuantity: 0,
        fcProcessingQuantity: 0,
      },
      researchingQuantity: {
        totalResearchingQuantity: 0,
        researchingQuantityBreakdown: [],
      },
      unfulfillableQuantity: {
        totalUnfulfillableQuantity: 0,
        customerDamagedQuantity: 0,
        warehouseDamagedQuantity: 0,
        distributorDamagedQuantity: 0,
        carrierDamagedQuantity: 0,
        defectiveQuantity: 0,
        expiredQuantity: 0,
      },
    },
    lastUpdatedTime: "",
    productName: "EMTEC 1 GB 60x SD Flash Memory Card with USB 2.0 Card Reader",
    totalQuantity: 0,
  }));
};

export async function fetchFbaInventory(
  marketplaceIds: Array<string>,
  sellerId: string
): Promise<any> {
  const params: any = {
    marketplaceIds,
    granularityId: marketplaceIds[0],
    granularityType: "Marketplace",
    sellerSku: sellerId,
    // details: "true",
  };
  return parseFbaInventory(
    await callSpApi(`fba/inventory/v1/summaries`, params)
  );
}

export async function getFbaInboundEligibility(
  marketplaceIds: Array<string>,
  asin: string
): Promise<any> {
  const params: any = {
    marketplaceIds,
    asin,
    program: "INBOUND",
  };
  const inventory_response = await callSpApi(
    `fba/inbound/v1/eligibility/itemPreview`,
    params
  );
  if (inventory_response) {
    console.log("Fba inbound eligibility:", JSON.stringify(inventory_response));
  } else {
    console.log("Failed to retrieve fba inbound eligibility.");
  }
}

// const data = {
//   payload: {
//     asin: "B07DQLT7DS",
//     marketplaceId: "A21TJRUUN4KGV",
//     program: "INBOUND",
//     isEligibleForProgram: false,
//     ineligibilityReasonList: ["FBA_INB_0037", "FBA_INB_0050"],
//   },
// };
