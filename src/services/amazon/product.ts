import { callSpApi } from "@/services/amazon/index";

const parseProductPricing = (data: any) => {
  if (!data?.payload) {
    return [];
  }

  return data.payload.map((item: any) => ({
    ...item.Product,
  }));
};

export async function fetchProductPricing(
  marketplaceId: string,
  skus: Array<string>
): Promise<any> {
  const params: any = {
    MarketplaceId: marketplaceId,
    Skus: skus,
    ItemType: "Sku",
    // keywords: "books",
    // sellerId: "A14IOOJN7DLJME",
    // identifiersType: "SKU",
    // Query: "books", // At least one of Query, SellerSKU, UPC, EAN, ISBN, JAN is also required.
  };
  return parseProductPricing(
    await callSpApi(`products/pricing/v0/price`, params)
  );
}

export async function fetchProductOffers(
  marketplaceId: string,
  sku: string
): Promise<any> {
  const params: any = {
    MarketplaceId: marketplaceId,
    ItemCondition: "New",
    // keywords: "books",
    // sellerId: "A14IOOJN7DLJME",
    // identifiersType: "SKU",
    // Query: "books", // At least one of Query, SellerSKU, UPC, EAN, ISBN, JAN is also required.
  };
  return callSpApi(`products/pricing/v0/listings/${sku}/offers`, params);
}

export async function fetchProductFees(
  marketplaceId: string,
  sku: string
): Promise<any> {
  const data = {
    IdType: "SellerSKU",
    IdValue: sku,
    FeesEstimateRequest: {
      MarketplaceId: marketplaceId,
      PriceToEstimateFees: {
        ListingPrice: {
          Amount: 500,
          CurrencyCode: "INR",
        },
      },
      Identifier: sku,
    },
  };
  return callSpApi(
    `/products/fees/v0/listings/${sku}/feesEstimate`,
    null,
    data
  );
}
