
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favourites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favs")) || [];

    Promise.all(
      stored.map((id) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
          .then((res) => res.json())
          .then((data) => data.meals?.[0])
      )
    ).then((meals) => {
      setFavs(meals.filter(Boolean));
    });
  }, []);

  return (
    <div>
      {favs.length === 0 && <h1>No Favourites Added Yet</h1>}

      <ul>
        {favs.map((meal) => (
          <li key={meal.idMeal}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="150"
            />


            <Link to={`/recipe/${meal.idMeal}`}>
              <button>{meal.strMeal}</button> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;