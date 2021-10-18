import React from "react";
import { supabase } from "../../supabase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../routes/constants";
import Form from "./form";
import { Container } from "./index.styles";
import Layout from "../Layout";
import { message, Typography } from "antd";
const { Title } = Typography;

const Login = () => {
  const history = useHistory();

  const onFinish = async (email, password) => {
    let { user, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (user) {
      history.push({
        pathname: ROUTES.COLLECTION,
      });
    }
    if (error) {
      message.info("An error occured", error);
    }
  };
  return (
    <Layout>
      <Container>
        <Title level={2} style={{ paddingBottom: "20px" }}>
          Log in
        </Title>
        <Form buttonLabel="Log in" onFinish={onFinish} />
      </Container>
    </Layout>
  );
};

export default Login;
