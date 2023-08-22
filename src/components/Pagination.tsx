import Router from "next/router";
import { useRouter } from "next/router";
import { Category } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  category: Category;
  SSR: boolean;
  hasNextPage: boolean;
}
const Pagination = ({
  page,
  setPage,
  category,
  SSR,
  hasNextPage,
}: PaginationProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-evenly mt-10">
      <div
        className={`h-10 w-10 border-solid border-[1px] border-gray-700 rounded-full flex justify-center items-center cursor-pointer ${
          page == 1 && "opacity-30"
        }`}
        onClick={() => {
          if (page > 1) {
            setPage((pre) => pre - 1);
            if (!category.category_id) {
              SSR && router.push(`/SSR?page=${page - 1}`);
            } else {
              SSR &&
                router.push(
                  `/SSR?page=${page - 1}&category=${category.category_id}`
                );
            }
          }
        }}
      >
        pre
      </div>
      <div>{page}</div>

      <div
        className={`h-10 w-10 border-solid border-[1px] border-gray-700 rounded-full flex justify-center items-center cursor-pointer ${
          !hasNextPage && "opacity-30"
        }`}
        onClick={() => {
          setPage((pre) => pre + 1);
          if (!category.category_id) {
            SSR && router.push(`/SSR?page=${page + 1}`);
          } else {
            SSR &&
              router.push(
                `/SSR?page=${page + 1}&category=${category.category_id}`
              );
          }
        }}
      >
        next
      </div>
    </div>
  );
};

export default Pagination;

// ${category?`&category=${category}`:null}
