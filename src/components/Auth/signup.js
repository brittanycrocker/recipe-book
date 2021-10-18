import React from "react";
import { supabase } from "../../supabase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../routes/constants";
import Form from "./form";
import { Container } from "./index.styles";
import Layout from "../Layout";
import { message, Typography } from "antd";
const { Title } = Typography;

const Signup = () => {
  const onFinish = async (email, password) => {
    let { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (user) {
      message.info("Sign up successful! Confirm your email");
    }
    if (error) {
      message.info("An error occured", error);
    }
  };
  return (
    <Layout>
      <Container>
        <Title level={2} style={{ paddingBottom: "20px" }}>
          Join Pocket Cookbook so your most treasured recipes are always only a
          few clicks away.
        </Title>
        <Form buttonLabel="Sign up" onFinish={onFinish} />
      </Container>
    </Layout>
  );
};

export default Signup;
