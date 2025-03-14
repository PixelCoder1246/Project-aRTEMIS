import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../assets/Logo/logo.png";
import Profilepic from "../../assets/profilepic.png";
import { useState } from "react";
import LogoutButton from "../LogoutButton/LogoutButton";

function Sidebar({ toggleTheme, isDarkTheme }) {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Dashboard");
    const [isDevGuildOpen, setDevGuildOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleNavClick = (route, componentName, isDropdown = false) => {
        setActiveLink(componentName);
        setDevGuildOpen(false);

        if (!isDropdown) {
            setSidebarOpen(false);
        }

        navigate(route);
    };

    const toggleDevGuildDropdown = () => {
        setDevGuildOpen(!isDevGuildOpen);
    };

    return (
        <div className={`sidebar-component ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? "←" : "→"}
            </button>

            <div className={`sidebar-top ${isSidebarOpen ? "" : "sidebar-hidden"}`}>
                <img className="sidebar-logo" src={Logo} alt="Logo" draggable='false' />
                <h1 className="sidebar-company-name">aRTEMIS</h1>

                <button
                    className="theme-toggle-sidebar"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDarkTheme ? '☀️' : '🌙'}
                </button>
            </div>

            <div className={`sidebar-nav-links ${isSidebarOpen ? "" : "sidebar-hidden"}`}>
                <button
                    className={`sidebar-nav-btn ${activeLink === "Dashboard" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard", "Dashboard")}
                >
                    Dashboard
                </button>

                <div className="sidebar-dropdown">
                    <button
                        className={`sidebar-nav-btn dropdown-btn ${isDevGuildOpen ? "open" : ""} ${["SoloDevGuild", "GroupDevGuild"].includes(activeLink) ? "active" : ""}`}
                        onClick={toggleDevGuildDropdown}
                    >
                        Dev-Guild {isDevGuildOpen ? "▲" : "▼"}
                    </button>

                    <div className={`dropdown-content ${isDevGuildOpen ? "show" : ""}`}>
                        <button
                            className={`sidebar-nav-btn sub-option ${activeLink === "SoloDevGuild" ? "active" : ""}`}
                            onClick={() => handleNavClick("/dashboard/solo-dev-guild", "SoloDevGuild")}
                        >
                            Solo Guild
                        </button>
                        <button
                            className={`sidebar-nav-btn sub-option ${activeLink === "GroupDevGuild" ? "active" : ""}`}
                            onClick={() => handleNavClick("/dashboard/group-dev-guild", "GroupDevGuild")}
                        >
                            Group Guild
                        </button>
                    </div>
                </div>


                <button
                    className={`sidebar-nav-btn ${activeLink === "CreativeGuild" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/creative-guild", "CreativeGuild")}
                >
                    Creative-Guild AI
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "BusinessGuild" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/busi-guild", "BusinessGuild")}
                >
                    Business-Guild AI
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "TutorGuild" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/tutor-guild", "TutorGuild")}
                >
                    Tutor-Guild AI
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "TechNews" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/technews", "TechNews")}
                >
                    Tech News Center
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "MarketCenter" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/marketcenter", "MarketCenter")}
                >
                    Market Center
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "Notifications" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/notification", "Notifications")}
                >
                    Notifications
                </button>

                <button
                    className={`sidebar-nav-btn ${activeLink === "Report" ? "active" : ""}`}
                    onClick={() => handleNavClick("/dashboard/report", "Report")}
                >
                    Report
                </button>

            </div>

            <div className={`sidebar-profile-bottom ${isSidebarOpen ? "" : "sidebar-hidden"}`}>
                <img className="sidebar-profile-pic" src={Profilepic} alt="Profile" />
                <p className="sidebar-profile-name">Eren Yeager</p>
                <div className="sidebar-bottom-buttons">
                    <button
                        className={`sidebar-bottom-btn sidebar-settings-btn ${activeLink === "Settings" ? "active" : ""}`}
                        onClick={() => handleNavClick("/dashboard/settings", "Settings")}
                    >
                        User Settings
                    </button>
                    <LogoutButton givenClass={"sidebar-bottom-btn sidebar-logout-btn"}/>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
