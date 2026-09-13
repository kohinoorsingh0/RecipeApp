import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import Favourites from "./Components/Favourites";
import Recipe from "./Components/Recipe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="favourites" element={<Favourites />}></Route>
          <Route path="recipe/:id" element={<Recipe/>}  ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
