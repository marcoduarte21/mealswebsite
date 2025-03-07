import React, { useEffect, useState } from "react";
import "./SearchView.css";
import { Recipes } from "../../components/Recipes";
import { CardRecipe } from "../../components/CardRecipe";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import * as apiMeals from "../../api/apiMeals";
import { Recipe } from "../../models/Recipe";

interface SearchViewProps {}

export const SearchView: React.FC<SearchViewProps> = () => {
  
  const { query } = useParams();
  const [RecipesByQuery, setRecipesByQuery] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  useEffect(() => {
    getRecipesByQuery(query!);
  }, [query]);

  const getRecipesByQuery = async (query: string) => {
    try {
      const response: AxiosResponse = await apiMeals.getMealsByName(query!);
      if(response){
      setRecipesByQuery(response.data.meals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoriteToggle = (id: string, title: string, img: string) => {
    setFavoriteRecipes((prevFavorites) => {
      const isFavorite = prevFavorites.some((recipe) => recipe.idMeal === id);
      if (isFavorite) {
        return prevFavorites.filter((recipe) => recipe.idMeal !== id);
      } else {
        return [
          { idMeal: id, strMeal: title, strMealThumb: img },
          ...prevFavorites,
        ];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favoriteRecipes.some((recipe) => recipe.idMeal === id);
  };

  return (
    <>
      <div className="searchResults container">
        {(RecipesByQuery) && 
          <h2 className="searchTitle">
            Results for "{query}" ({RecipesByQuery?.length} recipes)
          </h2>
        }

        {(RecipesByQuery) ? (
          <Recipes>
            {RecipesByQuery.map((recipe) => (
              <div className="card-recipe" key={recipe.idMeal}>
                <CardRecipe
                  title={recipe.strMeal}
                  alt={recipe.strMeal}
                  img={recipe.strMealThumb}
                  id={recipe.idMeal}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={isFavorite(recipe.idMeal)}
                  isRecipeOfTheDay={false}
                />
              </div>
            ))}
          </Recipes>
        ) : (
          <p className="warning">There's no recipes that match with "{query}"</p>
        )}
      </div>
    </>
  );
};
