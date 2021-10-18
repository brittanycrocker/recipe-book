import React, { useEffect } from "react";
import { supabase } from "../../supabase";

export const useFetch = () => {
  useEffect(() => {
    const userId = supabase.auth.user().id;
    if (userId) fetchRecipes(userId);
  }, []);

  const fetchRecipes = async (userId) => {
    let { data: recipe, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("userId", userId);
    if (recipe) return recipe
    if (error) return console.log(error);
  };
};

export const useFetchRecipe = async (recipeId) => {

  useEffect(() => {
    const userId = supabase.auth.user().id;
    if (userId) fetchRecipe(userId);
  }, []);

  const fetchRecipe = async () => {let { data: recipe, error } = await supabase
    .from("recipe")
    .select("*")
    .eq("userId", userId)
    .eq("id", recipeId);
  if (recipe) return recipe[0]
  if (error) console.log("an error occured", error);
  }
};
