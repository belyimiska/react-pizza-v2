import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../ui/categories";
import PizzaBlock from "../ui/pizzaBlock";
import Skeleton from "../ui/skeleton";
import Sort from "../ui/sort";
import { categories } from "../../api/categories";
import { sortList } from "../../api/sorts";
import Pagination from "../pagination";
import {
  getCategoryId,
  getSearchValue,
  getSortItemId,
  setCategory,
  setSortItem,
} from "../../redux/filterSlice";
import {
  fetchPizzas,
  getPizzasLoadingStatus,
  getPizzas,
} from "../../redux/pizzasSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector(getSearchValue());
  const pizzas = useSelector(getPizzas());
  const activeCategoryId = useSelector(getCategoryId());
  const activeSortTypeId = useSelector(getSortItemId());
  const loadingStatus = useSelector(getPizzasLoadingStatus());

  useEffect(() => {
    const currentCategory =
      Number(activeCategoryId) > 0 ? `category=${activeCategoryId}` : "";

    const currentOrder = getSortProperty(activeSortTypeId)?.includes("-")
      ? "asc"
      : "desc";

    const currentSort = getSortProperty(activeSortTypeId)?.replace("-", "");

    dispatch(
      //@ts-ignore
      fetchPizzas({ currentCategory, currentSort, currentOrder })
    );
  }, [activeCategoryId, activeSortTypeId]);

  const getSortProperty = (id: string) => {
    const currentSort = sortList.find((item) => item.id === id);
    return currentSort?.sortProperty;
  };

  const handleCategorySelect = (id: string) => {
    dispatch(setCategory(id));
  };

  const handleSortItemSelect = (id: string) => {
    dispatch(setSortItem(id));
  };

  const filterItems = (data: any) => {
    const filteredItems = searchValue
      ? data.filter((item: any) =>
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
        {loadingStatus === "loading" ? (
          [...new Array(8)].map((_, index) => <Skeleton key={index} />)
        ) : filteredItems.length === 0 ? (
          <h3>Ничего не найдено</h3>
        ) : (
          filteredItems.map((item: any) => (
            <PizzaBlock key={item.id} {...item} />
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
