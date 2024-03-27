import { callSpApi } from "@/services/amazon/index";

export async function fetchFinances(orderId: string): Promise<any> {
  const params: any = {};
  const defaultStartDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  params.PostedAfter = defaultStartDate.toISOString();
  return callSpApi(
    `finances/v0/orders/${orderId}/financialEvents`,
    params
  );
}

// const data = {
//   payload: {
//     FinancialEvents: {
//       ShipmentEventList: [],
//       ShipmentSettleEventList: [],
//       RefundEventList: [],
//       GuaranteeClaimEventList: [],
//       ChargebackEventList: [],
//       PayWithAmazonEventList: [],
//       ServiceProviderCreditEventList: [],
//       RetrochargeEventList: [],
//       RentalTransactionEventList: [],
//       PerformanceBondRefundEventList: [],
//       ProductAdsPaymentEventList: [],
//       ServiceFeeEventList: [],
//       SellerDealPaymentEventList: [],
//       DebtRecoveryEventList: [],
//       LoanServicingEventList: [],
//       AdjustmentEventList: [],
//       SAFETReimbursementEventList: [],
//       SellerReviewEnrollmentPaymentEventList: [],
//       FBALiquidationEventList: [],
//       CouponPaymentEventList: [],
//       ImagingServicesFeeEventList: [],
//       NetworkComminglingTransactionEventList: [],
//       AffordabilityExpenseEventList: [],
//       AffordabilityExpenseReversalEventList: [],
//       RemovalShipmentEventList: [],
//       RemovalShipmentAdjustmentEventList: [],
//       TrialShipmentEventList: [],
//       TDSReimbursementEventList: [],
//       AdhocDisbursementEventList: [],
//       TaxWithholdingEventList: [],
//       ChargeRefundEventList: [],
//       FailedAdhocDisbursementEventList: [],
//       ValueAddedServiceChargeEventList: [],
//       CapacityReservationBillingEventList: [],
//     },
//   },
// };
