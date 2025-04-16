// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React, { useState, useCallback, useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import { initialProjects, generateProjects } from '../data/projects';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Branding', 'Web Design', 'Illustration', 'Typography', 'Packaging'];

  // Initialize with filtered projects
  useEffect(() => {
    setProjects(initialProjects);
  }, []);

  // Handle category filtering
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setProjects(initialProjects);
    } else {
      const filtered = initialProjects.filter(project => project.category === category);
      setProjects(filtered);
    }
  };

  const loadMoreProjects = useCallback(() => {
    if (loading || activeCategory !== 'All') return;
    
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const newProjects = generateProjects(10).map(project => ({
        ...project,
        id: project.id + projects.length // Ensure unique IDs
      }));
      
      setProjects(prevProjects => [...prevProjects, ...newProjects]);
      setLoading(false);
    }, 1000);
  }, [projects.length, loading, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Gallery</h1>
          <p className="text-lg text-gray-600 mb-8">
            Browse through our diverse collection of design work.
          </p>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <MasonryGrid projects={projects} onLoadMore={loadMoreProjects} />
      
      {loading && (
        <div className="flex justify-center my-8">
          <div className="loader"></div>
          <p className="ml-2 text-gray-600">Loading more projects...</p>
        </div>
      )}
    </div>
  );
};

export default Projects;