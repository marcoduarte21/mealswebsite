import { Link } from "react-router-dom";

interface FavoriteRecipeProps {
  alt: string;
  img: string;
  name: string;
  id: string;
}

export const FavoriteRecipe: React.FC<FavoriteRecipeProps> = ({
  alt,
  img,
  name,
  id,
}) => {
  return (
    <Link to={`/recipe/${id}`}>
      <img src={img} alt={alt} />
      <h6>{name}</h6>
    </Link>
  );
};
