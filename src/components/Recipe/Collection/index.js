import React, { useState, useEffect, useMemo } from "react";
import { supabase } from "../../../supabase";
import { useHistory } from "react-router-dom";
import { useFetchRecipes } from '../utils'
import { useTable } from "react-table";
import Table from "./table";
import Layout from "../../Layout";
import { Typography } from "antd";
const { Title } = Typography;

const Collection = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const recipes = useFetchRecipes
    setData(recipes)
  }, []);



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
