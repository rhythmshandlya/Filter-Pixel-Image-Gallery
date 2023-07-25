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
            } pt-3 mr-4 px-2 text-[28px]`}
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
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onPageChange(currentPage - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>

              <p className="text-lg ml-3 font-semibold leading-none">
                Previous
              </p>
            </div>
          )}
        </div>
        <div className="sm:flex hidden">{renderPageNumbers()}</div>
        <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
          {currentPage < totalPages && (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => onPageChange(currentPage + 1)}
            >
              <p className="text-lg font-semibold leading-none mr-3">Next</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
