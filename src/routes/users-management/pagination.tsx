import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/helpers/cn";
import { useAppDispatch, useAppSelector } from "@/store";
import { setQuery } from "@/store/slices/user-slice";

export default function UserPagination() {
  const { pagination } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const currentPage = pagination?.page || 1;
  const totalPages = pagination?.totalPage || 0;
  const visiblePages = 3; // Number of pages to display at a time

  // Calculate the start and end of the visible range
  const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  // Adjust start page if there aren't enough pages at the end
  const adjustedStartPage = Math.max(
    Math.min(startPage, totalPages - visiblePages + 1),
    1
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                dispatch(setQuery({ page: currentPage - 1 }));
              }
            }}
            className={cn(currentPage === 1 && "pointer-events-none")}
          />
        </PaginationItem>

        {adjustedStartPage > 1 && (
          <>
            <PaginationItem className="hidden @lg:inline-flex">
              <PaginationLink
                onClick={() => dispatch(setQuery({ page: 1 }))}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {adjustedStartPage > 2 && <PaginationEllipsis className="hidden @lg:inline-flex" />}
          </>
        )}

        {Array.from({ length: endPage - adjustedStartPage + 1 }).map(
          (_, index) => {
            const page = adjustedStartPage + index;
            return (
              <PaginationItem key={page}
                className={cn(currentPage !== page && "hidden @lg:inline-flex")}
              >
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => {
                    dispatch(setQuery({ page }));
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
        )}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <PaginationEllipsis className="hidden @lg:inline-flex" />}
            <PaginationItem className="hidden @lg:inline-flex">
              <PaginationLink
                onClick={() => dispatch(setQuery({ page: totalPages }))}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem
          className={cn(currentPage === totalPages && "pointer-events-none")}
        >
          <PaginationNext
            onClick={() => {
              if (currentPage < totalPages) {
                dispatch(setQuery({ page: currentPage + 1 }));
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination >
  );
}
