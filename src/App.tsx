import { useState } from "react";
import "./App.css";
import SidebarMenu from "./components/SidebarMenu/SidebarMenu";

function App() {
  const [open, setOpen] = useState(false);
  const menuItems = [
    {
      label: "Dashboard",
      onClick: () => alert("Go to Dashboard"),
    },
    {
      label: "Settings",
      children: [
        {
          label: "Profile",
          onClick: () => alert("Open Profile"),
        },
        {
          label: "Security",
          onClick: () => alert("Open Security Settings"),
        },
      ],
    },
    {
      label: "Help",
      onClick: () => alert("Help clicked"),
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <h1>React UI Library — Test Assessment</h1>
        <p>
          This project is a React component library for UI unification, built
          with Storybook.
        </p>
        <button type="button" onClick={handleOpen}>
          Open Sidebar
        </button>

        {open && (
          <SidebarMenu
            title="Main Menu"
            items={menuItems}
            onClose={handleClose}
            bgColor="#dbeee1ff"
            textColor="#222"
            fontSize="15px"
            maxWidth={280}
            position="left"
          />
        )}
      </div>
    </>
  );
}

export default App;
