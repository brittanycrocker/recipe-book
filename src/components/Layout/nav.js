import React, { useState, useEffect } from 'react'
import { useHistory, useLocation  } from "react-router-dom"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import * as ROUTES from '../../routes/constants'
const { SubMenu } = Menu;


const Nav = () => {
    // TODO: set inital route to loction.param
    const [route, setRoute] = useState()

    const history = useHistory()
    // const location = useLocation()

    // console.log('location', location)

    useEffect(() => {
        // history.push({
        //     pathname: `/${route}`,
        //     // search: '?query=abc',
        // });
    }, [setRoute])

    const handleClick = (e) => {
        setRoute(e.key)
    }

    // to do, loggedin menu, logged outmenu
    return (
        <Menu onClick={handleClick} selectedKeys={[route]} mode="horizontal">
        <Menu.Item key={ROUTES.HOME} icon={<MailOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key={ROUTES.COLLECTION} icon={<AppstoreOutlined />}>
          Collection
        </Menu.Item>
        <Menu.Item key={ROUTES.CERATE_RECIPE} icon={<AppstoreOutlined />}>
          Add Recipe
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Account">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
    );
};

export default Nav;