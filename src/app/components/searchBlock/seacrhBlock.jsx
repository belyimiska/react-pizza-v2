import React, { useContext, useRef } from "react";
import { SeacrhContext } from "../../App";

import styles from "./searchBlock.module.scss";

const SearchBlock = () => {
  const { searchValue, handleSearchQuery, handleSearchClear } =
    useContext(SeacrhContext);

  const inputRef = useRef();

  const handleInputClear = () => {
    handleSearchClear();
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={handleSearchQuery}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={handleInputClear}
          className={styles.clearIcon}
          width="40"
          height="40"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
            fill="#B5B5B5"
          />
        </svg>
      )}
    </div>
  );
};

export default SearchBlock;
