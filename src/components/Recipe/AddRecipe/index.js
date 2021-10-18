import React, { useState } from "react";
import { supabase } from "../../../supabase";
import {
  Menu,
  Breadcrumb,
  Dropdown,
  Button,
  message,
  Typography,
  Input,
} from "antd";
import {
  Container,
  TitleContainer,
  ContentContainer,
  InputContainer,
  Section,
} from "./index.styles";
import {
  EditOutlined,
  UserOutlined,
  DownOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Layout from "../../Layout";
import { Descriptions } from "antd";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const AddRecipeContent = () => {
  //TODO: form validation
  const [name, setName] = useState("");
  const [serves, setServes] = useState("");
  let [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [mealType, setMealType] = useState("");
  let [directions, setDirections] = useState("");

  const userId = supabase.auth.user().id;

  const handleSubmit = async () => {
    let formattedIngredients = ingredients.replace(/[\r\n]{2,}/g, "\n");
    let ingredientsArr = [];
    formattedIngredients.split("\n").forEach((x) => {
      if (x !== null) {
        ingredientsArr.push(x.trim());
      }
    });

    let formattedDirections = directions.replace(/[\r\n]{2,}/g, "\n");
    let directionsArr = [];
    formattedDirections.split("\n").forEach((x) => {
      if (x !== null) {
        directionsArr.push(x.trim());
      }
    });

    setIngredients(ingredientsArr.join("\n"));
    setDirections(directionsArr.join("\n"));

    const { data, error } = await supabase
      .from("recipe")
      .insert([
        {
          name,
          userId,
          serves,
          cookingTime,
          mealType,
          ingredients,
          directions,
        },
      ]);
    if (data) {
      message.info("Recipe saved!");
      setName("");
      setServes("");
      setIngredients("");
      setCookingTime("");
      setMealType("");
      setDirections("");
    }
    if (error) message.info("Error saving recipe");
  };

  const mealTypeList = ["Breakfast", "Main", "Dessert", "Snack"];

  const menu = (
    <Menu>
      {mealTypeList.map((ele) => {
        return (
          <Menu.Item
            key={ele}
            onClick={(e) => setMealType(e.key)}
            icon={<UserOutlined />}
          >
            {ele}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const inputStyle = {
    borderRadius: "1%",
  };

  return (
    <Container>
      <Title level={2}>Add a favourite to the collection</Title>
      <div
        style={{ textAlign: "center", paddingBottom: "20px", height: "60px" }}
      >
        <Title editable={{ onChange: setName }}>{name}</Title>
      </div>
      <div>
        <ContentContainer>
          <Section>
            <InputContainer>
              <Input
                addonBefore={<UserOutlined className="site-form-item-icon" />}
                placeholder="servings"
                value={serves}
                style={inputStyle}
                onChange={(e) => setServes(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                addonBefore={<ClockCircleOutlined />}
                placeholder="cooking time (minutes)"
                value={cookingTime}
                style={inputStyle}
                onChange={(e) => setCookingTime(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Dropdown.Button overlay={menu}>
                {mealType || "meal type"}
              </Dropdown.Button>
            </InputContainer>
            <InputContainer>
              <Title level={4} style={{ color: "white" }}>
                Ingredients List
              </Title>
              <TextArea
                rows={11}
                value={ingredients}
                style={{ ...inputStyle }}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </InputContainer>
          </Section>
          <Section>
            <InputContainer style={{}}>
              <Title level={3} style={{ color: "white", ...inputStyle }}>
                Directions
              </Title>
            </InputContainer>
            <InputContainer>
              <TextArea
                rows={16}
                value={directions}
                style={{ borderRadius: "1%" }}
                onChange={(e) => setDirections(e.target.value)}
              />
            </InputContainer>
          </Section>
        </ContentContainer>
        <div
          style={{ display: "flex", justifyContent: "end", padding: "10px" }}
        >
          <Button type="primary" size="large" onClick={handleSubmit}>
            Save recipe
          </Button>
        </div>
      </div>
    </Container>
  );
};

const AddRecipe = () => {
  return (
    <Layout>
      <Container>
        <AddRecipeContent />
      </Container>
    </Layout>
  );
};

export default AddRecipe;
