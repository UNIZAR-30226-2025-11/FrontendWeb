import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import './Timer.css';

type TimerProps = {
    duration: number;
    onTimeUp: () => void;
    className?: string;
    size?: number;
    position?: { bottom?: number; left?: number; top?: number; right?: number; };
    urgentThreshold?: number;
    pauseTimer?: boolean;
    showMilliseconds?: boolean;
}

/**
 * Enhanced glass-styled animated timer component
 * 
 * @param duration The time inside the timer in seconds
 * @param onTimeUp Function that will be executed when the timer ends
 * @param className Optional additional CSS classes
 * @param size Optional size in pixels
 * @param position Optional position override
 * @param urgentThreshold Optional threshold in seconds when the timer starts showing urgent styling
 * @param pauseTimer Optional flag to pause the timer externally
 * @param showMilliseconds Optional flag to show milliseconds for precision timing
 * 
 * @returns The timer component
 */
const Timer: React.FC<TimerProps> = ({
    duration = 20,
    onTimeUp,
    className = '',
    size,
    position,
    urgentThreshold = 3,
    pauseTimer = false,
    showMilliseconds = false
}) => {
    // Use milliseconds internally for smoother animations
    const [timeLeft, setTimeLeft] = useState(duration * 1000);
    const isUrgent = timeLeft <= urgentThreshold * 1000;
    const animationFrameRef = useRef<number>(0);
    const lastUpdateTimeRef = useRef<number>(Date.now());

    // Animation effect for smoother countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }
        
        if (pauseTimer) {
            // Reset the last update time when unpausing
            lastUpdateTimeRef.current = Date.now();
            return;
        }
        
        const updateTimer = () => {
            const now = Date.now();
            const deltaTime = now - lastUpdateTimeRef.current;
            lastUpdateTimeRef.current = now;
            
            if (!pauseTimer) {
                setTimeLeft(prev => Math.max(0, prev - deltaTime));
            }
            
            if (timeLeft > 0) {
                animationFrameRef.current = requestAnimationFrame(updateTimer);
            }
        };
        
        animationFrameRef.current = requestAnimationFrame(updateTimer);
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [timeLeft, onTimeUp, pauseTimer]);

    // Reset timer if duration changes
    useEffect(() => {
        setTimeLeft(duration * 1000);
        lastUpdateTimeRef.current = Date.now();
    }, [duration]);

    // Handle pause state changes
    useEffect(() => {
        if (!pauseTimer) {
            lastUpdateTimeRef.current = Date.now();
        }
    }, [pauseTimer]);

    // Format display time
    const formatTime = () => {
        const seconds = Math.floor(timeLeft / 1000);
        if (!showMilliseconds) return `${seconds}s`;
        
        const milliseconds = Math.floor((timeLeft % 1000) / 10);
        return `${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    // Calculate progress for the circle animation (0 to 1)
    const progress = timeLeft / (duration * 1000);
    
    // Create custom positioning style if provided
    const customStyle: React.CSSProperties = {};
    if (size) {
        customStyle.width = `${size}px`;
        customStyle.height = `${size}px`;
    }
    
    if (position) {
        if (position.bottom !== undefined) customStyle.bottom = `${position.bottom}px`;
        if (position.left !== undefined) customStyle.left = `${position.left}px`;
        if (position.top !== undefined) customStyle.top = `${position.top}px`;
        if (position.right !== undefined) customStyle.right = `${position.right}px`;
    }

    // Calculate circle parameters
    const circleRadius = 45;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circumference * (1 - progress);
    
    // Get colors based on urgency
    const backgroundColor = isUrgent 
        ? "rgba(255, 106, 136, 0.3)" 
        : "rgba(26, 24, 30, 0.6)";
    const strokeColor = isUrgent 
        ? "#ff6a88" 
        : "rgba(255, 154, 68, 0.8)";

    // Show pause indicator if timer is paused
    const isPaused = pauseTimer && timeLeft > 0;

    return (
        <div 
            className={`timer-container ${isUrgent ? 'urgent' : ''} ${isPaused ? 'paused' : ''} ${className}`}
            style={customStyle}
        >
            {/* Circle animation */}
            <svg className="timer-circle" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    stroke={backgroundColor}
                    strokeWidth="6"
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r={circleRadius}
                    stroke={strokeColor}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </svg>

            {/* Time display */}
            <motion.div
                className={`timer-text ${isUrgent ? 'urgent' : ''}`}
                animate={isUrgent && !pauseTimer ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
            >
                <span className="time-value">{formatTime()}</span>
                
                {/* Pause indicator */}
                <AnimatePresence>
                    {isPaused && (
                        <motion.div 
                            className="pause-indicator"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <div className="pause-bar"></div>
                            <div className="pause-bar"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Timer;