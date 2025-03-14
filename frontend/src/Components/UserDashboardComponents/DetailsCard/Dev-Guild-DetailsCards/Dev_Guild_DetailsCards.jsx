import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../DetailsCards.css';

const Dev_Guild_DetailsCards = () => {
    const projects = [
        {
            name: 'Project 1',
            creationTime: '2025-03-01 14:00',
            status: 'Working',
            language: ['JavaScript', 'React'],
            isDeployed: true,
            link: 'https://example.com/project1',
            collaborative: true,
            team: [
                { name: 'Alice', role: 'Developer', email: 'alice@example.com', status: 'Active', joined: '2025-03-01' },
                { name: 'Bob', role: 'Designer', email: 'bob@example.com', status: 'Left', joined: '2025-03-01', left: '2025-03-10' },
            ],
            readme: 'Project 1 is a React-based app for managing tasks...',
        },
        {
            name: 'Project 2',
            creationTime: '2025-03-05 10:00',
            status: 'Error',
            language: ['Python', 'Flask'],
            isDeployed: false,
            link: 'https://example.com/project2',
            collaborative: false,
            team: [],
            readme: 'Project 2 is a Flask-based app for managing user authentication...',
        },
        {
            name: 'Project 3',
            creationTime: '2025-03-10 16:00',
            status: 'Working',
            language: ['JavaScript', 'Node.js'],
            isDeployed: false,
            link: 'https://example.com/project3',
            collaborative: true,
            team: [
                { name: 'Charlie', role: 'Backend Developer', email: 'charlie@example.com', status: 'Active', joined: '2025-03-10' },
            ],
            readme: 'Project 3 is a Node.js API for processing data...',
        },
        {
            name: 'Project 4',
            creationTime: '2025-03-12 18:30',
            status: 'Error',
            language: ['Ruby', 'Rails'],
            isDeployed: true,
            link: 'https://example.com/project4',
            collaborative: true,
            team: [
                { name: 'David', role: 'Project Manager', email: 'david@example.com', status: 'Active', joined: '2025-03-12' },
            ],
            readme: 'Project 4 is a Rails-based app for organizing events...',
        },
    ];

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    const totalProjects = projects.length;
    const workingProjects = projects.filter((project) => project.status === 'Working').length;
    const errorProjects = projects.filter((project) => project.status === 'Error').length;

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const openTeamModal = (project) => {
        setCurrentProject(project);
        setIsTeamModalOpen(true);
    };

    const closeTeamModal = () => {
        setIsTeamModalOpen(false);
        setCurrentProject(null);
    };

    const openDetailsModal = (project) => {
        setCurrentProject(project);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setCurrentProject(null);
    };

    const handleLiveClick = (link) => {
        if (link) window.open(link, '_blank');
    };

    const handleViewClick = (link) => {
        if (link) window.open(link, '_blank');
    };

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    return (
        <div className='Dashboard-Shortcut-Cards-User'>
            <motion.div 
                className={`Dashboard-Shortcut-Card-Container ${isFullscreen ? 'Dashboard-Shortcut-Fullscreen' : ''}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="Dashboard-Shortcut-Card-Header">
                    <h2>Dev-GuildAI</h2>
                </div>

                <div className="Dashboard-Shortcut-Card-Body">
                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Left">
                        <h4>Total Projects</h4>
                        <p>{totalProjects}</p>
                    </div>

                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Center">
                        <h4>Working Projects</h4>
                        <p>{workingProjects}</p>
                    </div>

                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Right">
                        <h4>Error Projects</h4>
                        <p>{errorProjects}</p>
                    </div>
                </div>

                <div className="Dashboard-Shortcut-Card-Footer">
                    <motion.button 
                        onClick={toggleFullscreen}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        More Details
                    </motion.button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isFullscreen && (
                    <motion.div 
                        className="Dashboard-Shortcut-Fullscreen-Overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div 
                            className="Dashboard-Shortcut-Fullscreen-Container"
                            variants={modalVariants}
                        >
                            <motion.button 
                                className="Dashboard-Shortcut-Close-Btn" 
                                onClick={toggleFullscreen}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ❌
                            </motion.button>
                            <h2>Project Details</h2>
                            <table className="Dashboard-Shortcut-Table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Creation Time</th>
                                        <th>Status</th>
                                        <th>Languages</th>
                                        <th>Deployment</th>
                                        <th>Collaborative</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project, index) => (
                                        <motion.tr 
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <td>{project.name}</td>
                                            <td>{project.creationTime}</td>
                                            <td>{project.status}</td>
                                            <td>
                                                {project.language.map((lang, idx) => (
                                                    <span key={idx} className="Dashboard-Shortcut-Tag">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                {project.status === 'Working' && project.isDeployed ? (
                                                    <motion.button whileHover={{ scale: 1.05 }}>Live</motion.button>
                                                ) : (
                                                    <span>Nope</span>
                                                )}
                                            </td>
                                            <td>
                                                {project.collaborative && (
                                                    <motion.button 
                                                        onClick={() => openTeamModal(project)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Check Team
                                                    </motion.button>
                                                )}
                                            </td>
                                            <td>
                                                <motion.button 
                                                    onClick={() => openDetailsModal(project)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Details
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isTeamModalOpen && currentProject && (
                    <motion.div 
                        className="Dashboard-Shortcut-Team-Modal-Overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div 
                            className="Dashboard-Shortcut-Team-Modal-Container"
                            variants={modalVariants}
                        >
                            <motion.button 
                                className="Dashboard-Shortcut-Team-Close-Btn" 
                                onClick={closeTeamModal}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ❌
                            </motion.button>
                            <h3>Team Members of {currentProject.name}</h3>
                            <input 
                                className="Dashboard-Shortcut-Team-Search" 
                                type="text" 
                                placeholder="Search team..." 
                            />
                            <table className="Dashboard-Shortcut-Team-Table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Joined</th>
                                        <th>Left</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProject.team.map((member, index) => (
                                        <motion.tr 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <td>{member.name}</td>
                                            <td>{member.role}</td>
                                            <td>{member.email}</td>
                                            <td>{member.status}</td>
                                            <td>{member.joined}</td>
                                            <td>{member.status === 'Left' ? member.left : '-'}</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isDetailsModalOpen && currentProject && (
                    <motion.div 
                        className="Dashboard-Shortcut-Details-Modal-Overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div 
                            className="Dashboard-Shortcut-Details-Modal-Container"
                            variants={modalVariants}
                        >
                            <motion.button 
                                className="Dashboard-Shortcut-Details-Close-Btn" 
                                onClick={closeDetailsModal}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ❌
                            </motion.button>
                            <h3>{currentProject.name}</h3>
                            <div className="Dashboard-Shortcut-Details-Content">
                                <p><strong>Creation Time:</strong> {currentProject.creationTime}</p>
                                <p><strong>Status:</strong> {currentProject.status}</p>
                                <p><strong>Languages:</strong> {currentProject.language.join(', ')}</p>
                                <p><strong>Deployed:</strong> {currentProject.isDeployed ? 'Yes' : 'No'}</p>
                                <p><strong>Collaborative:</strong> {currentProject.collaborative ? 'Yes' : 'No'}</p>
                                <p><strong>Readme:</strong></p>
                                <p>{currentProject.readme}</p>
                            </div>
                            <div className="Dashboard-Shortcut-Buttons">
                                {currentProject.isDeployed ? (
                                    <motion.button 
                                        className="Dashboard-Shortcut-Live-Button"
                                        onClick={() => handleLiveClick(currentProject.link)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Live
                                    </motion.button>
                                ) : (
                                    <button className="Dashboard-Shortcut-Closed-Button" disabled>
                                        Closed
                                    </button>
                                )}
                                <motion.button 
                                    className="Dashboard-Shortcut-View-Button" 
                                    onClick={() => handleViewClick(currentProject.link)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dev_Guild_DetailsCards;