import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => console.log(e.selected)}
        pageRangeDisplayed={8}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
