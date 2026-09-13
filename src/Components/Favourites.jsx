import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "./Icons";
import { getFavourites, toggleFavourite } from "../utils/favourites";
import "./Favourites.css";

function Favourites() {
  const [favs, setFavs] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | done

  useEffect(() => {
    const stored = getFavourites();

    if (stored.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: no ids saved, nothing to fetch
      setFavs([]);
      setStatus("done");
      return;
    }

    Promise.all(
      stored.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.json())
          .then((data) => data.meals?.[0])
      )
    ).then((meals) => {
      setFavs(meals.filter(Boolean));
      setStatus("done");
    });
  }, []);

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
    setFavs((current) => current.filter((meal) => meal.idMeal !== id));
  };

  return (
    <div className="favourites">
      <section className="page-heading">
        <h1>Your recipe box</h1>
        <p>Every dish you’ve tucked away, in one place.</p>
      </section>

      {status === "loading" && (
        <div className="recipe-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="recipe-card recipe-card--skeleton" key={i} />
          ))}
        </div>
      )}

      {status === "done" && favs.length === 0 && (
        <div className="empty-state">
          <h2>Nothing saved yet</h2>
          <p>Recipes you favourite will show up here.</p>
          <Link to="/" className="button button--primary">
            Browse recipes
          </Link>
        </div>
      )}

      {status === "done" && favs.length > 0 && (
        <div className="recipe-grid">
          {favs.map((meal) => (
            <Link to={`/recipe/${meal.idMeal}`} className="recipe-card" key={meal.idMeal}>
              <div className="recipe-card__media">
                <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                {meal.strCategory && <span className="recipe-card__tag">{meal.strCategory}</span>}
                <button
                  type="button"
                  className="recipe-card__fav is-active"
                  onClick={(e) => handleRemove(e, meal.idMeal)}
                  aria-label="Remove from favourites"
                >
                  <HeartIcon filled />
                </button>
              </div>
              <div className="recipe-card__body">
                <h3 className="recipe-card__title">{meal.strMeal}</h3>
                {meal.strArea && <p className="recipe-card__meta">{meal.strArea} cuisine</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;