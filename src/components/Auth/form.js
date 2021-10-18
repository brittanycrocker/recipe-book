import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

const FormTemplate = ({ onFinish = () => {}, buttonLabel }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
      onFinish={() => onFinish(email, password)}
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
            message: "Please input your username!",
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
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {buttonLabel}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTemplate;
