import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Recipe() {
  const { id } = useParams()
  const [meal , setMeal] = useState(null)
  const [ isFavs, setIsFavs] = useState(false)
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
          setMeal(data.meals[0])
          const favs = JSON.parse(localStorage.getItem("favs")) || []
          setIsFavs(favs.includes(id))
    } )
  } ,[id])

  const toggleFav = () => {

    const favs = JSON.parse(localStorage.getItem("favs")) || []
    let updated;

    if(isFavs){
      updated = favs.filter((x) => x !== id)
    }
    else{
      updated = [...favs, id]
    }
    localStorage.setItem('favs', JSON.stringify(updated))
    setIsFavs(!isFavs)
  }

  if(!meal) return <p>Loading....</p>

  
  return (
    <div>
      <button onClick={toggleFav} >
        {isFavs ? "Remove from Favourites" : "Add to Favourites"}
      </button>
      
      <p>Category : {meal.strCategory}</p>

      <img src={meal.strMealThumb} alt="" />
      <h3>Instructions : {meal.strInstructions}</h3>
    </div>

  )
}

export default Recipe
