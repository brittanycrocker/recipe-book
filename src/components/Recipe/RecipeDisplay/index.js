import React, { useState, useEffect } from 'react';
import { useFetch } from '../utils'
import { Container, TitleInput, ContentContainer, InputContainer, Section } from '../AddRecipe/index.styles'
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
import {supabase} from '../../../supabase'
const { Title } = Typography

const Collection = () => {
    // TODO: add option to filter recipes
    return (
        <div>
            <Container>
            <Title></Title>
            <CollectionContent />
       </Container>
        </div>
    );
};


const CollectionContent = () => {
    const [name, setName] = useState()
    const[serves, setServes] = useState()
    let [ingredients, setIngredients] = useState()
    const [cookingTime, setCookingTime] = useState()
    const [mealType, setMealType] = useState()
    let [directions, setDirections] = useState()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) fetchRecipes(userId)
    }, [])

const fetchRecipes = async (userId) => {
    let { data: recipe, error } = await supabase
        .from('recipe')
        .select('*')
        if (recipe) {
            const {name, serves, cookingTime, mealType, ingredients, directions} = recipe[0]
            setName(name)
            setServes(serves)
            setCookingTime(cookingTime)
            setMealType(mealType)
            setIngredients(ingredients)
            setDirections(directions)
        }
        if (error) return console.log(error)
}
   console.log(cookingTime)
    return (
            <Container>
                <div>
                    <Title>{name}</Title>
                </div>
            <ContentContainer>
            <Section>
                <InputContainer>
                <Title level={4}>Serves: {serves}</Title>
                </InputContainer>
                <InputContainer>
                    Cooking time: {cookingTime}
                    </InputContainer>
                <InputContainer>
                  
                </InputContainer>
                <InputContainer>
                
                    
                </InputContainer>
            </Section>
            <Section>
                <InputContainer style={{}}><Title level={4}>Directions</Title></InputContainer>
                <InputContainer>
                    
                </InputContainer> 
            </Section>
        </ContentContainer>
        </Container>
    );
};


export default Collection;