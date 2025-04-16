// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface LightboxProps {
  project: Project | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ project, onClose }) => {
  // Close lightbox on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Only add listeners and modify body style if a project is selected
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'auto';
      };
    }
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 bg-white/80 rounded-full p-1 z-10 hover:bg-white transition-colors duration-200"
          onClick={onClose}
        >
          <X size={24} className="text-gray-800" />
        </button>

        {/* Project image */}
        <div className="w-full h-[40vh] sm:h-[50vh] bg-gray-100">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Project details */}
        <div className="p-6">
          <div className="mb-6">
            <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm mb-2">
              {project.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
          </div>

          {/* Project description - using placeholder text since we don't have real descriptions */}
          <div className="prose prose-indigo max-w-none">
            <p>
              This is a sample project description. In a real portfolio, this would contain detailed information about the project, including the client, brief, approach, and outcomes.
            </p>
            <p>
              The design process involved several iterations, focusing on the brand's core values and target audience. The final result achieves a balance between aesthetic appeal and functional design.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Project Details</h3>
            <ul className="space-y-2">
              <li><strong>Client:</strong> Sample Client</li>
              <li><strong>Timeline:</strong> 4 weeks</li>
              <li><strong>Services:</strong> {project.category}</li>
              <li><strong>Year:</strong> 2025</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;