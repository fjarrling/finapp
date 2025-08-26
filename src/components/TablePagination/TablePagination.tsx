import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type TablePaginationProps = {
  totalPages: number;
  currentPage: number;
  changePage: (pageNumber: number) => void;
}

const TablePagination = (
  {totalPages, currentPage, changePage}: TablePaginationProps) => {

  const pagesArray = Array.from({length: totalPages}, (_, i) => i + 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePrevPage()}
          />
        </PaginationItem>
        {
          pagesArray.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => {
                  changePage(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        <PaginationItem>
          <PaginationNext
            onClick={() => handleNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;