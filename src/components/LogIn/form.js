import React, { useState } from 'react'
import { supabase } from '../../supabase'
import {  Form, Input, Button, Checkbox  } from 'antd'

const FormTemplate = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
    const auth = async () => {
        
            let { user, error } = await supabase.auth.signUp({
               email,
                password
              })
              if (user) localStorage.setItem('userId', user.id)
              if (error) {
                console.log('error', error)
                // snackbar
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
        onFinish={() => auth('signup')}
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