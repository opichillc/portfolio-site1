// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types';
import Lightbox from './Lightbox';

interface MasonryGridProps {
  projects: Project[];
  onLoadMore: () => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ projects, onLoadMore }) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(5); // Default to 5 columns for desktop
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Determine number of columns based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        // Mobile - 1 column
        setColumns(1);
      } else if (width < 768) {
        // Small tablet - 2 columns
        setColumns(2);
      } else if (width < 1024) {
        // Tablet - 3 columns
        setColumns(3);
      } else if (width < 1280) {
        // Small desktop - 4 columns
        setColumns(4);
      } else {
        // Large desktop - 5 columns
        setColumns(5);
      }
    };

    // Set initial columns
    handleResize();
    
    // Update on resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set up infinite scrolling with Intersection Observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onLoadMore();
      }
    }, { threshold: 0.1 });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onLoadMore]);

  // Create column arrays for masonry layout
  const getColumnProjects = () => {
    const columnProjects: Project[][] = Array.from({ length: columns }, () => []);
    
    projects.forEach((project, index) => {
      const columnIndex = index % columns;
      columnProjects[columnIndex].push(project);
    });
    
    return columnProjects;
  };

  const columnProjects = getColumnProjects();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseLightbox = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {columnProjects.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="flex flex-col gap-4">
              {column.map(project => (
                <div 
                  key={project.id} 
                  className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer"
                  style={{ 
                    aspectRatio: '1/1',  // Force square aspect ratio
                  }}
                  onClick={() => handleProjectClick(project)}
                >
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div ref={loadMoreRef} className="h-10 mt-8" />
      </div>

      {/* Lightbox component */}
      <Lightbox project={selectedProject} onClose={handleCloseLightbox} />
    </>
  );
};

export default MasonryGrid;