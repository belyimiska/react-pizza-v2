import React, { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../categories";
import PizzaBlock from "../pizzaBlock";
import Skeleton from "../skeleton";
import Sort from "../sort";
import { categories, initialCategory } from "../../api/categories";
import { initialSortItem, sortList } from "../../api/sorts";

const HomePage = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory.id);
  const [activeSortTypeId, setActiveSortTypeId] = useState(initialSortItem.id);

  useEffect(() => {
    async function fetchData() {
      const currentCategory =
        Number(activeCategoryId) > 0 ? `category=${activeCategoryId}` : "";

      const currentOrder = getSortProperty(activeSortTypeId).includes("-")
        ? "asc"
        : "desc";

      const currentSort = getSortProperty(activeSortTypeId).replace("-", "");

      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://639492654df9248eada64052.mockapi.io/items?${currentCategory}&sortBy=${currentSort}&order=${currentOrder}`
        );

        setPizzas(data);
        setIsLoading(false);
      } catch (error) {
        alert("Err from axios get pizzas", error);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [activeCategoryId, activeSortTypeId]);

  const getSortProperty = (id) => {
    const currentSort = sortList.find((item) => item.id === id);
    return currentSort.sortProperty;
  };

  const handleCategorySelect = (id) => {
    setActiveCategoryId(id);
  };

  const handleSortItemSelect = (id) => {
    setActiveSortTypeId(id);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={categories}
          activeValue={activeCategoryId}
          onCategorySelect={handleCategorySelect}
        />
        <Sort
          items={sortList}
          activeValue={activeSortTypeId}
          onSortItemSelect={handleSortItemSelect}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </div>
  );
};

export default HomePage;
