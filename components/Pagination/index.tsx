import { useEffect, useMemo, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

import { cn } from "@/util/cn";

const calculateButtonNumber = (
  pageList: Array<number>,
  currentPage: number,
  offset: number,
) => {
  if (pageList.length < 9 || currentPage < 5) {
    return offset;
  } else if (pageList.length <= currentPage + 4) {
    return pageList.length - (9 - offset);
  } else {
    return currentPage + (offset - 5);
  }
};

type Props = {
  currentPage: number;
  limit?: number;
  totalCount: number;
  onChange: (page: number) => void;
};

const buttonCommonClassNames =
  "flex items-center justify-center rounded-full w-8 h-8 p-1 text-gray-800 transition hover:bg-gray-100 active:bg-gray-200 disabled:pointer-events-none disabled:text-gray-200 ";

export default function Pagination({
  currentPage = 1,
  limit = 10,
  totalCount,
  onChange,
}: Props) {
  const totalPage = Math.ceil(totalCount / limit);

  const [pageList, setPageList] = useState<Array<number>>([]);

  const generatePaginationButtons = useMemo(() => {
    const data = Array.from({ length: 9 }, (_, index) => ({
      id: index + 1,
      buttonNumber: calculateButtonNumber(pageList, currentPage, index + 1),
    }));

    return data;
  }, [pageList, currentPage]);

  useEffect(() => {
    const updagePageList = [];

    for (let i = 1; i <= totalPage; i++) {
      updagePageList.push(i);
    }

    setPageList(updagePageList);
  }, [currentPage, limit, totalCount, totalPage]);

  return (
    <div className="flex w-full justify-center">
      <ul className="flex items-center gap-1">
        <li>
          <button
            className={cn(buttonCommonClassNames)}
            disabled={currentPage <= 1}
            onClick={() => onChange(1)}
          >
            <FaAnglesLeft />
          </button>
        </li>
        <li>
          <button
            className={cn(buttonCommonClassNames)}
            disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}
          >
            <FaAngleLeft />
          </button>
        </li>
        {generatePaginationButtons.map((page, index) => (
          <li
            key={`${page.id}-${index}`}
            className={cn(page.buttonNumber > pageList.length && "hidden")}
          >
            <button
              className={cn(
                buttonCommonClassNames,
                page.buttonNumber === currentPage &&
                  "rounded-full bg-blue-300 text-white hover:bg-blue-400 active:bg-blue-500",
              )}
              onClick={() => onChange(page.buttonNumber)}
            >
              {page.buttonNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className={cn(buttonCommonClassNames)}
            disabled={currentPage === totalPage}
            onClick={() => onChange(currentPage + 1)}
          >
            <FaAngleRight />
          </button>
        </li>
        <li>
          <button
            className={cn(buttonCommonClassNames)}
            disabled={currentPage === totalPage}
            onClick={() => onChange(totalPage)}
          >
            <FaAnglesRight />
          </button>
        </li>
      </ul>
    </div>
  );
}
