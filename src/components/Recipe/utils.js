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
    if (recipe) console.log("recipe", recipe);
    if (error) return console.log(error);
  };
};
