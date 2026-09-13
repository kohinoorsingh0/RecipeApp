import { NavLink, Outlet } from "react-router-dom";
import { SpoonIcon } from "./Icons";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink to="/" className="brand">
            <SpoonIcon className="brand__mark" />
            <span className="brand__name">The Recipe Box</span>
          </NavLink>

          <nav className="site-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => "site-nav__link" + (isActive ? " is-active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive }) => "site-nav__link" + (isActive ? " is-active" : "")}
            >
              Favourites
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Recipes courtesy of TheMealDB.</p>
      </footer>
    </div>
  );
}

export default MainLayout;

// https://www.themealdb.com/api/json/v1/1/search.php?s=
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=