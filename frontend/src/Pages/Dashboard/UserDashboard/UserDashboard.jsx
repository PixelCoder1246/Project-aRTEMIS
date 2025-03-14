import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import './UserDashboard.css';
import Dev_Guild_DetailsCards from '../../../Components/UserDashboardComponents/DetailsCard/Dev-Guild-DetailsCards/Dev_Guild_DetailsCards';
import Creative_Guild_DetailsCards from '../../../Components/UserDashboardComponents/DetailsCard/Creative-Guild-DetailsCards/Creative_Guild_DetailsCards';
import Tutor_Guild_DetailsCards from '../../../Components/UserDashboardComponents/DetailsCard/Tutor_Guild_DetailsCards/Tutor_Guild_DetailsCards';
import Business_Guild_DetailsCards from '../../../Components/UserDashboardComponents/DetailsCard/Business-Guild-DetailsCards/Business_Guild_DetailsCards';

function UserDashboard() {
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, 
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <div className="user-dashboard">
            <motion.header
                className="dashboard-header"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="Headinger-dashboard"
                    variants={headerVariants}
                >
                    Welcome Back, Eren Yeager!
                </motion.h1>
            </motion.header>
            <main className="dashboard-content">
                <motion.div
                    className="top-user-area"
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={cardVariants}>
                        <Dev_Guild_DetailsCards />
                    </motion.div>
                    <motion.div variants={cardVariants}>
                        <Creative_Guild_DetailsCards />
                    </motion.div>
                    <motion.div variants={cardVariants}>
                        <Tutor_Guild_DetailsCards />
                    </motion.div>
                    <motion.div variants={cardVariants}>
                        <Business_Guild_DetailsCards />
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}

export default UserDashboard;