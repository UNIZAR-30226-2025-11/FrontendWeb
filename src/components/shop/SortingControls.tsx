import React from "react";
import './SortingControls.css';

type SortingControlsProps = {
  sortOrder: string;
  onSortChange: (order: string) => void;
};

const SortingControls: React.FC<SortingControlsProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="sorting-controls">
      <span className="sorting-label">Sort by:</span>
      <div className="sorting-options">
        <button 
          className={`sorting-option ${sortOrder === 'default' ? 'active' : ''}`}
          onClick={() => onSortChange('default')}
        >
          Default
        </button>
        <button 
          className={`sorting-option ${sortOrder === 'price-asc' ? 'active' : ''}`}
          onClick={() => onSortChange('price-asc')}
        >
          Price ↑
        </button>
        <button 
          className={`sorting-option ${sortOrder === 'price-desc' ? 'active' : ''}`}
          onClick={() => onSortChange('price-desc')}
        >
          Price ↓
        </button>
      </div>
    </div>
  );
};

export default SortingControls;