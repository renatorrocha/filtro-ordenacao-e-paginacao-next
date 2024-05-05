import { Order } from "../types/order";

interface Orders {
  data: Order[];
}

export async function getOrders(): Promise<Orders> {
  const res = await fetch("https://apis.codante.io/api/orders-api/orders");

  if (!res.ok) {
    throw new Error("Theres something wrong with the server.");
  }

  return res.json();
}
