import { PromisedOrders } from "@/types/order";

interface OrderQueryParams {
  searchParamsPage?: string | null | undefined;
  searchParamsName?: string | null | undefined;
  searchParamsStatus?: string | null | undefined;
  searchParamsHeadersSort?: string | null | undefined;
}

export async function getOrders(
  params?: OrderQueryParams
): Promise<PromisedOrders> {
  let url = "https://apis.codante.io/api/orders-api/orders";

  const queryParams = new URLSearchParams();

  if (params?.searchParamsName) {
    queryParams.append("search", params.searchParamsName);
  }

  if (params?.searchParamsStatus) {
    queryParams.append("status", params.searchParamsStatus);
  }

  if (params?.searchParamsHeadersSort) {
    queryParams.append("sort", params.searchParamsHeadersSort);
  }

  if (params?.searchParamsPage) {
    queryParams.append("page", params.searchParamsPage);
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
