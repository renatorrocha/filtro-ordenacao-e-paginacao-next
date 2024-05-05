import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { ChevronsUpDown } from "lucide-react";
import { Order, OrderStatus } from "@/app/_types/order";
import { formatCurrencyBRL } from "@/lib/utils";

interface Orders {
  data: Order[];
}

export default async function OrdersTable() {
  const res = await fetch("https://apis.codante.io/api/orders-api/orders");
  const orders: Orders = await res.json();

  console.log(orders.data);

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead className="table-cell">Cliente</TableHead>
          <TableHead className="table-cell">Status</TableHead>
          <TableHead className="table-cell cursor-pointer justify-end items-center gap-1">
            <div className="flex items-center gap-1">
              Data
              <ChevronsUpDown className="w-4" />
            </div>
          </TableHead>
          <TableHead className="text-right cursor-pointer flex justify-end items-center gap-1">
            Valor
            <ChevronsUpDown className="w-4" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.data.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div className="font-medium">{order.customer_name}</div>
              <div className="hidden md:inline text-sm text-muted-foreground">
                {order.customer_email}
              </div>
            </TableCell>

            <TableCell>
              <Badge className={`text-xs`} variant="outline">
                {OrderStatus[order.status]}
              </Badge>
            </TableCell>

            <TableCell className="hidden md:table-cell">
              {order.order_date}
            </TableCell>

            <TableCell className="text-right">
              {formatCurrencyBRL(order.amount_in_cents)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
