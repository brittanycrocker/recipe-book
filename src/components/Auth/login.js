import React, { useState } from "react";
import { supabase } from "../../supabase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../routes/constants";
import Form from "./form";
import { Container } from "./index.styles";
import Layout from "../Layout";
import { message, Typography, Alert } from "antd";
const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState();
  const [errorMsg, setErrMsg] = useState();
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
      setError(true);
      setErrMsg("An error occured", error);
    }
  };
  return (
    <Layout>
      <Container>
        <Title level={2} style={{ paddingBottom: "20px" }}>
          Log in
        </Title>
        {error && (
          <Alert
            css={{ paddingBottom: "5px" }}
            message={errorMsg}
            type="warning"
            closable
            onClose={() => setError(false)}
          />
        )}
        <Form buttonLabel="Log in" onFinish={onFinish} />
      </Container>
    </Layout>
  );
};

export default Login;
