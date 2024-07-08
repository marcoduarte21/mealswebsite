import axios from "axios";
import {Recipe} from "../models/Recipe";

const API = 'https://www.themealdb.com/api/json/v1/1/';


export const getMealsByName = async(letter: string) => {

    return axios.get<Recipe []>(`${API}search.php?s=${letter}`);
}

export const getRecipeofTheDay = async() =>{

    return axios.get<Recipe>(`${API}random.php`);
}

export const getRecipeById = async(id: string) =>{
    return axios.get<Recipe>(`${API}lookup.php?i=${id}`)
}