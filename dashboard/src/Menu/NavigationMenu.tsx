import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react"; // NextUI components for Listbox
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet } from "react-router-dom"; // Import Outlet to render child components

function NavigationMenu() {
  // List using NextUI Listbox and MUI Icons
  const DrawerList = (
    <Listbox aria-label="Sidebar actions">
      <ListboxItem key="pacientes">
        <PeopleAltIcon style={{ color: "#ecf0f1", fontSize: "24px" }} />
      </ListboxItem>

      <ListboxItem key="dashboard">
        <BarChartIcon style={{ color: "#ecf0f1", fontSize: "24px" }} />
      </ListboxItem>

      <ListboxItem key="perfil">
        <AccountCircleIcon style={{ color: "#ecf0f1", fontSize: "24px" }} />
      </ListboxItem>
    </Listbox>
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar using Tailwind CSS */}
      <div className="w-16 bg-black border-r-2 border-gray-500 flex flex-col items-center pt-4 min-h-screen">
        {DrawerList} {/* Render Listbox */}
      </div>

      {/* Main content */}
      <div className="flex-grow p-6 overflow-auto">
        <Outlet /> {/* Child routes will be rendered here */}
      </div>
    </div>
  );
}

export default NavigationMenu;
