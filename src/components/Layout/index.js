import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Nav from './nav'
const { Header, Content, Footer } = Layout;

const ScreenLayout = ({children}) => {
    return (
        <Layout>
        <Header>
          <div />
          <Nav />
        </Header>
        <Content style={{ padding: '50px 50px' }}>
          <div>{children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Brittany Crocker</Footer>
      </Layout>
    );
};

export default ScreenLayout;