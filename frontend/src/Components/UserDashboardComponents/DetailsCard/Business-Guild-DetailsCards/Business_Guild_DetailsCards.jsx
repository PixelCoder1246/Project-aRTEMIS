import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../DetailsCards.css';

const Business_Guild_DetailsCards = () => {
    const aiTools = [
        {
            name: 'Financial-Insights AI',
            recentProject: 'Revenue Growth Tracker',
            status: 'Successful',
            projectLink: 'https://example.com/revenue-growth-tracker',
            aiLink: 'https://example.com/financial-insights-ai',
            readme: 'An AI tool providing real-time financial insights and revenue tracking.',
        },
        {
            name: 'Predictive-Analytics AI',
            recentProject: 'Demand Forecast Model',
            status: 'Failed',
            projectLink: 'https://example.com/demand-forecast-model',
            aiLink: 'https://example.com/predictive-analytics-ai',
            readme: 'Predicts future trends based on historical data, currently under review.',
        },
        {
            name: 'Smart Automation AI',
            recentProject: 'Workflow Optimizer',
            status: 'Successful',
            projectLink: 'https://example.com/workflow-optimizer',
            aiLink: 'https://example.com/smart-automation-ai',
            readme: 'Automates repetitive tasks to improve efficiency.',
        },
        {
            name: 'Market-Researcher AI',
            recentProject: 'Competitor Analysis Report',
            status: 'Successful',
            projectLink: 'https://example.com/competitor-analysis-report',
            aiLink: 'https://example.com/market-researcher-ai',
            readme: 'Analyzes market trends and competitor strategies.',
        },
        {
            name: 'Customers-Emotion-Sensor AI',
            recentProject: 'Sentiment Pulse',
            status: 'Failed',
            projectLink: 'https://example.com/sentiment-pulse',
            aiLink: 'https://example.com/customers-emotion-sensor-ai',
            readme: 'Detects customer emotions from feedback, under maintenance.',
        },
        {
            name: 'Virtual Communication',
            recentProject: 'AI Meeting Assistant',
            status: 'Successful',
            projectLink: 'https://example.com/ai-meeting-assistant',
            aiLink: 'https://example.com/virtual-communication-ai',
            readme: 'Enhances virtual meetings with real-time transcription and insights.',
        },
        {
            name: 'Fraud Detection AI',
            recentProject: 'Transaction Monitor',
            status: 'Successful',
            projectLink: 'https://example.com/transaction-monitor',
            aiLink: 'https://example.com/fraud-detection-ai',
            readme: 'Identifies fraudulent activities in financial transactions.',
        },
        {
            name: 'Fake Documentation Detector AI',
            recentProject: 'ID Verification System',
            status: 'Failed',
            projectLink: 'https://example.com/id-verification-system',
            aiLink: 'https://example.com/fake-documentation-detector-ai',
            readme: 'Detects forged documents, currently paused for updates.',
        },
        {
            name: 'Business Strategy Maker AI',
            recentProject: 'Growth Blueprint',
            status: 'Successful',
            projectLink: 'https://example.com/growth-blueprint',
            aiLink: 'https://example.com/business-strategy-maker-ai',
            readme: 'Generates strategic business plans based on market data.',
        },
        {
            name: 'Contract Review and Value Claimer AI',
            recentProject: 'Contract Analyzer',
            status: 'Successful',
            projectLink: 'https://example.com/contract-analyzer',
            aiLink: 'https://example.com/contract-review-ai',
            readme: 'Reviews contracts and identifies value opportunities.',
        },
        {
            name: 'HR and Employee Management AI',
            recentProject: 'Employee Engagement Dashboard',
            status: 'Failed',
            projectLink: 'https://example.com/employee-engagement-dashboard',
            aiLink: 'https://example.com/hr-management-ai',
            readme: 'Manages HR tasks and employee satisfaction, under repair.',
        },
        {
            name: 'Sales Forecaster AI',
            recentProject: 'Quarterly Sales Prediction',
            status: 'Successful',
            projectLink: 'https://example.com/quarterly-sales-prediction',
            aiLink: 'https://example.com/sales-forecaster-ai',
            readme: 'Forecasts sales trends for the upcoming quarter.',
        },
    ];

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [currentTool, setCurrentTool] = useState(null);

    const totalTools = aiTools.length;
    const successfulProjects = aiTools.filter((tool) => tool.status === 'Successful').length;
    const failedProjects = aiTools.filter((tool) => tool.status === 'Failed').length;

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    const openDetailsModal = (tool) => {
        setCurrentTool(tool);
        setIsDetailsModalOpen(true);
    };

    const closeDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setCurrentTool(null);
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
        <div className="Dashboard-Shortcut-Cards-User">
            <motion.div
                className={`Dashboard-Shortcut-Card-Container ${isFullscreen ? 'Dashboard-Shortcut-Fullscreen' : ''}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="Dashboard-Shortcut-Card-Header">
                    <h2>Business-GuildAI</h2>
                </div>

                <div className="Dashboard-Shortcut-Card-Body">
                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Left">
                        <h4>Total AI Tools</h4>
                        <p>{totalTools}</p>
                    </div>

                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Center">
                        <h4>Successful Files</h4>
                        <p>{successfulProjects}</p>
                    </div>

                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Right">
                        <h4>Failed Files</h4>
                        <p>{failedProjects}</p>
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
                            <h2>AI Tools Overview</h2>
                            <table className="Dashboard-Shortcut-Table">
                                <thead>
                                    <tr>
                                        <th>AI Tool Name</th>
                                        <th>Recent Files</th>
                                        <th>Status</th>
                                        <th>View File</th>
                                        <th>View AI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aiTools.map((tool, index) => (
                                        <motion.tr
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <td>{tool.name}</td>
                                            <td>{tool.recentProject}</td>
                                            <td>{tool.status}</td>
                                            <td>
                                                <motion.button
                                                    onClick={() => handleViewClick(tool.projectLink)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    View File
                                                </motion.button>
                                            </td>
                                            <td>
                                                <motion.button
                                                    onClick={() => openDetailsModal(tool)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    View AI
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
                {isDetailsModalOpen && currentTool && (
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
                            <h3>{currentTool.name}</h3>
                            <div className="Dashboard-Shortcut-Details-Content">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <strong>Recent Project:</strong> {currentTool.recentProject}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <strong>Status:</strong> {currentTool.status}
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <strong>Description:</strong>
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {currentTool.readme}
                                </motion.p>
                            </div>
                            <div className="Dashboard-Shortcut-Buttons">
                                <motion.button
                                    className="Dashboard-Shortcut-Live-Button"
                                    onClick={() => handleViewClick(currentTool.projectLink)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Project
                                </motion.button>
                                <motion.button
                                    className="Dashboard-Shortcut-View-Button"
                                    onClick={() => handleViewClick(currentTool.aiLink)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View AI
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Business_Guild_DetailsCards;