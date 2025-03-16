import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import './Timer.css';

type TimerProps = {
    duration: number;
    onTimeUp: Function;
}

/**
 * Define a Timer with a specific count
 * 
 * @param duration The time inside the timer
 * @param onTimeUp A function that will be executed
 *    when the timer ends
 * 
 * @returns The timer
 */
const Timer : React.FC<TimerProps> =
({  duration = 20,
    onTimeUp }) => 
{
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const backgroundColor = timeLeft > 3 ? "gray" : "red";

  return (
    // Wrap of the timer
    <div className="div-circle shadow-game">
      {/* Circle */}
      <svg className="circle" viewBox="0 0 100 100">
        {/* Background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={backgroundColor}
          strokeWidth="8"
          fill={backgroundColor}
        />
        {/* Movement */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="white"
          strokeWidth="8"
          fill="none"
          strokeDasharray="282.74"
          strokeDashoffset={282.74 * (1 - timeLeft / duration)}
          transition={{ ease: "linear", duration: 1 }}
        />
      </svg>

      {/* Time */}
      <motion.p
        className="text"
        animate={timeLeft <= 3 ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {timeLeft} s
      </motion.p>
    </div>
  );
};

export default Timer;
