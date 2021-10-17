import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Nav from './nav'
const { Header, Content, Footer } = Layout;

const ScreenLayout = ({children}) => {
    return (
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Nav />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Brittany Crocker</Footer>
      </Layout>
    );
};

export default ScreenLayout;