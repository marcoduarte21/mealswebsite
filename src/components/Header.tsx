import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [query, setQuery] = useState("");

  function handleClick() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar instanceof HTMLElement) {
      sidebar.style.display = "flex";
    } else {
      console.error("Elemento .sidebar no encontrado o no es un HTMLElement");
    }
  }

  function hiddenSideBar() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar instanceof HTMLElement) {
      sidebar.style.display = "none";
    } else {
      console.error("Elemento .sidebar no encontrado o no es un HTMLElement");
    }
  }

  return (
    <>
      <header>
        <button id="bars" onClick={handleClick}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav id="navBar">
          <ul>
            <li>
              <Link to={"#"}>Categories</Link>
            </li>
            <li>
              <Link to={"#"}>Areas</Link>
            </li>
            <li>
              <Link to={"#"}>Ingredients</Link>
            </li>
          </ul>
        </nav>
        <Link to={"/"}>
          <h1>
            allrecipes
            <span>
              <i className="fa-solid fa-spoon"></i>
            </span>
          </h1>
        </Link>
        <div className="searchContainer">
          <input
            type="text"
            name="searchFilter"
            id="searchFilter"
            placeholder="Search any recipe"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            onKeyUp={e => {
              if(e.key === "Enter"){
                document.location.href = `/search/${query}`;
              }
              }}
          />
          <Link to={`/search/${query}`}>
            <i id="buttonSearch" className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </div>
      </header>
      <nav>
        <ul className="sidebar">
          <li id="hidenSideBar" onClick={hiddenSideBar}>
            <i className="fa-solid fa-xmark"></i>
          </li>
          <li>
            <Link to={"#"}>Categories</Link>
          </li>
          <li>
            <Link to={"#"}>Areas</Link>
          </li>
          <li>
            <Link to={"#"}>Ingredients</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
