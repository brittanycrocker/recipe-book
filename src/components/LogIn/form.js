import React, { useState } from 'react'
import { supabase } from '../../supabase'
import {  Form, Input, Button, Checkbox  } from 'antd'
import { useHistory } from "react-router-dom";

const FormTemplate = () => {
  const [email, setEmail] = useState('brittanylcrocker@gmail.com')
  const [password, setPassword] = useState('chicken')

  const history = useHistory()
    const auth = async (type) => {
      console.log(type)
          if (type === 'signin') {
            let { user, error } = await supabase.auth.signIn({
               email,
                password
              })
              if (user) {
                localStorage.setItem('userId', user.id) 
                console.log(user)
                history.push('/home')
              }
              if (error) {
                console.log('error', error)
                // snackbar
              }
            } else if (type === 'signup') {
            let { user, error } = await supabase.auth.signUp({
               email,
                password
              })
              if (user) {
                localStorage.setItem('userId', user.id) 
                console.log(user)
                history.push('/home')
              }
              if (error) {
                console.log('error', error)
                // snackbar
              }
            }
        
    }

    return (
        <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={() => auth('signin')}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
}

export default FormTemplate;