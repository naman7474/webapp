import { callSpApi } from "@/services/amazon/index";

export async function fetchReport(): Promise<any> {
  const params: any = {
    reportTypes: "GET_MERCHANT_LISTINGS_ALL_DATA",
  };
  return callSpApi("reports/2021-06-30/reports", params);
}

export async function fetchReportDocument(documentId: string): Promise<any> {
  const params: any = {};
  return callSpApi(`reports/2021-06-30/documents/${documentId}`, params);
}

export async function fetchReportDetail(reportId: string): Promise<any> {
  const params: any = {
    // reportTypes: "GET_MERCHANT_LISTINGS_ALL_DATA",
  };
  const catalog_response = await callSpApi(
    `/reports/2021-06-30/reports/${reportId}`,
    params
  );
  if (catalog_response) {
    console.log("Catalog:", JSON.stringify(catalog_response));
  } else {
    console.log("Failed to retrieve catalog.");
  }
}
