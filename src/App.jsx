import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import Favourites from "./Components/Favourites";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="favourites" element={<Favourites />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
