import React from "react";

type CategoriesProps = {
  items: { id: string; title: string }[];
  activeValue: string;
  onCategorySelect: any;
};

const Categories: React.FC<CategoriesProps> = ({
  items,
  activeValue,
  onCategorySelect,
}) => {
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
