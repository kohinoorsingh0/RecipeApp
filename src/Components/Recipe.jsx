import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, HeartIcon, PlayIcon, LinkIcon } from "./Icons";
import { isFavourite, toggleFavourite } from "../utils/favourites";
import "./Recipe.css";

function getIngredients(meal) {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      items.push({ id: i, ingredient: ingredient.trim(), measure: measure ? measure.trim() : "" });
    }
  }
  return items;
}

function getTags(meal) {
  return meal.strTags
    ? meal.strTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
}

function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function Recipe() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show the loading state while the new id fetches
    setMeal(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals[0]);
        setIsFav(isFavourite(id));
      });
  }, [id]);

  const handleToggleFav = () => {
    toggleFavourite(id);
    setIsFav((prev) => !prev);
  };

  if (!meal) {
    return (
      <div className="recipe--loading">
        <div className="recipe__skeleton-media" />
        <div className="recipe__skeleton-body">
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" style={{ width: "80%" }} />
        </div>
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const tags = getTags(meal);
  const videoEmbedUrl = getYoutubeEmbedUrl(meal.strYoutube);
  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r\n|\n/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="recipe">
      <Link to="/" className="back-link">
        <ArrowLeftIcon /> All recipes
      </Link>

      <div className="recipe__layout">
        <div className="recipe__media-col">
          <div className="recipe__photo">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>

          <div className="recipe__tags">
            {meal.strCategory && <span className="tag-stamp">{meal.strCategory}</span>}
            {meal.strArea && <span className="tag-stamp tag-stamp--outline">{meal.strArea}</span>}
          </div>

          {tags.length > 0 && (
            <div className="recipe__keywords">
              {tags.map((tag) => (
                <span className="keyword-chip" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className={"button button--fav" + (isFav ? " is-active" : "")}
            onClick={handleToggleFav}
          >
            <HeartIcon filled={isFav} />
            {isFav ? "Saved to favourites" : "Add to favourites"}
          </button>

          {(meal.strYoutube || meal.strSource) && (
            <div className="recipe__links">
              {meal.strYoutube && (
                <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="link-button">
                  <PlayIcon /> Watch video
                </a>
              )}
              {meal.strSource && (
                <a href={meal.strSource} target="_blank" rel="noreferrer" className="link-button">
                  <LinkIcon /> Original recipe
                </a>
              )}
            </div>
          )}
        </div>

        <div className="recipe__content-col">
          <h1 className="recipe__title">{meal.strMeal}</h1>

          {ingredients.length > 0 && (
            <section className="recipe__section">
              <h2>Ingredients</h2>
              <ul className="ingredient-list">
                {ingredients.map((item) => (
                  <li key={item.id}>
                    <span className="ingredient-list__measure">{item.measure}</span>
                    <span className="ingredient-list__name">{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {steps.length > 0 && (
            <section className="recipe__section">
              <h2>Instructions</h2>
              {steps.length > 1 ? (
                <ol className="step-list">
                  {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="recipe__instructions">{steps[0]}</p>
              )}
            </section>
          )}

          {videoEmbedUrl && (
            <section className="recipe__section">
              <h2>Video</h2>
              <div className="video-frame">
                <iframe
                  src={videoEmbedUrl}
                  title={`${meal.strMeal} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

export default Recipe;