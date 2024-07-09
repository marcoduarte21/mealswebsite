import React, { useEffect, useState } from "react";
import { Recipes } from "./Recipes";
import { CardRecipe } from "./CardRecipe";
import FavoritesRecipes from "./FavoriteRecipes";
import { FavoriteRecipe } from "./FavoriteRecipe";
import { RecipeOfTheDay } from "./RecipeOfTheDay";
import "https://kit.fontawesome.com/9aac1473ee.js";
import { Recipe } from "../models/Recipe";
import { AxiosResponse } from "axios";
import * as apiMeals from "../api/apiMeals";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const [listRecipes, setListRecipes] = useState<Recipe[]>([]);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe>({
    idMeal: "",
    strMeal: "",
    strMealThumb: "",
  });
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(() => {
    const savedFavorites = localStorage.getItem("favoriteRecipes");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    document.title = "allrecipes";
    getListRecipes();
    getRecipeOfTheDay();
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const getListRecipes = async () => {
    try {
      const response: AxiosResponse = await apiMeals.getMealsByName("a");
      setListRecipes(response.data.meals);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecipeOfTheDay = async () => {
    try {
      const response: AxiosResponse = await apiMeals.getRecipeofTheDay();
      setRecipeOfTheDay(response.data.meals[0]);
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
    <div className="container">
      <FavoritesRecipes>
        {(favoriteRecipes.length > 0) ? 
        favoriteRecipes.map((recipe) => (
          <div className="image" key={recipe.idMeal}>
            <FavoriteRecipe
              name={recipe.strMeal}
              alt={recipe.strMeal}
              img={recipe.strMealThumb}
              id={recipe.idMeal}
            />
          </div>
        ))
      : <h3 className="warningFavorite">there's no favorites recipes yet.</h3>
      }
      
      </FavoritesRecipes>

      <RecipeOfTheDay>
        <div className="card-recipe">
          <CardRecipe
            title={recipeOfTheDay.strMeal}
            alt={recipeOfTheDay.strMeal}
            img={recipeOfTheDay.strMealThumb}
            id={recipeOfTheDay.idMeal}
            onFavoriteToggle={handleFavoriteToggle}
            isFavorite={isFavorite(recipeOfTheDay.idMeal)}
            isRecipeOfTheDay={true}
          />
        </div>
      </RecipeOfTheDay>

      <Recipes>
        {listRecipes.map((recipe) => (
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
    </div>
  );
};
