import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import RightSidebar from "../../../Components/RightSidebar/RightSidebar";
import "./LayoutDashboard.css";

function LayoutDashboard() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [activeComponent, setActiveComponent] = useState("Dashboard");

    console.log(activeComponent);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className="layout-dashboard">
            <Sidebar 
                toggleTheme={toggleTheme} 
                isDarkTheme={isDarkTheme} 
                setActiveComponent={setActiveComponent} 
            />
            
            <div className="main-content-User-Dashboard">
                <Outlet />  
            </div>

            <RightSidebar />
        </div>
    );
}

export default LayoutDashboard;
