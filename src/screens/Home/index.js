import React from 'react';
import Layout from '../../components/Layout'
import { supabase } from '../../supabase'

const Home = () => {
    const user = supabase.auth.user()
    return (
        <Layout>
            Home
        </Layout>
    ) 
    // : ( <FormTemplate> </FormTemplate> )

};

export default Home;