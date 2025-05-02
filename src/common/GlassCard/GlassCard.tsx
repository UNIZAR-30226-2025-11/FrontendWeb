import React, { useEffect, useState, ReactNode, useRef } from 'react';
import './GlassCard.css';

interface GlassCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  minwidth?: string | number;
  maxwidth?: string | number;
  showPaws?: boolean;
  animationDelay?: number;
  maxHeight?: string | number;
  autoFit?: boolean; // Whether to automatically fit content or use scroll
  background?: string; // Background type
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  title,
  className = '',
  maxwidth = '400px',
  minwidth = '300px',
  showPaws = true,
  animationDelay = 100,
  maxHeight = '90vh',
  autoFit = true, // Default to true for backwards compatibility
  background = 'default'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle animation visibility
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [animationDelay]);
  
  // Check if card needs to scroll after initial render and animations
  useEffect(() => {
    if (!contentRef.current || !autoFit) return;
    
    const checkOverflow = () => {
      const element = contentRef.current;
      if (!element) return;
      
      // Check if content needs scrolling
      const needsScroll = element.scrollHeight > element.clientHeight;
      
      // Add a class if scrolling is needed
      if (needsScroll) {
        element.classList.add('needs-scroll');
      } else {
        element.classList.remove('needs-scroll');
      }
    };
    
    // Check after animations complete
    const timer = setTimeout(checkOverflow, animationDelay + 500);
    
    // Also add resize observer to handle window size changes
    const resizeObserver = new ResizeObserver(checkOverflow);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    
    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [isVisible, animationDelay, autoFit]);

  const style = {
    maxWidth: typeof maxwidth === 'number' ? `${maxwidth}px` : maxwidth,
    minWidth: typeof minwidth === 'number' ? `${minwidth}px` : minwidth,
    maxHeight: autoFit ? typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight : undefined
  };

  return (
    <div 
      className={`glass-card ${background} ${isVisible ? 'visible' : ''} ${className}`}
      style={style}
    >
      {title && (
        <div className={`glass-card-header ${background}`}>
          <h2 className={`glass-card-title ${background}`}>{title}</h2>
        </div>
      )}
      
      <div 
        ref={contentRef}
        className={`glass-card-content ${background}`}
      >
        {children}
      </div>
      
      {showPaws && (
        <>
          <div className={`paw-decoration ${background} paw-top-right`}></div>
          <div className={`paw-decoration ${background} paw-bottom-left`}></div>
          <div className={`paw-decoration ${background} paw-middle-right`}></div>
        </>
      )}
    </div>
  );
};

export default GlassCard;