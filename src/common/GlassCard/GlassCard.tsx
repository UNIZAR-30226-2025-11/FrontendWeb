import React, { useEffect, useState, ReactNode } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  minwidth?: string | number;
  maxwidth?: string | number;
  showPaws?: boolean;
  animationDelay?: number;
  maxHeight?: string | number; // Add maxHeight prop
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  title,
  className = '',
  maxwidth = '400px',
  minwidth = '300px',
  showPaws = true,
  animationDelay = 100,
  maxHeight = '80vh' // Default max height
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [animationDelay]);

  const style = {
    maxWidth: typeof maxwidth === 'number' ? `${maxwidth}px` : maxwidth,
    minWidth: typeof minwidth === 'number' ? `${minwidth}px` : minwidth,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
  };

  return (
    <div 
      className={`glass-card ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {title && (
        <div className="glass-card-header">
          <h2 className="glass-card-title">{title}</h2>
        </div>
      )}
      
      <div className="glass-card-content">
        {children}
      </div>
      
      {showPaws && (
        <>
          <div className="paw-decoration paw-top-right"></div>
          <div className="paw-decoration paw-bottom-left"></div>
          <div className="paw-decoration paw-middle-right"></div>
        </>
      )}
    </div>
  );
};

export default GlassCard;