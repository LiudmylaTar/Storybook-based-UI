import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "../components/Input/Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

// Обгортка для React Hook Form
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: { text: "", password: "", number: "" },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export const TextInput: Story = {
  render: () => (
    <FormWrapper>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Input name="text" placeholder="Text input" />
      </div>
    </FormWrapper>
  ),
};

export const PasswordInput: Story = {
  render: () => (
    <FormWrapper>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Input name="password" type="password" placeholder="Password" />
      </div>
    </FormWrapper>
  ),
};

export const ClearableInput: Story = {
  render: () => (
    <FormWrapper>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Input name="text" placeholder="Clearable input" clearable />
      </div>
    </FormWrapper>
  ),
};

export const NumberInput: Story = {
  render: () => (
    <FormWrapper>
      <div style={{ maxWidth: "300px", margin: "0 auto" }}>
        <Input name="number" type="number" placeholder="Number input" />
      </div>
    </FormWrapper>
  ),
};
