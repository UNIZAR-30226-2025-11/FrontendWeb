import React, { ReactNode, useEffect } from 'react';
import './AnimatedBackground.css';
import UserBar from '../../components/layout/UserBar';
import '../../components/layout/userbar.css'

const positions = [
  { x: 10, y: 15 },
  { x: 25, y: 30 },
  { x: 40, y: 70 },
  { x: 60, y: 20 },
  { x: 75, y: 50 },
  { x: 85, y: 80 },
  { x: 15, y: 60 },
  { x: 35, y: 40 },
  { x: 55, y: 75 },
  { x: 70, y: 10 },
];

interface AnimatedBackgroundProps {
  children: ReactNode;
  showUserBar?: boolean;
}

export const AnimatedBackground = ({ children, showUserBar = true }: AnimatedBackgroundProps) => {
  useEffect(() => {
    // Initialize floating particles
    const particlesContainer = document.querySelector('.particles-container');
    const createParticle = (container: Element) => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.floor(Math.random() * 20) + 10;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
        createParticle(container);
      }, (parseFloat(particle.style.animationDuration) + parseFloat(particle.style.animationDelay)) * 1000);
    };

    // Initialize cat silhouettes
    const backgroundCats = document.querySelector('.background-cats');
    const createCatSilhouette = (container: Element, i: number) => {
      const cat = document.createElement('div');
      cat.classList.add('cat-silhouette');
      
      const catType = Math.floor(Math.random() * 6 + 1);
      cat.classList.add(`cat-${catType}`);
      
      const size = Math.random() * 0.6 + 0.4;
      cat.style.transform = `scale(${size})`;
      cat.style.opacity = `${Math.random() * 0.3 + 0.15}`;
      
      const pos = positions[i];        
      cat.style.left = `${pos.x}%`;
      cat.style.top = `${pos.y}%`;
      container.appendChild(cat);
    };

    if (particlesContainer) {
      for (let i = 0; i < 10; i++) {
        createParticle(particlesContainer);
      }
    }

    if (backgroundCats) {
      backgroundCats.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        createCatSilhouette(backgroundCats, i);
      }
    }

    return () => {
      // Cleanup
      particlesContainer?.replaceChildren();
      backgroundCats?.replaceChildren();
    };
  }, []);

  return (
    <div className="animated-background-container">
      {showUserBar && <UserBar />}
      <div className="animated-background">
        <div className="background-cats"></div>
        <div className="particles-container"></div>
        <div className="gradient-overlay"></div>
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );  
};