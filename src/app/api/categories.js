export const categories = [
  { id: "0", title: "Все" },
  { id: "1", title: "Мясные" },
  { id: "2", title: "Вегетарианская" },
  { id: "3", title: "Гриль" },
  { id: "4", title: "Острые" },
  { id: "5", title: "Закрытые" },
];

export const initialCategory = categories.find((item) => item.title === "Все");
