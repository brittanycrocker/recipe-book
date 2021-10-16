import React from 'react';
import FormTemplate from '../../components/LogIn/form'
import AddRecipe from '../../components/Recipe/AddRecipe'
import { supabase } from '../../supabase'

const Home = () => {
    const user = supabase.auth.user()
    return (
        <div>Home
        <AddRecipe />
        </div>
    ) 
    // : ( <FormTemplate> </FormTemplate> )

};

export default Home;