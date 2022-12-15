import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SeacrhContext } from "../../App";
import axios from "axios";
import Categories from "../ui/categories";
import PizzaBlock from "../ui/pizzaBlock";
import Skeleton from "../ui/skeleton";
import Sort from "../ui/sort";
import { categories } from "../../api/categories";
import { sortList } from "../../api/sorts";
import Pagination from "../pagination";
import {
  getCategoryId,
  getSortItemId,
  setCategory,
  setSortItem,
} from "../../redux/filterSlice";

const HomePage = () => {
  const { searchValue } = useContext(SeacrhContext);
  const dispatch = useDispatch();

  const activeCategoryId = useSelector(getCategoryId());
  const activeSortTypeId = useSelector(getSortItemId());

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    // window.scrollTo(0, 0);
  }, [activeCategoryId, activeSortTypeId]);

  const getSortProperty = (id) => {
    const currentSort = sortList.find((item) => item.id === id);
    return currentSort.sortProperty;
  };

  const handleCategorySelect = (id) => {
    dispatch(setCategory(id));
  };

  const handleSortItemSelect = (id) => {
    dispatch(setSortItem(id));
  };

  const filterItems = (data) => {
    const filteredItems = searchValue
      ? data.filter((item) =>
          item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : data;
    return filteredItems;
  };

  const filteredItems = pizzas.length > 0 ? filterItems(pizzas) : pizzas;

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
        {isLoading ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />)
        ) : filteredItems.length === 0 ? (
          <h3>Ничего не найдено</h3>
        ) : (
          filteredItems.map((item) => <PizzaBlock key={item.id} {...item} />)
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
