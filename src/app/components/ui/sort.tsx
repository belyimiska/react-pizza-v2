import React, { useEffect, useRef, useState } from "react";

type SortProps = {
  items: { id: string; title: string }[];
  activeValue: string;
  onSortItemSelect: any;
};

const Sort: React.FC<SortProps> = ({
  items,
  activeValue,
  onSortItemSelect,
}) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickBody = (event: any) => {
      if (!event.path.includes(sortRef.current)) {
        setIsPopupOpened(false);
      }
    };

    document.body.addEventListener("click", handleClickBody);

    return () => {
      document.body.removeEventListener("click", handleClickBody);
    };
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const handlePopupItemSelect = (id: string) => {
    onSortItemSelect(id);
    setIsPopupOpened(false);
  };

  const getPopupItemTitle = (id: string) => {
    const activeItem = items.find((item) => item.id === id);
    return activeItem?.title;
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={handleOpenPopup}>{getPopupItemTitle(activeValue)}</span>
      </div>
      {isPopupOpened && (
        <div className="sort__popup">
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className={activeValue === item.id ? "active" : ""}
                onClick={() => handlePopupItemSelect(item.id)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
