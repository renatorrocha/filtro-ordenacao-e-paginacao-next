"use client";

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
import { Order, OrderStatus } from "@/types/order";
import { formatCurrencyBRL } from "@/lib/utils";
import { getOrders } from "@/server/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();

  const searchParamsName = searchParams.get("search");
  const searchParamsStatus = searchParams.get("status");

  useEffect(() => {
    async function HandleGetOrders() {
      try {
        const fetchedOrders = await getOrders({
          searchParamsName,
          searchParamsStatus,
        });
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error(error);
      }
    }

    HandleGetOrders();
  }, [searchParamsName, searchParamsStatus]);

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
        {orders?.map((order) => (
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
