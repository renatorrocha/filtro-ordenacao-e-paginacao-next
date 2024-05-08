import { Order } from "../types/order";

interface Orders {
  data: Order[];
}

export async function getOrders(search: string | null): Promise<Orders> {
  let url = "https://apis.codante.io/api/orders-api/orders";

  if (search) {
    const queryParams = new URLSearchParams({ search: search });
    url += `?${queryParams}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Theres something wrong with the server.");
  }

  return res.json();
}
