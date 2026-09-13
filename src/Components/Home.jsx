import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchIcon, HeartIcon } from "./Icons";
import { isFavourite, toggleFavourite } from "../utils/favourites";
import "./Home.css";

const SUGGESTIONS = ["Chicken", "Pasta", "Vegan", "Dessert", "Seafood", "Soup"];

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [searchParams, setSearchParams] = useSearchParams();
  const [, forceUpdate] = useState(0);

  const query = searchParams.get("s") || "";

  useEffect(() => {
    if (!query) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when the search is cleared
      setRecipes([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals || []);
        setStatus("done");
      })
      .catch(() => {
        setRecipes([]);
        setStatus("done");
      });
  }, [query]);

  const handleFav = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(id);
    forceUpdate((n) => n + 1);
  };

  return (
    <div className="home">
      <section className="hero">
        <p className="hero__eyebrow">The Recipe Box</p>
        <h1 className="hero__title">What are we cooking today?</h1>
        <p className="hero__subtitle">Search thousands of dishes from kitchens around the world.</p>

        <form className="search-card" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon className="search-card__icon" />
          <input
            type="text"
            className="search-card__input"
            value={query}
            onChange={(e) => setSearchParams(e.target.value ? { s: e.target.value } : {})}
            placeholder="Try “chicken curry” or “pasta”"
          />
        </form>

        {!query && (
          <div className="chip-row">
            {SUGGESTIONS.map((word) => (
              <button key={word} type="button" className="chip" onClick={() => setSearchParams({ s: word })}>
                {word}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="results">
        {status === "loading" && (
          <div className="recipe-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="recipe-card recipe-card--skeleton" key={i} />
            ))}
          </div>
        )}

        {status === "done" && recipes.length === 0 && (
          <div className="empty-state">
            <h2>No recipes found for “{query}”</h2>
            <p>Try a different ingredient or dish name.</p>
          </div>
        )}

        {status === "done" && recipes.length > 0 && (
          <div className="recipe-grid">
            {recipes.map((meal) => (
              <Link to={`/recipe/${meal.idMeal}`} className="recipe-card" key={meal.idMeal}>
                <div className="recipe-card__media">
                  <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                  {meal.strCategory && <span className="recipe-card__tag">{meal.strCategory}</span>}
                  <button
                    type="button"
                    className={"recipe-card__fav" + (isFavourite(meal.idMeal) ? " is-active" : "")}
                    onClick={(e) => handleFav(e, meal.idMeal)}
                    aria-label="Toggle favourite"
                  >
                    <HeartIcon filled={isFavourite(meal.idMeal)} />
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
      </section>
    </div>
  );
}

export default Home;