import React, { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../utils'
import { Container, TitleInput, ContentContainer, InputContainer, Section } from '../AddRecipe/index.styles'
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
import {supabase} from '../../../supabase'
import { useHistory, useLocation } from "react-router-dom";
const { Title } = Typography

const Recipe = () => {
    const location = useLocation()
    const myparam = location.state
    console.log(myparam.recipeId)

    const fetchRecipe = async () => {
        let { data: recipe, error } = await supabase
        .from('recipe')
        .select('*')
        .eq('id', myparam.recipeId)
        if (recipe) console.log('recipe', recipe)
    }

    const memoizedRecipeData = useMemo(fetchRecipe, myparam)

    memoizedRecipeData.then((res) => console.log('res', res))


    
    // TODO: add option to filter recipes
    return (
        <div>
            <Container>
            <Title></Title>
            <RecipeContent />
       </Container>
        </div>
    )
}

const RecipeContent = () => {
    const [name, setName] = useState()
    const[serves, setServes] = useState()
    let [ingredients, setIngredients] = useState()
    const [cookingTime, setCookingTime] = useState()
    const [mealType, setMealType] = useState()
    let [directions, setDirections] = useState()

    const history = useHistory()
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        console.log('userID', userId)
        if (userId) fetchRecipes(userId)
    }, [])

const fetchRecipes = async (userId) => {
    let { data: recipe, error } = await supabase
        .from('recipe')
        .select('*')
        if (recipe) {
            console.log('recipe', recipe)
            const {name, serves, cookingTime, mealType, ingredients, directions} = recipe[0]
            setName(name)
            setServes(serves)
            setCookingTime(cookingTime)
            setMealType(mealType)
            setIngredients(ingredients)
            setDirections(directions)
            console.log(recipe)
        }
        if (error) return console.log(error)
}
   console.log(cookingTime)
    return (
            <Container>
                <div onClick={() => history.push({pathname: '/home'})}>
                    <Title>{name || 'title'}</Title>
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


export default Recipe;