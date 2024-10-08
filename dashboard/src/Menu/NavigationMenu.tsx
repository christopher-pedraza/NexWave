import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react"; // NextUI components for Listbox
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet and useNavigate

function NavigationMenu() {
  const navigate = useNavigate(); // Initialize the useNavigate hook for navigation

  // Handlers for icon clicks
  const handleNavigateToHome = () => {
    navigate("/"); // Navigate to Home
  };

  const handleNavigateToIndv = () => {
    navigate("/indv"); // Navigate to Individual Dashboard
  };

  const handleNavigateBackToHome = () => {
    navigate("/"); // Navigate back to Home (for third icon)
  };

  // List using NextUI Listbox and MUI Icons
  const DrawerList = (
    <Listbox aria-label="Sidebar actions">
      {/* First icon navigates to Home ("/") */}
      <ListboxItem key="pacientes" onClick={handleNavigateToHome}>
        <PeopleAltIcon style={{ color: "#ecf0f1", fontSize: "24px" }} />
      </ListboxItem>

      {/* Second icon navigates to Individual Dashboard ("/indv") */}
      <ListboxItem key="dashboard" onClick={handleNavigateToIndv}>
        <BarChartIcon style={{ color: "#ecf0f1", fontSize: "24px" }} />
      </ListboxItem>

      {/* Third icon navigates back to Home ("/") */}
      <ListboxItem key="perfil" onClick={handleNavigateBackToHome}>
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
