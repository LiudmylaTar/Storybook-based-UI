import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SidebarMenu from "../components/SidebarMenu/SidebarMenu";

const meta: Meta<typeof SidebarMenu> = {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
  argTypes: {
    position: {
      control: "inline-radio",
      options: ["left", "right"],
    },
    mode: {
      control: "inline-radio",
      options: ["overlay", "push"],
    },
    bgColor: { control: "color" },
    textColor: { control: "color" },
    fontSize: { control: "text" },
    maxWidth: { control: "number" },
    closeOnBgClick: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

// Utility wrapper to handle opening/closing in stories
const SidebarWrapper = (args: React.ComponentProps<typeof SidebarMenu>) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Menu</button>
      <SidebarMenu {...args} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const OneLevel: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    title: "Main Menu",
    items: [
      { label: "Home", onClick: () => alert("Home clicked") },
      { label: "About", onClick: () => alert("About clicked") },
      { label: "Contact", onClick: () => alert("Contact clicked") },
    ],
    bgColor: "#e8f8ee",
    textColor: "#053b1d",
    position: "right",
    mode: "overlay",
    closeOnBgClick: true,
  },
};

export const TwoLevel: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    title: "Settings",
    items: [
      {
        label: "Profile",
        children: [
          { label: "View Profile", onClick: () => alert("View Profile") },
          { label: "Edit Profile", onClick: () => alert("Edit Profile") },
        ],
      },
      {
        label: "Preferences",
        children: [
          { label: "Theme", onClick: () => alert("Theme clicked") },
          { label: "Language", onClick: () => alert("Language clicked") },
        ],
      },
      { label: "Logout", onClick: () => alert("Logout clicked") },
    ],
    bgColor: "#e7f7ec",
    textColor: "#084c2b",
    position: "right",
    mode: "overlay",
  },
};

export const LeftPosition: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    ...TwoLevel.args,
    position: "left",
    title: "Left Menu",
  },
};

export const CustomStyled: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    title: "Custom Look",
    items: [
      { label: "Dashboard", onClick: () => alert("Dashboard clicked") },
      {
        label: "Reports",
        children: [
          { label: "Annual", onClick: () => alert("Annual report") },
          { label: "Monthly", onClick: () => alert("Monthly report") },
        ],
      },
    ],
    bgColor: "#d3f9d8",
    textColor: "#03452a",
    fontSize: "18px",
    maxWidth: 360,
    position: "right",
    mode: "push",
  },
};
