import React, { useEffect, useState } from 'react';
import './Notification.css';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Make toast visible after a short delay for animation purposes
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 100);

    // Auto-hide the toast after duration
    const hideTimer = setTimeout(() => {
      setVisible(false);
      
      // Allow animation to complete before calling onClose
      setTimeout(() => {
        if (onClose) onClose();
      }, 500);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const iconMap = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  return (
    <div className={`not-toast-container ${visible ? 'visible' : ''}`}>
      <div className={`not-toast-notification ${type}`}>
        <div className="not-toast-icon">{iconMap[type]}</div>
        <div className="not-toast-message">{message}</div>
        <div className="not-toast-progress-bar">
          <div className="not-toast-progress-fill" style={{ animationDuration: `${duration}ms` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Toast;