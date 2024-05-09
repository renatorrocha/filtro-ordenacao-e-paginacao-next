"use client";

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getOrders } from "@/server/actions";
import { Order } from "@/types/order";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination() {
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const totalPages = Math.ceil(totalOrders / 10);

  useEffect(() => {
    async function HandleGetOrders() {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
        setTotalOrders(fetchedOrders.meta.total);
      } catch (error) {
        console.error(error);
      }
    }
    HandleGetOrders();
  }, []);

  function nextPage() {
    setPage(page + 1);
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    replace(`?${params.toString()}`);
  }

  function previousPage() {
    setPage(page - 1);
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    replace(`?${params.toString()}`);
  }

  function changePage(page: number) {
    setPage(page);
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());
    replace(`?${params.toString()}`);
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem className={page == 1 ? "hidden" : "inline"}>
          <PaginationPrevious onClick={previousPage} />
        </PaginationItem>

        {Array.from({ length: Math.min(3, totalPages) }).map((_, index) => (
          <PaginationItem key={index} className="hidden md:inline-flex">
            <PaginationLink onClick={() => changePage(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem className="hidden md:inline-flex">
          <PaginationEllipsis />
        </PaginationItem>

        {/* <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>8</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>9</PaginationLink>
        </PaginationItem>
        <PaginationItem className="hidden md:inline-flex">
          <PaginationLink>{totalPages}</PaginationLink>
        </PaginationItem> */}

        <PaginationItem className={page == totalPages ? "hidden" : "inline"}>
          <PaginationNext onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
