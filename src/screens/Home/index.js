import React from "react";
import Layout from "../../components/Layout";
import { Typography } from "antd";
const { Title } = Typography;

const Home = () => {
  return (
    <Layout>
      <Title>Welcome to Pocket Cookbook</Title>
      <Title level={5}>
        No need to ever put your faith in that random recipe you found online
        again. <br /> All of your most prized recipes are only a few click away.
      </Title>
    </Layout>
  );
};

export default Home;
