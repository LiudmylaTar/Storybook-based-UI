import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toast from "./../components/Toast/Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "error", "warning"],
    },
    position: {
      control: { type: "select" },
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    bgColor: { control: "color", description: "Custom background color" },
    textColor: { control: "color", description: "Text color" },
    iconColor: { control: "color", description: "Close icon color" },
    fontSize: {
      control: "text",
      description: "Font size (px, rem, etc.)",
    },
  },
  args: {
    message: "This is a toast message",
    duration: 3000,
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastWrapper = (args: React.ComponentProps<typeof Toast>) => {
  const [show, setShow] = useState(true);
  return show ? <Toast {...args} onClose={() => setShow(false)} /> : null;
};

const InteractiveToastDemo = (args: React.ComponentProps<typeof Toast>) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <button
        onClick={() => setShow(true)}
        style={{
          padding: "8px 14px",
          background: "#0056d2",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Show Toast
      </button>

      {show && <Toast {...args} onClose={() => setShow(false)} />}
    </div>
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveToastDemo {...args} />,
};

export const CustomColors: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    message: "Custom styled toast",
    bgColor: "#222831",
    textColor: "#FFD369",
    iconColor: "#FFD369",
    type: "info",
  },
};
export const Success: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: { type: "success", message: "Operation completed successfully!" },
};
export const Error: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: { type: "error", message: "Something went wrong!" },
};

export const Warning: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: { type: "warning", message: "Warning: Check your input!" },
};

export const TopCenter: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    message: "Toast on top center",
    position: "top-center",
    type: "info",
  },
};

export const LongDuration: Story = {
  render: (args) => <ToastWrapper {...args} />,
  args: {
    message: "This toast lasts 6 seconds",
    duration: 6000,
    type: "info",
  },
};
