import React, {  useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../supabase'
import { useTable } from 'react-table'
import Table from './table'
import { useHistory } from "react-router-dom";
import Layout from '../../Layout'


const Collection = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        console.log('userID', userId)
        if (userId) fetchRecipes(userId)
    }, [])


    const fetchRecipes = async (userId) => {
        let { data: recipe, error } = await supabase
            .from('recipe')
            .select('*')
            .eq('userId', userId)
            if (recipe) setData(recipe)
            if (error) return console.log(error)
    }

    console.log(data)

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Meal Type',
            accessor: 'mealType',
          },
          {
            Header: 'Serves',
            accessor: 'serves',
          },
          {
            Header: 'Cooking Time',
            accessor: 'cookingTime',
          },
        ],
        []
      )

      const onClick = () => {
          console.log('clicked')
          history.push('/recipe')
      }

      const history = useHistory()

    // const memoizedRecipes = useMemo(fetchRecipes, [userId])

    
    return  (
      <Layout>
        { data 
        ?  <Table 
            onClick={() => onClick()}
            columns={columns}
            data={data}
          /> 
        : <div>Loading</div>
        }
      </Layout>
    )
};



export default Collection;