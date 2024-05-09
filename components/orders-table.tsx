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
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Order, OrderStatus } from "@/types/order";
import { formatCurrencyBRL } from "@/lib/utils";
import { getOrders } from "@/server/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchParamsName = searchParams.get("search");
  const searchParamsStatus = searchParams.get("status");
  const searchParamsHeadersSort = searchParams.get("sort");
  const searchParamsPage = searchParams.get("page");

  useEffect(() => {
    async function HandleGetOrders() {
      try {
        const fetchedOrders = await getOrders({
          searchParamsName,
          searchParamsStatus,
          searchParamsHeadersSort,
          searchParamsPage,
        });
        setOrders(fetchedOrders.data);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar dados, tente novamente mais tarde.");
      }
    }

    HandleGetOrders();
  }, [
    searchParamsName,
    searchParamsStatus,
    searchParamsHeadersSort,
    searchParamsPage,
  ]);

  function handleSortByHeaderTitle(sortField: string) {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get("sort");
    let newSortDirection = "";

    if (currentSort === sortField) {
      newSortDirection = `-${sortField}`; // troca de asc para desc
    } else if (currentSort === `-${sortField}`) {
      newSortDirection = ""; //remove a ordenação
    } else {
      newSortDirection = sortField;
      params.delete("sort"); //ordena para asc
    }

    if (newSortDirection) {
      params.set("sort", newSortDirection);
    } else {
      params.delete("sort");
    }

    replace(`?${params.toString()}`);
  }

  function renderSortIcon(sortField: string) {
    const currentSort = searchParams.get("sort");

    if (currentSort === sortField) {
      return <ChevronUp className="size-4" />;
    } else if (currentSort === `-${sortField}`) {
      return <ChevronDown className="size-4" />;
    } else {
      return <ChevronsUpDown className="size-4" />;
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="w-full">
          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSortByHeaderTitle("customer_name")}
          >
            <div className="flex items-center gap-1">
              Nome
              {renderSortIcon("customer_name")}
            </div>
          </TableHead>

          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSortByHeaderTitle("status")}
          >
            <div className="flex items-center gap-1">
              Status
              {renderSortIcon("status")}
            </div>
          </TableHead>

          <TableHead
            className="table-cell cursor-pointer justify-end items-center gap-1"
            onClick={() => handleSortByHeaderTitle("order_date")}
          >
            <div className="flex items-center gap-1">
              Data
              {renderSortIcon("order_date")}
            </div>
          </TableHead>

          <TableHead
            className="text-right cursor-pointer flex justify-end items-center gap-1"
            onClick={() => handleSortByHeaderTitle("amount_in_cents")}
          >
            <div className="flex items-center gap-1">
              Valor
              {renderSortIcon("amount_in_cents")}
            </div>
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
