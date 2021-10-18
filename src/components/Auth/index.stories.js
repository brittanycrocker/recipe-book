import React from "react";
import FormTemplate from "./form";
import Login from "./login";

export default {
  title: "FormTemplate",
  component: FormTemplate,
};

const Template = () => <FormTemplate />;

export const Primary = Template.bind({});

export const Secondary = () => <Login />;
