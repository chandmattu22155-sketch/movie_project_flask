import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-10">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-[#18181B] text-white disabled:opacity-40 hover:bg-purple-600"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page
              ? "bg-purple-600 text-white"
              : "bg-[#18181B] text-gray-400 hover:bg-purple-600 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-[#18181B] text-white disabled:opacity-40 hover:bg-purple-600"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;
