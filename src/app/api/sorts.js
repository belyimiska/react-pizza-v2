export const sortList = [
  { id: "jhgHBB456", title: "популярности", sortProperty: "rating" },
  { id: "jhgBHJ789", title: "цене (дешевле)", sortProperty: "-price" },
  { id: "jhgUYTI74", title: "цене (дороже)", sortProperty: "price" },
];

export const initialSortItem = sortList.find(
  (item) => item.title === "популярности"
);

export const initSortItemId = initialSortItem ? initialSortItem.id : "";
