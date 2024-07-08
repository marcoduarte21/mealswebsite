import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import * as apiMeals from "../../api/apiMeals";
import { Recipe } from "../../models/Recipe";
import "./DetailsRecipe.css"

interface DetailsRecipeProps {}

export const DetailsRecipe: React.FC<DetailsRecipeProps> = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState<Recipe>({
    idMeal: "",
    strMeal: "",
    strMealThumb: "",
  });

  useEffect(() => {
    if (id) {
      getMealById(id);
    }
  }, [id]);

  const getMealById = async (id: string) => {
    try {
      const response: AxiosResponse = await apiMeals.getRecipeById(id);
      if (response) {
        setMeal(response.data.meals[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ListaDeInstrucciones = (texto: string | undefined) => {
    if (!texto) return null; // Verificar que el texto no sea undefined
    const arrayDeTexto = texto.split(".");
    const arraySize = Math.round(arrayDeTexto.length / 2);
  
    return arrayDeTexto.slice(0, arraySize).map((item, index) => (
      <p key={index}>
        <strong>Step {index + 1}:</strong> {item}.
      </p>
    ));
  };
  
  const ListaDeInstrucciones2 = (texto: string | undefined) => {
    if (!texto) return null; // Verificar que el texto no sea undefined
    const arrayDeTexto = texto.split(".");
    const arraySize = Math.round(arrayDeTexto.length / 2);
    const startIndex = arraySize;
  
    return arrayDeTexto.slice(startIndex).map((item, index) => (
      <p key={index + startIndex}>
        <strong>Step {index + startIndex + 1}:</strong> {item}.
      </p>
    ));
  };
  

  const ListIngredients = (meal: any) => {
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient: ingredient, measure: measure });
      }
    }

    return ingredients;
  };

  const getListIngredients = (ingredients: any[]) => {
    const rows = [];
    for (let i = 0; i < ingredients.length; i += 3) {
      rows.push(
        <tr key={i}>
          {ingredients.slice(i, i + 3).map((ing, j) => (
            <td key={j}>
              <img
                src={`https://www.themealdb.com/images/ingredients/${ing.ingredient}-Small.png`}
                alt={ing.ingredient}
              />
              <p>
                {ing.measure} {ing.ingredient}
              </p>
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  const generarURLYoutube = (url: string | undefined) => {
    if (!url) return ""; // Verificar que la URL no sea undefined
    const youtubeId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${youtubeId}`;
  };

  return (
    <div className="container">
      <Link to={"/"} id="buttonBackHome">
        Back home
      </Link>
      <div className="containerDetails">
        <div className="receta">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <h1>{meal.strMeal}</h1>
        </div>
        <div className="ingredientes">
          <h2>Ingredientes</h2>
          <table>
            <tbody>{getListIngredients(ListIngredients(meal))}</tbody>
          </table>
        </div>
        {meal.strInstructions && (
          <div className="instruccions">
            <h2>Instrucciones de la receta</h2>
            <div className="ListOfInstructions">
              <div className="instructions2">
                {ListaDeInstrucciones(meal.strInstructions)}
              </div>
              <div className="instructions2">
                {ListaDeInstrucciones2(meal.strInstructions)}
              </div>
            </div>
          </div>
        )}
        {meal.strYoutube && (
          <div className="containerYoutube">
            <iframe
              width="560"
              height="315"
              src={generarURLYoutube(meal.strYoutube)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
  
};
