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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pagination() {
  const [totalOrders, setTotalOrders] = useState(1);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const totalPages = Math.ceil(totalOrders / 10);

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  useEffect(() => {
    async function HandleGetOrders() {
      try {
        const fetchedOrders = await getOrders();
        setTotalOrders(fetchedOrders.meta.total);
      } catch (error) {
        console.error(error);
      }
    }

    HandleGetOrders();
  }, []);

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());
    replace(`?${params.toString()}`);
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem className={page == 1 ? "hidden" : "inline"}>
          <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
        </PaginationItem>

        {page > 2 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {page > 3 && (
              <PaginationItem className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {page < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {page < totalPages - 1 && (
          <>
            {page < totalPages - 2 && (
              <PaginationItem className="hidden md:inline-flex">
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem className={page == totalPages ? "hidden" : "inline"}>
          <PaginationNext onClick={() => handlePageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
