import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
  ContentContainer,
  InputContainer,
  Section,
} from "./index.styles";
import {
  EditOutlined,
  UserOutlined,
  DownOutlined,
  ClockCircleOutlined,
  NumberOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "../../Layout";
import { Descriptions, Tooltip } from "antd";
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const DirectionFields = ({
  value,
  setDirections,
  totalNoFields,
  setTotalNoFields,
}) => {
  console.log("value");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "360px",
        overflow: "auto",
      }}
    >
      {[...Array(totalNoFields || Object.keys(value).length)].map((ele, i) => {
        return (
          <InputContainer
            style={{
              display: "flex",
              flexBasis: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "2px",
            }}
          >
            <NumberOutlined
              fontSize={12}
              style={{ fontSize: "24px", padding: "2px 12px 0 0" }}
            />
            <TextArea
              key={i}
              addonBefore={<ClockCircleOutlined />}
              rows={1}
              value={value && Object.values(value)[i]}
              style={{ borderRadius: "1%" }}
              onChange={(e) => {
                setDirections({ ...value, [i]: e.target.value });
              }}
            />
          </InputContainer>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "12px",
        }}
      >
        <Tooltip title="add field">
          <Button
            onClick={() => setTotalNoFields(parseInt(totalNoFields + 1))}
            type="primary"
            shape="circle"
            size={"large"}
            style={{ margin: "6px" }}
            icon={
              <PlusCircleOutlined
                fontSize={45}
                style={{
                  fontSize: "28px",
                }}
              />
            }
          />
        </Tooltip>
        <Tooltip title="remove field">
          <Button
            onClick={() => setTotalNoFields(parseInt(totalNoFields - 1))}
            title="update recipe"
            type="primary"
            shape="circle"
            size={"large"}
            style={{ margin: "6px" }}
            icon={
              <DeleteOutlined
                style={{
                  fontSize: "28px",
                }}
              />
            }
          />
        </Tooltip>
      </div>
    </div>
  );
};

const UpdateRecipeContent = ({ data }) => {
  //TODO: form validation

  let { serves, name, mealType, ingredients, cookingTime, directions } =
    data || {};

  const [state, setState] = useState({
    serves,
    name,
    mealType,
    ingredients,
    cookingTime,
    directions,
  });
  const [totalNoFields, setTotalNoFields] = useState();

  const userId = supabase.auth.user().id;

  const formatRecipe = () => {
    let formattedIngredients = ingredients.replace(/[\r\n]{2,}/g, "\n");
    let ingredientsArr = [];
    formattedIngredients.split("\n").forEach((x) => {
      if (x !== null) {
        ingredientsArr.push(x.trim());
      }
    });
    setState({ ...state, ingredients: ingredientsArr.join("\n") });
  };

  const saveRecipe = async () => {
    const { data, error } = await supabase.from("recipe").insert([
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
      setState(data);
    }
    if (error) message.info("Error saving recipe");
  };

  const handleSubmit = () => {
    formatRecipe();
    saveRecipe();
  };

  const mealTypeList = ["Breakfast", "Main", "Dessert", "Snack"];

  const menu = (
    <Menu>
      {mealTypeList.map((ele) => {
        return (
          <Menu.Item
            key={ele}
            onClick={(e) => setState({ ...state, mealType: e.target.value })}
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

  return state ? (
    <Container>
      <Title level={2}>Update Recipe</Title>
      <div
        style={{ textAlign: "center", paddingBottom: "20px", height: "60px" }}
      >
        <Title
          editable={{
            onChange: (e) => setState({ ...state, name: e.target.value }),
          }}
        >
          {name}
        </Title>
      </div>
      <div>
        <ContentContainer>
          <Section>
            <InputContainer>
              <Input
                addonBefore={<UserOutlined className="site-form-item-icon" />}
                placeholder="servings"
                value={serves || serves}
                style={inputStyle}
                onChange={(e) => setState({ ...state, serves: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Input
                addonBefore={<ClockCircleOutlined />}
                placeholder="cooking time in minutes"
                value={cookingTime || cookingTime}
                style={inputStyle}
                onChange={(e) =>
                  setState({ ...state, cookingTime: e.target.value })
                }
              />
            </InputContainer>
            <InputContainer>
              <Dropdown.Button overlay={menu}>{"meal type"}</Dropdown.Button>
            </InputContainer>
            <InputContainer>
              <Title level={4} style={{ color: "white" }}>
                Ingredients List
              </Title>
              <TextArea
                rows={11}
                value={ingredients || ingredients}
                style={{ ...inputStyle }}
                onChange={(e) =>
                  setState({ ...state, ingredients: e.target.value })
                }
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
              <DirectionFields
                setTotalNoFields={setTotalNoFields}
                totalNoFields={totalNoFields}
                setDirections={setState}
                value={directions}
              />
            </InputContainer>
          </Section>
        </ContentContainer>
        <div
          style={{ display: "flex", justifyContent: "end", padding: "10px" }}
        >
          <Button type="primary" size="large" onClick={handleSubmit}>
            Update Recipe
          </Button>
        </div>
      </div>
    </Container>
  ) : (
    <></>
  );
};

const UpdateRecipe = () => {
  const location = useLocation();
  const [recipeId, setRecipeId] = useState(location.state.recipeId);
  const [data, setdata] = useState();
  const user = supabase.auth.user();

  const fetchRecipe = async () => {
    let { data: recipe, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("userId", user.id)
      .eq("id", recipeId);
    if (recipe) setdata(recipe[0]);
    if (error) console.log("an error occured", error);
  };

  useEffect(() => {
    fetchRecipe();
  });

  return (
    <Layout>
      <Container>
        <UpdateRecipeContent data={data} />
      </Container>
    </Layout>
  );
};

export default UpdateRecipe;
