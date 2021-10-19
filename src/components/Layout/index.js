import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import { Menu, Layout, Button, Tooltip } from "antd";
import { MailOutlined, SettingOutlined, LeftOutlined,  } from "@ant-design/icons";
import * as ROUTES from "../../routes/constants";
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

const ScreenLayout = ({ children }) => {
  // TODO: set inital route to loction.param
  const [route, setRoute] = useState();
  const [user, setUser] = useState();
  const [viewport, setViewport] = useState();

  useEffect(() => {
    setViewport(document.documentElement.clientWidth);
  }, []);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setUser(supabase.auth.user());
    return () => {};
  }, []);

  useEffect(() => {
    setRoute(location.pathname);
  }, [location]);

  const handleClick = (e) => {
    history.push({
      pathname: `${e.key}`,
    });
  };

  // to do, loggedin menu, logged outmenu

  const withUser = [
    {
      display: "Home",
      route: ROUTES.HOME,
    },
    {
      display: "Collection",
      route: ROUTES.COLLECTION,
    },
    {
      display: "Add Recipe",
      route: ROUTES.CREATE_RECIPE,
    },
  ];

  const withoutUser = [
    {
      display: "Home",
      route: ROUTES.HOME,
    },
  ];

  let contentStyle = {};

  if (viewport > 900) {
    let constentStyle = {
      minHeight: "1024px",
    };
  }

  return (
    <Layout>
      <Header style={{ background: "white" }}>
        <div
          style={{ float: "left", cursor: "pointer" }}
          onClick={() => history.push(ROUTES.HOME)}
        >
          Pocket Cookbook
        </div>
        <Menu onClick={handleClick} selectedKeys={[route]} mode="horizontal">
          {user
            ? Object.values(withUser).map((ele) => {
                return (
                  <Menu.Item key={ele.route} icon={<MailOutlined />}>
                    {ele.display}
                  </Menu.Item>
                );
              })
            : Object.values(withoutUser).map((ele) => {
                return (
                  <>
                    <Menu.Item key={ele.route} icon={<MailOutlined />}>
                      {ele.display}
                    </Menu.Item>
                  </>
                );
              })}
          <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Account">
            {user ? (
              <Menu.Item
                onClick={() => {
                  supabase.auth.signOut();
                  history.push("/");
                }}
              >
                Logout
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key={ROUTES.LOGIN}>Login</Menu.Item>
                <Menu.Item key={ROUTES.SIGN_UP}>Sign up</Menu.Item>
              </>
            )}
          </SubMenu>
        </Menu>
      </Header>
      <Content
        style={{ padding: "50px 50px", minHeight: "500px", ...contentStyle }}
      >
        <Tooltip title="back">
      <Button onClick={() => history.goBack()} shape="circle" icon={<LeftOutlined />} size="large" />
    </Tooltip>
        <div>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Created by Brittany Crocker
      </Footer>
    </Layout>
  );
};

export default ScreenLayout;
