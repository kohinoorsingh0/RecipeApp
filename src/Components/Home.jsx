import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Home() {
  const [recipe, setRecipe] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("s") || "";
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.meals));
  }, [query]);
  return (
    <div>
      <h2>Recipe App</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setSearchParams({ s: e.target.value })}
        placeholder="Search Recipes"
      />

      <ul>
        {recipe.map((meal) => {
          return (
            <li key={meal.idMeal}>
              <Link to={`/recipe/${meal.idMeal}`}>
                {" "}
                <button>{meal.strMeal}</button>{" "}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
