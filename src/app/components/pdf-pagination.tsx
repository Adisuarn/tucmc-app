import { cn } from "@/libs/utils";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { useWindowSize } from '@react-hookz/web';


const PDFPagination = ({
  currentPage,
  totalPages,
  pageValidation,
  onPageChange,
  onAddPage,
  onRemovePage
}: {
  currentPage: number;
  totalPages: number;
  pageValidation: boolean[];
  onPageChange: (page: number) => void;
  onAddPage: () => void;
  onRemovePage: (page: number) => void;
  }) => {
  const { width } = useWindowSize();
  const MAX_PAGES = 8;
  return (
    <div className="flex items-center gap-2 mb-4 mt-5">
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <div key={page} className="group flex items-center">
            <Button
              type="button"
              variant={currentPage === page ? "default" : "outline"}
              className={cn(
                (!pageValidation[page - 1]) && "bg-red-400 text-white hover:bg-red-400/90"
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
            {totalPages > 1 && (
              <div className="w-0 group-hover:w-8 overflow-hidden transition-all duration-200">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 ml-1 text-red-500 hover:text-red-700 hover:bg-red-100"
                  onClick={() => onRemovePage(page)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={onAddPage}
        disabled={totalPages >= MAX_PAGES}
        className={cn(
          "flex items-center gap-2",
          totalPages >= MAX_PAGES && "opacity-50 cursor-not-allowed"
        )}
      >
        <PlusCircle className="h-4 w-4" />
        {width > 768 && "Add Page"}
      </Button>
    </div>
  );
};

export default PDFPagination;
