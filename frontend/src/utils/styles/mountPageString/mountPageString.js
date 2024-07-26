export function mountPageString(pageSelected, totalOfPages) {
   const pageItems = [];

   if (totalOfPages <= 1) {
      return pageItems;
   }

   const addPageItem = (item) => {
      if (!pageItems.includes(item)) {
         pageItems.push(item);
      }
   };

   const addPageRange = (start, end) => {
      for (let iP = start; iP <= end; iP += 1) {
         addPageItem(String(iP));
      }
   };

   const addDots = () => {
      if (pageItems[pageItems.length - 1] !== "...") {
         addPageItem("...");
      }
   };

   const addFirstPage = () => {
      addPageItem("1");
      if (pageSelected > 4) {
         addDots();
      }
   };

   const addLastPage = () => {
      if (pageSelected < totalOfPages - 3) {
         addDots();
         addPageItem(String(totalOfPages));
      } else if (pageSelected === totalOfPages - 3) {
         addPageItem(String(totalOfPages - 1));
         addPageItem(String(totalOfPages));
      } else if (pageSelected === totalOfPages - 2) {
         addPageItem(String(totalOfPages));
      }
   };

   const addPreviousPage = () => {
      if (pageSelected > 1) {
         addPageItem("<");
      }
   };

   const addNextPage = () => {
      if (pageSelected < totalOfPages) {
         addPageItem(">");
      }
   };

   addPreviousPage();

   if (totalOfPages <= 7) {
      addPageRange(1, totalOfPages);
   } else if (pageSelected <= 4) {
      addPageRange(1, 4);
      addDots();
      addLastPage();
   } else if (pageSelected >= totalOfPages - 3) {
      addFirstPage();
      addDots();
      addPageRange(totalOfPages - 3, totalOfPages);
   } else {
      addFirstPage();
      if (pageSelected - 2 > 2) {
         addDots();
      }
      if (pageSelected - 1 > 2) {
         addPageItem("...");
      }
      addPageItem(pageSelected - 1);
      addPageItem(pageSelected);
      addPageItem(pageSelected + 1);
      if (pageSelected + 1 < totalOfPages - 1) {
         addPageItem("...");
      }
      addLastPage();
   }

   addNextPage();

   return pageItems;
}
