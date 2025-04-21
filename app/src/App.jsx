import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Sidebar from './component/Sidebar/sidebar';

function LandingPage() {
    return (
        <div className="landing-container gradient-theme">
            <motion.h1 
                className="title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Welcome to Dev-Tools
            </motion.h1>

            <motion.p 
                className="description"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Your all-in-one platform for powerful development tools like QR Code Generator, Diff Checker, and Code Converter. Designed to simplify your workflow with vibrant designs and seamless functionality.
            </motion.p>

            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            >
                <button 
                    className="explore-button"
                    onClick={() => window.location.href = '/sidebar'}
                >
                    Explore Tools
                </button>
            </motion.div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/sidebar" element={<div><Sidebar/></div>} />
            </Routes>
        </Router>
    );
}

export default App;
