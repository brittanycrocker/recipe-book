import React, { useState, useEffect } from 'react'
import { useHistory, useLocation  } from "react-router-dom"
import { supabase } from '../../supabase'
import { Menu, Space } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import * as ROUTES from '../../routes/constants'
const { SubMenu } = Menu;


const Nav = () => {
    // TODO: set inital route to loction.param
    const [route, setRoute] = useState()
    const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'))

    const history = useHistory()
    const location = useLocation()

    console.log('location', location)

    // useEffect(() => {
    //     history.push({
    //         pathname: `/collection`,
    //     });
    // }, [setRoute, history, route])

    const handleClick = (e) => {
      history.push({
        pathname: `${e.key}`,
    });
    }

    // to do, loggedin menu, logged outmenu

    const withUser = [
      {
        display: 'Home',
        route: ROUTES.LANDING
      },
      {
        display: 'Collection',
        route: ROUTES.COLLECTION
      },
      {
        display: 'Add Recipe',
        route: ROUTES.CREATE_RECIPE
      }
    ]

    const withoutUser = [
      {
        display: 'Home',
        route: ROUTES.HOME
      }
    ]


    return (
        <Menu onClick={handleClick} selectedKeys={[route]} mode="horizontal">
          {/* <div> */}
          {user 
          ? Object.values(withUser).map((ele) => {
            return (
              <Menu.Item key={ele.route} icon={<MailOutlined />}>
              {ele.display}
            </Menu.Item>
            )
 
          })
          : Object.values(withoutUser).map((ele) => {
              return (
                <>
                <Menu.Item key={ele.route} icon={<MailOutlined />}>
                {ele.display}
              </Menu.Item>
            </>
              )
          })
        }
         <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Account">
                {user ?  <Menu.Item onClick={() => {supabase.auth.signOut(); history.push('/')}} key={ROUTES.LANDING}>Logout</Menu.Item>
                      : ( <><Menu.Item key={ROUTES.LOGIN}>Login</Menu.Item>
                          <Menu.Item key={ROUTES.SIGN_UP}>Sign up</Menu.Item></> )  
                }
          </SubMenu>
      </Menu>
    );
};

export default Nav;