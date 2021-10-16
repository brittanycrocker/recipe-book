import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { Container, TitleInput, ContentContainer, InputContainer, Section } from './index.styles'
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
const { Header, Content, Footer } = Layout;
const { TextArea } = Input
const { Title } = Typography

const AddRecipeContent = () => {
    const [serves, setServes] = useState()
    const [ingredients, setIngredients] = useState()
    const [cookingTime, setCookingTime] = useState()
    const [mealType, setMealType] = useState()
    const [directions, setDirections] = useState()

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
      function handleMenuClick(e) {
          setMealType(e.target.value)
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
                        value={serves}
                        onChange={(e) => setServes(e.target.value)}
                    />
                    </InputContainer>
                    <InputContainer>
                        <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder='cooking time'
                        value={cookingTime}
                        onChange={(e) => setCookingTime(e.target.value)}
                        />
                        </InputContainer>
                    <InputContainer>
                        <Dropdown.Button 
                        onClick={handleButtonClick} 
                        overlay={menu}>Dropdown
                        </Dropdown.Button>
                    </InputContainer>
                    <InputContainer>
                    <Title 
                        level={4}>
                            Ingredients List
                        </Title>
                        <TextArea 
                        rows={11} 
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}/>
                    </InputContainer>
                </Section>
                <Section>
                    <InputContainer style={{}}><Title level={4}>Directions</Title></InputContainer>
                    <InputContainer>
                        <TextArea rows={16} value={directions}
                        onChange={(e) => setDirections(e.target.value)}/>
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