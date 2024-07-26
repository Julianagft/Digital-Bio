
export function PaginatedButtons({ paginationArray = [], currentPage = 1, handlePageChange = () => {} }) {
   return (
      <div className="flex gap-3">
         {paginationArray.map((item, index) => {
            if (item === "<") {
               return (
                  <button
                     key={index}
                     type="button"
                     className="px-3.5 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
                     onClick={() => handlePageChange(currentPage - 1)}
                  >
                     {item}
                  </button>
               );
            }

            if (item === ">") {
               return (
                  <button
                     key={index}
                     type="button"
                     className="px-3.5 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
                     onClick={() => handlePageChange(currentPage + 1)}
                  >
                     {item}
                  </button>
               );
            }

            if (item === "...") {
               return (
                  <button
                     key={index}
                     type="button"
                     className="px-3.5 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100"
                     onClick={() => {}}
                  >
                     {item}
                  </button>
               );
            }

            return (
               <button
                  key={index}
                  type="button"
                  className={`px-3.5 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-blue-100 transition-all duration-300
                  ${currentPage === Number(item) ? "bg-blue-200" : ""}`}
                  onClick={() => handlePageChange(Number(item))}
               >
                  {item}
               </button>
            );
         })}
      </div>
   );
}
