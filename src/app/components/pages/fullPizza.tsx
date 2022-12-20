import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizzaItem, setPizzaItem] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://639492654df9248eada64052.mockapi.io/items/${id}`
        );
        setPizzaItem(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Error in fullPizza");
        navigate("/");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="content__items">
        {!isLoading && (
          <div className="container">
            <img src={pizzaItem?.imageUrl} alt="pizza" />
            <h2>{pizzaItem?.title}</h2>
            <h4>{pizzaItem?.price}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPizza;
