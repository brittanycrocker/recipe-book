import React, { useState } from 'react';
import { supabase } from '../../../supabase'
import { Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { Container, TitleInput, ContentContainer, InputContainer, Section } from './index.styles'
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
import Layout from '../../Layout'
const { Header, Content, Footer } = Layout
const { TextArea } = Input
const { Title } = Typography

const AddRecipeContent = () => {

    //TODO: form validation
    const [name, setName] = useState()
    const [serves, setServes] = useState(12)
    let [ingredients, setIngredients] = useState()
    const [cookingTime, setCookingTime] = useState(30)
    const [mealType, setMealType] = useState('Snack')
    let [directions, setDirections] = useState()

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
      function handleMenuClick(e) {
          setMealType(e.key)
        message.info('Click on menu item.');
        console.log('click', e.key);
      }

     const userId = localStorage.getItem('userId')

      const handleSubmit = async () => {
          directions = `Process almonds in a food processor for 40 seconds or until very finely chopped. Add apricots, natural muesli, honey and ground cinnamon. Process for 30-40 seconds or until almost smooth and well combined.
          Place sesame seeds on a plate. Roll 2-tablespoon portions of almond mixture into balls. Roll in sesame seeds to evenly coat. Place on a lined tray in the fridge for 1 hour or until set. Store in an airtight container in the fridge for up to 2 weeks.`
        
          ingredients = `150g pkt Coles Australian Almonds

          1 cup (150g) Coles Dried Turkish Apricots
          
          1 cup (110g) natural muesli
          
          2 tbsp honey
          
          1 tsp ground cinnamon
          
          2 tbsp sesame seeds`
        //   ingredients = ingredients.replace(/[\r\n]{2,}/g, "\n")
        //   directions = directions.replace(/[\r\n]{2,}/g, "\n")
        // ingredients.split('\n')
        // let newIngredients = []
        // ingredients.split('\n').forEach((x) => {
        //     x.trim()
        // if (x !== null) {
        //     console.log(x)
        //     newIngredients.push(x.trim())}
        // }
      
        // )
       
        


          
   
          const { data, error } = await supabase
        .from('recipe')
        .insert([
            { name, userId, serves, cookingTime, mealType, ingredients, directions }
        ])
        if (data) console.log('data', data)
        if (error) console.log('error', error)
          console.log('payload', {serves, cookingTime, mealType, ingredients, directions},{ ingredients: ingredients.trim()})
      }


    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="Breakfast" icon={<UserOutlined />}>
            Breakfast
          </Menu.Item>
          <Menu.Item key="Main" icon={<UserOutlined />}>
            Main
          </Menu.Item>
          <Menu.Item key="Dessert" icon={<UserOutlined />}>
            Dessert
          </Menu.Item>
          <Menu.Item key="Snack" icon={<UserOutlined />}>
            Snack
          </Menu.Item>
        </Menu>
      );


    return (
        <Container>
            <div style={{textAlign: 'center'}}>
                <Title><TitleInput placeholder='add name' onChange={(e) => setName(e.target.value)} /><EditOutlined twoToneColor="#eb2f96"/></Title>
             </div>
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
                <Button type="primary" onClick={handleSubmit}>Primary Button</Button>
            </div>
            </div>
        </Container>
    );
};


const AddRecipe = () => { 
    return (
      <Layout>
       <Container>
            <AddRecipeContent />
       </Container>
       </Layout>
    )
}



export default AddRecipe;