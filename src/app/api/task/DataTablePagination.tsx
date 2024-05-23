import { Button } from '@/components/ui/button';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
interface DataTablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function DataTablePagination({
    currentPage,
    totalPages,
    onPageChange,
}: DataTablePaginationProps) {
    return (
        
        <div className="flex w-[100%] items-center justify-center text-sm font-medium">
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <div className="flex justify-between space-x-2" style={{marginLeft:'50px'}}>
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
            variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
               <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
        </div>
        </div>
    );
}
