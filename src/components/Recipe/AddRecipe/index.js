import React from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { Container, TitleInput, ContentContainer, InputContainer, Section } from './index.styles'
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
const { Header, Content, Footer } = Layout;
const { TextArea } = Input
const { Title } = Typography

const AddRecipeContent = () => {

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
      function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Breakfast
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Main
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Dessert
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Snack
          </Menu.Item>
        </Menu>
      );
    return (
        <div>
            <ContentContainer>
                <Section>
                    <InputContainer>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder='serves'
                    />
                    </InputContainer>
                    <InputContainer>
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder='cooking time'
                        />
                        </InputContainer>
                    <InputContainer>
                        <Dropdown.Button 
                        onClick={handleButtonClick} 
                        overlay={menu}>Dropdown
                        </Dropdown.Button>
                    </InputContainer>
                    <InputContainer>
                    <Title level={4}>Ingredients List</Title>
                        <TextArea rows={11} />
                    </InputContainer>
                </Section>
                <Section>
                    <InputContainer style={{}}><Title level={4}>Directions</Title></InputContainer>
                    <InputContainer>
                        <TextArea rows={16} />
                    </InputContainer> 
                </Section>
            </ContentContainer>
            <div style={{display: 'flex', justifyContent: 'end', padding: '10px'}}>
                <Button type="primary">Primary Button</Button>
            </div>
        </div>
    );
};


const AddRecipe = () => {
    // handleChange 
    return (
       <Container>
            <Title><TitleInput placeholder='add name' /><EditOutlined twoToneColor="#eb2f96"/></Title>
            <AddRecipeContent />
       </Container>
    )
}



export default AddRecipe;