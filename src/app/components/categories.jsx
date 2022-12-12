import React from "react";

const Categories = ({ items, activeValue, onCategorySelect }) => {
  return (
    <div className="categories">
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={activeValue === item.id ? "active" : ""}
            onClick={() => onCategorySelect(item.id)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
