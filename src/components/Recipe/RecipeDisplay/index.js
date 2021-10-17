import React, { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../utils'
import { Container, TitleInput, ContentContainer, InputContainer, Section } from '../AddRecipe/index.styles'
import { Layout, Menu, Breadcrumb, Dropdown, Button, message, Typography , Input } from 'antd';
import { EditOutlined, UserOutlined, DownOutlined, } from '@ant-design/icons'
import {supabase} from '../../../supabase'
import { useHistory, useLocation } from "react-router-dom";
import { Descriptions } from 'antd';
import Paragraph from 'antd/lib/skeleton/Paragraph';
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

    const styles = {
        // border: '1px solid black', 
        // padding: '5px',
        borderRadius: '1%',
        color: 'white'
    }
    
    return (
            <Container>
                <div onClick={() => history.push({pathname: '/home'})}>
                    <Title>{name || 'title'}</Title>
                </div>
            <ContentContainer>
            <Section>
            <Descriptions
                labelStyle={{background: 'RGBA(0,58,140,1)', fontWeight: '600'}}
                    
                    bordered
                    column={{  sm: 1, xs: 1 }}
                    >
            
                <Descriptions.Item  style={styles}label="Serves">{serves}</Descriptions.Item>
                <Descriptions.Item style={styles} label="Product"> serves    </Descriptions.Item>

                
                <Descriptions.Item style={styles} label="Product">Cooking Time: {cookingTime} </Descriptions.Item>
                    
                
                <Descriptions.Item style={styles} label="Product">Meal Type: {mealType} </Descriptions.Item>
                
                
                {console.log(ingredients)}
                <Title>Ingredients</Title>
                <Paragraph style={{ whiteSpace: 'pre-wrap', ...styles}}>{ingredients}</Paragraph>
                
                
                
            </Descriptions>
            </Section>
            <Section>
           
            <InputContainer style={styles}><Title level={4}>Directions</Title><div>{directions}</div></InputContainer>
        
            </Section>
        </ContentContainer>
        </Container>
    );
};


export default Recipe;