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
    const [recipeId, setRecipeId] = useState(location.state.recipeId)
    const [data, setData] = useState()

    const user = supabase.auth.user()



    console.log(localStorage.getItem('supabase.auth.token'))

    const fetchRecipe = async () => {
        let { data: recipe, error } = await supabase
        .from('recipe')
        .select('*')
        .eq('userId', user.id)
        .eq('id', recipeId)
        if (recipe) setData(recipe[0])
        if (error) console.log('an error occured', error)
    }

    useEffect(() => {
        fetchRecipe()
    })
    
    // TODO: add option to filter recipes
    return (
        <div>
            <Container>
            <Title></Title>
            <RecipeContent data={data} />
       </Container>
        </div>
    )
}

const RecipeContent = ({data}) => {
    console.log('data', data)
    const {name, serves, cookingTime, mealType, ingredients, directions} = data || {}

    const history = useHistory()
    
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