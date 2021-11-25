import React, { useState, useEffect, useMemo } from "react";
import { fetchRecipes } from "../utils";
import { supabase } from "../../../supabase";
import Table from "./table";
import Layout from "../../Layout";
import { Typography } from "antd";
const { Title } = Typography;

const Collection = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const userId = supabase.auth.user().id;
    if (userId) fetchRecipes(userId);
  }, []);

  const fetchRecipes = async (userId) => {
    let { data: recipes, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("userId", userId);
    if (recipes) setData(recipes);
    if (error) return console.log(error);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "Meal Type",
        accessor: "mealType",
      },
      {
        Header: "Serves",
        accessor: "serves",
      },
      {
        Header: "Cooking Time",
        accessor: "cookingTime",
      },
    ],
    []
  );

  return (
    <Layout>
      <Title level={2} style={{ paddingBottom: "20px" }}>
        Your Collection
      </Title>
      {data ? <Table columns={columns} data={data} /> : <div>Loading</div>}
    </Layout>
  );
};

export default Collection;
