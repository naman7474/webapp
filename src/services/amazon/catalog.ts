import { callSpApi } from "@/services/amazon/index";

export async function fetchCatalogItem(
  marketplaceIds: Array<string>,
  asin: string
): Promise<any> {
  const params: any = {
    marketplaceIds,
    // keywords: "books",
    // sellerId: "A14IOOJN7DLJME",
    // identifiersType: "SKU",
    // Query: "books", // At least one of Query, SellerSKU, UPC, EAN, ISBN, JAN is also required.
  };
  return callSpApi(`catalog/2022-04-01/items/${asin}`, params);
}

// const data = {
//   asin: "B07DQLT7DS",
//   summaries: [
//     {
//       marketplaceId: "A21TJRUUN4KGV",
//       adultProduct: false,
//       autographed: false,
//       brand: "Arsh Sahitya Prachar Trust",
//       browseClassification: {
//         displayName: "Society & Culture",
//         classificationId: "1318222031",
//       },
//       contributors: [
//         {
//           role: { displayName: "Author", value: "author" },
//           value: "Maharishi Dayanand Saraswati",
//         },
//       ],
//       itemClassification: "BASE_PRODUCT",
//       itemName: "Satyarth Prakash",
//       memorabilia: false,
//       tradeInEligible: false,
//       websiteDisplayGroup: "book_display_on_website",
//       websiteDisplayGroupName: "Book",
//     },
//   ],
// };

export async function fetchItemData(
  marketplaceIds: Array<string>,
  sellerId: string,
  sku: string
): Promise<any> {
  const params: any = {
    marketplaceIds,
  };
  return callSpApi(
    `/listings/2021-08-01/items/${sellerId}/${sku}`,
    params
  );
}

// const data = {
//   sku: "TI-1GQD-H5HA",
//   summaries: [
//     {
//       marketplaceId: "A21TJRUUN4KGV",
//       asin: "B07DQLT7DS",
//       productType: "ABIS_BOOK",
//       conditionType: "new_new",
//       status: ["DISCOVERABLE"],
//       itemName: "Satyarth Prakash",
//       createdDate: "2024-03-08T13:09:15.486Z",
//       lastUpdatedDate: "2024-03-09T14:15:23.644Z",
//       mainImage: {
//         link: "https://m.media-amazon.com/images/I/51tqMAoxZ5L.jpg",
//         height: 500,
//         width: 318,
//       },
//     },
//   ],
// };
