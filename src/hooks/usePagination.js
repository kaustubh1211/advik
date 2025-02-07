"use client";

import { useState } from "react";

const usePagination = (filteredItems = [], currentLimit = 6, pagiItemsLengthPerView = 5) => {
  // Ensure filteredItems is always an array
  const validItems = Array.isArray(filteredItems) ? filteredItems : [];

  // States
  const [currentpage, setCurrentpage] = useState(0);

  // Pagination logic
  const limit = currentLimit > 0 ? currentLimit : 6; // Ensure limit is positive
  const totalItems = validItems.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit)); // Ensure totalPages is at least 1
  const skip = limit * currentpage;

  const currentItems = validItems.slice(skip, skip + limit);
  const totalCurrentItems = currentItems.length;

  // Ensure pagination array is valid
  const paginationItemsUnmodified = Array.from({ length: totalPages }, (_, idx) => idx);
  const paginationItems = paginationItemsUnmodified.length ? paginationItemsUnmodified : [0];

  // Handle pagination range
  let showMore = false;
  let currentPaginationItems = paginationItems;
  if (totalPages > pagiItemsLengthPerView) {
    showMore = currentpage + 1 > totalPages / 2 ? "left" : "right";

    const sliceStartPoint =
      currentpage >= totalPages - (pagiItemsLengthPerView < 6 ? 2 : 3)
        ? -(pagiItemsLengthPerView - 2)
        : currentpage < pagiItemsLengthPerView - 3
        ? 0
        : showMore === "left"
        ? currentpage - 1
        : currentpage - (pagiItemsLengthPerView - 4);

    const sliceEndPoint =
      currentpage >= totalPages - (pagiItemsLengthPerView < 6 ? 2 : 3)
        ? totalPages
        : currentpage < pagiItemsLengthPerView - 3
        ? pagiItemsLengthPerView - 2
        : showMore === "left"
        ? currentpage + (pagiItemsLengthPerView - 3)
        : currentpage + 2;

    currentPaginationItems = paginationItems.slice(sliceStartPoint, sliceEndPoint);
  }

  return {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage: (e, id) => setCurrentpage(id),
    firstItem: Math.min(skip + 1, totalItems),
    lastItem: Math.min(skip + totalCurrentItems, totalItems),
  };
};

export default usePagination;
