import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex items-center justify-center">
        {pageNumbers.map((pageNumber) => (
          <p
            key={pageNumber}
            className={`text-lg font-semibold leading-none cursor-pointer ${
              pageNumber === currentPage
                ? "text-indigo-700 border-t border-indigo-400"
                : "text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400"
            } pt-3 mr-4 px-2`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
          {currentPage > 1 && (
            <>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths */}
              </svg>
              <p
                className="text-lg ml-3 font-semibold leading-none"
                onClick={() => onPageChange(currentPage - 1)}
              >
                Previous
              </p>
            </>
          )}
        </div>
        <div className="sm:flex hidden">{renderPageNumbers()}</div>
        <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
          {currentPage < totalPages && (
            <>
              <p
                className="text-lg font-semibold leading-none mr-3"
                onClick={() => onPageChange(currentPage + 1)}
              >
                Next
              </p>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG paths */}
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
