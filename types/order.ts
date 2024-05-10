export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  order_date: string;
  amount_in_cents: number;
  status: keyof typeof OrderStatus;

  created_at: string;
  updated_at: string;
};

export type PromisedOrders = {
  data: Order[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
};

export enum OrderStatus {
  completed = "Concluído",
  pending = "Pendente",
}
