import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

interface CardRecipeProps {
  img: string;
  alt: string;
  title: string;
  id: string;
  onFavoriteToggle: (id: string, title: string, img: string) => void;
  isFavorite: boolean;
  isRecipeOfTheDay: boolean;
}

export const CardRecipe: React.FC<CardRecipeProps> = ({
  img,
  alt,
  title,
  id,
  onFavoriteToggle,
  isFavorite,
  isRecipeOfTheDay,
}) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onFavoriteToggle(id, title, img);
    if (e.target.className === "fa-star fa-regular") {
      swal("Recipe saved as favorite!", `${title}`, "success");
    } else {
      swal("Recipe removed as favorite!", `${title}`, "success");
    }
  };

  return (
    <Link to={`/recipe/${id}`}>
      <div className="containerImage">
        {isRecipeOfTheDay && <h4 id="titleRecipe">recipe of the day</h4>}
        <img src={img} alt={alt} />
      </div>
      <div className="description">
        <h3>{title}</h3>
        <i
          onClick={handleClick}
          className={`fa-star ${isFavorite ? "fa-solid" : "fa-regular"}`}
        ></i>
      </div>
    </Link>
  );
};
