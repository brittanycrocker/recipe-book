import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase'
// import { getItem } from '../../utils/localStorage'
import {
    Redirect
  } from 'react-router-dom'
  import * as ROUTES from './constants'

export default function PrivateComponent ({children, ...props}) {
    const [token, setToken] = useState(localStorage.getItem('supabase.auth.token'))

    console.log(token)

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            const newToken = localStorage.getItem('supabase.auth.token')
            setToken(newToken ?? null)
          }
        )
        return () => {
          authListener?.unsubscribe()
        }
      }, [])

      if (token) { return children }
  return (
    <Redirect to={ROUTES.LOG_IN} />
  )

}
