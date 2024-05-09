import { Order } from "../types/order";

interface Orders {
  data: Order[];
}

interface OrderQueryParams {
  searchParamsName?: string | null | undefined;
  searchParamsStatus?: string | null | undefined;
  searchParamsSort?: string | null | undefined;
}

export async function getOrders(params: OrderQueryParams): Promise<Orders> {
  let url = "https://apis.codante.io/api/orders-api/orders";

  const queryParams = new URLSearchParams();

  if (params.searchParamsName) {
    queryParams.append("search", params.searchParamsName);
  }

  if (params.searchParamsStatus) {
    queryParams.append("status", params.searchParamsStatus);
  }

  if (params.searchParamsSort) {
    queryParams.append("sort", params.searchParamsSort);
  }

  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Theres something wrong with the server.");
  }

  return res.json();
}
