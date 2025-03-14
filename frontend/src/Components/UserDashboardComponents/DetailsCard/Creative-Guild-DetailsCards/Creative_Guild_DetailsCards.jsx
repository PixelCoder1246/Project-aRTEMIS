import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import '../DetailsCards.css';

const Creative_Guild_DetailsCards = () => {
    const aiTools = [
        {
            name: 'Memer AI',
            recentProject: 'Viral Meme Generator',
            status: 'Successful',
            projectLink: 'https://example.com/viral-meme-generator',
            aiLink: 'https://example.com/memer-ai',
            readme: 'Creates hilarious and trending memes based on user prompts.',
        },
        {
            name: 'Story-Teller AI',
            recentProject: 'Fantasy Novel Draft',
            status: 'Successful',
            projectLink: 'https://example.com/fantasy-novel-draft',
            aiLink: 'https://example.com/story-teller-ai',
            readme: 'Generates engaging stories across genres with dynamic plot twists.',
        },
        {
            name: 'Musico-AI',
            recentProject: 'Synthwave Track Composer',
            status: 'Successful',
            projectLink: 'https://example.com/synthwave-track-composer',
            aiLink: 'https://example.com/musico-ai',
            readme: 'Composes original music tracks tailored to user preferences.',
        },
        {
            name: 'Video-Editor AI',
            recentProject: 'Auto-Cut Highlights Reel',
            status: 'Failed',
            projectLink: 'https://example.com/auto-cut-highlights-reel',
            aiLink: 'https://example.com/video-editor-ai',
            readme: 'Automates video editing with cuts and transitions, currently in beta.',
        },
        {
            name: 'AI Image-Enhancer',
            recentProject: 'Photo Restoration Tool',
            status: 'Successful',
            projectLink: 'https://example.com/photo-restoration-tool',
            aiLink: 'https://example.com/ai-image-enhancer',
            readme: 'Enhances image quality and restores old or damaged photos.',
        },
        {
            name: 'Voice-Over/Narration AI',
            recentProject: 'Podcast Narration Demo',
            status: 'Successful',
            projectLink: 'https://example.com/podcast-narration-demo',
            aiLink: 'https://example.com/voice-over-ai',
            readme: 'Generates natural-sounding voice-overs for various media types.',
        },
        {
            name: 'Animation Creator AI',
            recentProject: '2D Character Short',
            status: 'Failed',
            projectLink: 'https://example.com/2d-character-short',
            aiLink: 'https://example.com/animation-creator-ai',
            readme: 'Creates animated sequences from simple sketches, under optimization.',
        },
        {
            name: 'Background Remover AI',
            recentProject: 'Portrait Cleanup Tool',
            status: 'Successful',
            projectLink: 'https://example.com/portrait-cleanup-tool',
            aiLink: 'https://example.com/background-remover-ai',
            readme: 'Removes backgrounds from images with precision and ease.',
        },
        {
            name: 'Video Generation AI',
            recentProject: 'AI-Generated Music Video',
            status: 'Successful',
            projectLink: 'https://example.com/ai-generated-music-video',
            aiLink: 'https://example.com/video-generation-ai',
            readme: 'Produces full videos from text prompts or audio inputs.',
        },
        {
            name: 'AI Content Recommender',
            recentProject: 'Personalized Playlist Curator',
            status: 'Failed',
            projectLink: 'https://example.com/personalized-playlist-curator',
            aiLink: 'https://example.com/ai-content-recommender',
            readme: 'Recommends tailored content based on user behavior, in development.',
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
                    <h2>Creative-GuildAI</h2>
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
                                        <th>Work Status</th>
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

export default Creative_Guild_DetailsCards;