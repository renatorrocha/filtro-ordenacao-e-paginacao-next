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

export enum OrderStatus {
  completed = "Concluído",
  pending = "Pendente",
}
