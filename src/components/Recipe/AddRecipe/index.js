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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "360px",
        overflow: "auto",
      }}
    >
      {[...Array(totalNoFields)].map((ele, i) => {
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
              value={ele}
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

const AddRecipeContent = () => {
  //TODO: form validation
  const [name, setName] = useState("");
  const [serves, setServes] = useState("");
  let [ingredients, setIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [mealType, setMealType] = useState("");
  let [directions, setDirections] = useState([""]);
  const [totalNoFields, setTotalNoFields] = useState(4);

  const userId = supabase.auth.user().id;

  const formatRecipe = () => {
    let formattedIngredients = ingredients.replace(/[\r\n]{2,}/g, "\n");
    let ingredientsArr = [];
    formattedIngredients.split("\n").forEach((x) => {
      if (x !== null) {
        ingredientsArr.push(x.trim());
      }
    });
    // let formattedDirections = Object.values(directions).map((x) => {
    //   x.replace(/[\r\n]{2,}/g, "\n");
    // });
    // let directionsArr = [];
    // formattedDirections.split("\n").forEach((x) => {
    //   if (x !== null) {
    //     directionsArr.push(x.trim());
    //   }
    // });
    setIngredients(ingredientsArr.join("\n"));
    setDirections(directions);
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
      setName("");
      setServes("");
      setIngredients("");
      setCookingTime("");
      setMealType("");
      setDirections("");
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
            <InputContainer style={{ maxHeight: "290px", overflow: "auto" }}>
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
            <DirectionFields
              setTotalNoFields={setTotalNoFields}
              totalNoFields={totalNoFields}
              setDirections={setDirections}
              value={directions}
            />
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
