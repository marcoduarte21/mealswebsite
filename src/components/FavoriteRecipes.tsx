import React from "react";

export default function FavoritesRecipes({ children }: any) {
  return (
    <section>
      <div className="favoritesRecipes">
        <h3 className="titleContainers" id="titleFavorites">
          <i className="fa-solid fa-star"></i> Favorite recipes
        </h3>
        <div className="container-favorites">
          <div className="arrows" id="arrowLeft"></div>
          {children}
          <div className="arrows" id="arrowRight"></div>
        </div>
      </div>
    </section>
  );
}
