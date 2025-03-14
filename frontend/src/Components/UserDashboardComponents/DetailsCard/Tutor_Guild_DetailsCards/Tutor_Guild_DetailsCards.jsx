import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../DetailsCards.css';

const Tutor_Guild_DetailsCards = () => {
    const aiTools = [
        {
            name: 'Tutor AI',
            courses: ['Mathematics 101', 'Physics Basics', 'English Grammar'],
            link: 'https://example.com/tutor-ai',
            readme: 'Provides personalized tutoring for various subjects.',
        },
        {
            name: 'Exam Preparation Section AI',
            studentsPassed: ['Alice Smith', 'Bob Johnson', 'Charlie Brown'],
            link: 'https://example.com/exam-prep-ai',
            readme: 'Helps students prepare for exams with mock tests.',
        },
        {
            name: 'Language Trainer AI',
            courses: ['Spanish for Beginners', 'French Intermediate', 'German Basics'],
            link: 'https://example.com/language-trainer-ai',
            readme: 'Teaches languages with interactive lessons.',
        },
        {
            name: 'Text-Audio Summarization AI',
            summariesCreated: ['Chapter 1 Audio', 'Lecture 2 Summary', 'Book 3 Notes'],
            link: 'https://example.com/text-audio-ai',
            readme: 'Converts study materials into audio summaries.',
        },
        {
            name: 'Doubt Solver AI',
            doubtsResolved: ['Algebra Query', 'Chemistry Doubt', 'History Question'],
            link: 'https://example.com/doubt-solver-ai',
            readme: 'Instantly resolves student doubts across subjects.',
        },
        {
            name: 'Essay/Story Writing AI',
            worksGenerated: ['Essay on Climate Change', 'Short Story: The Lost Key', 'Poem: Rainy Days'],
            link: 'https://example.com/essay-story-ai',
            readme: 'Assists in creating essays and stories.',
        },
        {
            name: 'Programming AI (Dev-GuildAI)',
            courses: ['Python Basics', 'JavaScript for Beginners', 'C++ Fundamentals'],
            link: 'https://example.com/programming-ai',
            readme: 'Teaches coding skills with practical examples.',
        },
        {
            name: 'Study Planner AI',
            plansCreated: ['Week 1 Schedule', 'Exam Prep Plan', 'Semester Overview'],
            link: 'https://example.com/study-planner-ai',
            readme: 'Generates personalized study plans.',
        },
        {
            name: 'Student Mental Health Checker',
            resources: ['Mindfulness Guide', 'Stress Relief Tips', 'Sleep Improvement Plan'],
            link: 'https://example.com/mental-health-ai',
            readme: 'Supports student mental well-being.',
        },
        {
            name: 'Collaborator System AI',
            groupProjects: ['Science Fair Project', 'History Presentation', 'Math Group Assignment'],
            link: 'https://example.com/collaborator-ai',
            readme: 'Facilitates group work and project collaboration.',
        },
    ];

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [currentTool, setCurrentTool] = useState(null);

    const totalTools = aiTools.length;

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
                    <h2>Tutor-GuildAI</h2>
                </div>

                <div className="Dashboard-Shortcut-Card-Body">
                    <div className="Dashboard-Shortcut-Card-Section Dashboard-Shortcut-Left">
                        <h4>Total AI Tools</h4>
                        <p>{totalTools}</p>
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
                                        <th>Details</th>
                                        <th>Action</th>
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
                                            <td>
                                                {tool.courses && `Courses: ${tool.courses.join(', ')}`}
                                                {tool.studentsPassed && `Students Passed: ${tool.studentsPassed.join(', ')}`}
                                                {tool.summariesCreated && `Summaries: ${tool.summariesCreated.join(', ')}`}
                                                {tool.doubtsResolved && `Doubts Resolved: ${tool.doubtsResolved.join(', ')}`}
                                                {tool.worksGenerated && `Works: ${tool.worksGenerated.join(', ')}`}
                                                {tool.plansCreated && `Plans: ${tool.plansCreated.join(', ')}`}
                                                {tool.resources && `Resources: ${tool.resources.join(', ')}`}
                                                {tool.groupProjects && `Projects: ${tool.groupProjects.join(', ')}`}
                                            </td>
                                            <td>
                                                <motion.button
                                                    onClick={() => openDetailsModal(tool)}
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
                                {currentTool.courses && (
                                    <>
                                        <p><strong>Courses:</strong></p>
                                        <div className="courses-list-dashboard">
                                            {currentTool.courses.map((course, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="course-item"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {course}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {currentTool.studentsPassed && (
                                    <>
                                        <p><strong>Students Passed:</strong></p>
                                        <ul>
                                            {currentTool.studentsPassed.map((student, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {student}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.summariesCreated && (
                                    <>
                                        <p><strong>Summaries Created:</strong></p>
                                        <ul>
                                            {currentTool.summariesCreated.map((summary, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {summary}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.doubtsResolved && (
                                    <>
                                        <p><strong>Doubts Resolved:</strong></p>
                                        <ul>
                                            {currentTool.doubtsResolved.map((doubt, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {doubt}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.worksGenerated && (
                                    <>
                                        <p><strong>Works Generated:</strong></p>
                                        <ul>
                                            {currentTool.worksGenerated.map((work, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {work}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.plansCreated && (
                                    <>
                                        <p><strong>Plans Created:</strong></p>
                                        <ul>
                                            {currentTool.plansCreated.map((plan, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {plan}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.resources && (
                                    <>
                                        <p><strong>Resources:</strong></p>
                                        <ul>
                                            {currentTool.resources.map((resource, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {resource}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {currentTool.groupProjects && (
                                    <>
                                        <p><strong>Group Projects:</strong></p>
                                        <ul>
                                            {currentTool.groupProjects.map((project, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {project}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                <p><strong>Description:</strong></p>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {currentTool.readme}
                                </motion.p>
                            </div>
                            <div className="Dashboard-Shortcut-Buttons">
                                <motion.button
                                    className="Dashboard-Shortcut-View-Button"
                                    onClick={() => handleViewClick(currentTool.link)}
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

export default Tutor_Guild_DetailsCards;