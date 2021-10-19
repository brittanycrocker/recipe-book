import React, { useState, useEffect, useMemo } from "react";
import { useFetch } from "../utils";
import Layout from "../../Layout";
import {
  Container,
  ContentContainer,
  InputContainer,
  Section,
} from "../AddRecipe/index.styles";
import { Typography, Button, Tooltip, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabase } from "../../../supabase";
import { useHistory, useLocation } from "react-router-dom";
import { Descriptions } from "antd";
import * as ROUTES from "../../../routes/constants";
const { Title, Paragraph } = Typography;

const Recipe = () => {
  const location = useLocation();
  const [recipeId, setRecipeId] = useState(location.state.recipeId);
  const [data, setData] = useState();

  const user = supabase.auth.user();

  const fetchRecipe = async () => {
    let { data: recipe, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("userId", user.id)
      .eq("id", recipeId);
    if (recipe) setData(recipe[0]);
    if (error) console.log("an error occured", error);
  };

  useEffect(() => {
    fetchRecipe();
  });

  // TODO: add option to filter recipes
  return (
    <Layout>
      <Container>
        {/* <Title>{data?.name}</Title> */}
        <RecipeContent data={data} user={user} />
      </Container>
    </Layout>
  );
};

const RecipeContent = ({ data, user }) => {
  const { name, serves, cookingTime, mealType, ingredients, directions } =
    data || {};

  const history = useHistory();

  const handleClick = () => {
    console.log(data.id);
    history.push({
      pathname: ROUTES.UPDATE_RECIPE,
      state: {
        recipeId: data.id,
      },
    });
  };

  const deleteRecipe = async () => {
    let { data: recipe, error } = await supabase
      .from("recipe")
      .delete("*")
      .eq("userId", user.id)
      .eq("id", data.id);
    if (recipe) message.info("Recipe successfully deleted");
    if (error) message.info("Error deleting recipe", error);
  };

  const handleDelete = () => {
    deleteRecipe();
  };

  const styles = {
    // border: '1px solid black',
    // padding: '5px',
    fontWeight: 600,
    borderRadius: "1%",
    color: "white",
  };

  return (
    <Container>
      <Title>{name}</Title>
      <div
        style={{ display: "flex", justifyContent: "end", paddingBottom: "5px" }}
      >
        <div style={{ padding: "5px" }}>
          <Tooltip title="update">
            <Button
              onClick={() => handleClick()}
              title="update recipe"
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size={"large"}
            />
          </Tooltip>
        </div>
        <div style={{ padding: "5px" }}>
          <Tooltip title="delete">
            <Button
              onClick={info}
              onOk={() => handleDelete()}
              title="update recipe"
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              size={"large"}
            />
          </Tooltip>
        </div>
      </div>
      <ContentContainer>
        <Section>
          <Descriptions
            labelStyle={{ background: "RGBA(0,58,140,1)", fontWeight: "600" }}
            bordered
            column={{ sm: 1, xs: 1 }}
          >
            <Descriptions.Item style={styles} label="Serves">
              {serves}
            </Descriptions.Item>
            <Descriptions.Item
              style={{ overflow: "hidden", whiteSpace: "nowrap", ...styles }}
              label="Cooking Time"
            >
              {cookingTime + " minutes"}{" "}
            </Descriptions.Item>
            <Descriptions.Item style={styles} label="Meal type">
              {mealType}
            </Descriptions.Item>
          </Descriptions>
          <Title style={{ paddingTop: "12px", ...styles }} level={4}>
            Ingredients
          </Title>
          <Paragraph level={5} style={{ whiteSpace: "pre-wrap", ...styles }}>
            <div
              style={{ border: "1px solid white", padding: "12px", ...styles }}
            >
              {ingredients}
            </div>
          </Paragraph>
        </Section>
        <Section>
          <InputContainer style={styles}>
            <Title style={styles} level={4}>
              Directions
            </Title>
            <div
              style={{ border: "1px solid white", padding: "12px", ...styles }}
            >
              {directions}
            </div>
          </InputContainer>
        </Section>
      </ContentContainer>
    </Container>
  );
};

function info() {
  Modal.info({
    title: "This is a notification message",
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

export default Recipe;
