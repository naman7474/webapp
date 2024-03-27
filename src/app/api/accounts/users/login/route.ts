import { encrypt } from "@/libs/utils/encrypt";

import { User } from "@/services/database/accounts/model";
import { UserService } from "@/services/database/accounts/service";
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  SuccessResponse,
} from "@/utils/request";

export async function POST(req: Request) {
  try {
    // const refreshToken = await getRefreshToken();
    // await exchangeCodeForTokens();
    // const apiToken = await getApiToken();
    // await getOrders();
    // await fetchReport();
    // await fetchCatalogItems("B07DQLT7DS");
    // await fetchReportDetail("52309019798");
    // await getItemsList("A14IOOJN7DLJME", "TI-1GQD-H5HA");
    // await getFbaInventory();
    // await getFbaInboundEligibility("B07DQLT7DS");
    // await fetchFinances("403-9348922-8509946");
    // await fetchSalesData();
    // await fetchSellerData();
    // return;
    const body = await req.json();
    if (!body.email || !body.password) {
      return BadRequestResponse("Email and password are required");
    }

    const password = await encrypt(body.password);
    const user: Partial<User> | null = await UserService.getUserByEmail(
      body.email
    );

    if (!user || user.password !== password) {
      return ForbiddenResponse("Invalid email or password");
    }

    delete user.password;

    return SuccessResponse({ ...user });
  } catch (error: any) {
    console.error(error);
    return InternalServerErrorResponse(
      error?.message || "Something went wrong"
    );
  }
}
