import { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import LoadingScreen from "@/libs/components/LoadingScreen";

import { useApi } from "@/hooks/use-apis";
import DashboardOrdersList from "@/sections/dashboard/dashboard-orders-list";
import DashboardSalesList from "@/sections/dashboard/dashboard-sales-list";
import { API_ENDPOINTS } from "@/utils/axios";

import DashboardOverviewCard from "./dashboard-overview-card";

const DataMap: Record<string, any> = [
  {
    title: "Total Orders",
    key: "totalOrders",
    color: "success.main",
  },
  {
    title: "Total Items",
    key: "tutorsCount",
    color: "primary.main",
  },
  // {
  //   title: "Total Sales Today",
  //   key: "totalClassrooms",
  //   color: "warning.main",
  // },
];

const DashboardSeller = ({ sellerId }: { sellerId: string }) => {
  const { data, isLoading, getData } = useApi();

  useEffect(() => {
    if (sellerId) {
      getData(API_ENDPOINTS.dashboard.seller.detail(sellerId));
    }
    // eslint-disable-next-line
  }, [sellerId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      {!!data && (
        <>
          <Grid container spacing={2}>
            {DataMap.map((item: Record<string, any>) => (
              <Grid xs={12} sm={6}>
                <DashboardOverviewCard
                  title={item.title}
                  total={data?.[item.key] || 0}
                  icon={item?.icon}
                  link={item?.link}
                  color={item.color}
                />
              </Grid>
            ))}
          </Grid>
          <DashboardOrdersList data={data?.orders || []} />
          <DashboardSalesList data={data?.sales || []} />
        </>
      )}
    </Box>
  );
};

export default DashboardSeller;
