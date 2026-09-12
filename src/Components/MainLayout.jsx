import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
      <Link to={"/favourites"}>
        <button>Favourites</button> 
      </Link>
      <Outlet/>
    </div>

    //https://www.themealdb.com/api/json/v1/1/search.php?s=
    //https://www.themealdb.com/api/json/v1/1/lookup.php?i=
    
  );
}

export default MainLayout;
