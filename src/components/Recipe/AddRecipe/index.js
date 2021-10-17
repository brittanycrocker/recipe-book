import React, { useState } from 'react';
import { supabase } from '../../../supabase'
import { Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { Container, TitleContainer, ContentContainer, InputContainer, Section } from './index.styles'
import { EditOutlined, UserOutlined, DownOutlined, ClockCircleOutlined } from '@ant-design/icons'
import Layout from '../../Layout'
import { Descriptions } from 'antd';
const { Header, Content, Footer } = Layout
const { TextArea } = Input
const { Title } = Typography

const AddRecipeContent = () => {

    //TODO: form validation
    const [name, setName] = useState('')
    const [serves, setServes] = useState('')
    let [ingredients, setIngredients] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [mealType, setMealType] = useState('')
    let [directions, setDirections] = useState('')


     const userId = localStorage.getItem('userId')

      const handleSubmit = async () => {
          // directions = `Process almonds in a food processor for 40 seconds or until very finely chopped. Add apricots, natural muesli, honey and ground cinnamon. Process for 30-40 seconds or until almost smooth and well combined.
          // Place sesame seeds on a plate. Roll 2-tablespoon portions of almond mixture into balls. Roll in sesame seeds to evenly coat. Place on a lined tray in the fridge for 1 hour or until set. Store in an airtight container in the fridge for up to 2 weeks.`
        
          // ingredients = `150g pkt Coles Australian Almonds

          // 1 cup (150g) Coles Dried Turkish Apricots
          
          // 1 cup (110g) natural muesli
          
          // 2 tbsp honey
          
          // 1 tsp ground cinnamon
          
          // 2 tbsp sesame seeds`
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
        if (data) message.info('Recipe saved!')
        if (error) message.info('Error saving recipe')
          console.log('payload', {serves, cookingTime, mealType, ingredients, directions},{ ingredients: ingredients.trim()})
      }

      const mealTypeList = ['Breakfast', 'Main', 'Dessert', 'Snack']

    const menu = (
        <Menu>
          {mealTypeList.map((ele) => {
            return (
              <Menu.Item key={ele} onClick={(e) => setMealType(e.key)} icon={<UserOutlined />}>
                {ele}
              </Menu.Item>
            )
          })}
        </Menu>
      );

      const inputStyle = {
        borderRadius: '1%'
      }


    return (
        <Container>
            <div style={{textAlign: 'center'}}>
                <Title editable={{ onChange: setName }}>{name}</Title>
             </div>
             <div>
            <ContentContainer>
                <Section>
                    <InputContainer>
                    <Input
                        addonBefore={<UserOutlined className="site-form-item-icon" />}
                        placeholder='servings'
                        value={serves}
                        style={inputStyle}
                        onChange={(e) => setServes(e.target.value)}
                    />
                    </InputContainer>
                    <InputContainer>
                        <Input
                        addonBefore={<ClockCircleOutlined />}
                        placeholder='cooking time (minutes)'
                        value={cookingTime}
                        style={inputStyle}
                        onChange={(e) => setCookingTime(e.target.value)}
                        />
                        </InputContainer>
                    <InputContainer>
                        <Dropdown.Button 
                        onClick={() => console.log('clicked')} 
                        overlay={menu}>{mealType || 'meal type'}
                        </Dropdown.Button>
                    </InputContainer>
                    <InputContainer>
                    <Title
                        level={4}
                        style={{color: 'white'}}
                        >
                            Ingredients List
                        </Title>
                        <TextArea 
                        rows={11} 
                        value={ingredients}
                        style={{color: 'white', ...inputStyle}}
                        onChange={(e) => setIngredients(e.target.value)}/>
                    </InputContainer>
                </Section>
                <Section>
                    <InputContainer style={{}}><Title level={3} style={{color: 'white', ...inputStyle}}>Directions</Title></InputContainer>
                    <InputContainer>
                        <TextArea rows={16} value={directions} style={{borderRadius: '1%'}}
                        onChange={(e) => setDirections(e.target.value)}/>
                    </InputContainer> 
                </Section>
            </ContentContainer>
            <div style={{display: 'flex', justifyContent: 'end', padding: '10px'}}>
                <Button type="primary" size='large' onClick={handleSubmit}>Save recipe</Button>
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