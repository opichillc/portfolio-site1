// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React, { useState, useCallback } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import { initialProjects, generateProjects } from '../data/projects';
import { Project } from '../types';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);

  const loadMoreProjects = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate loading delay for demo purposes
    setTimeout(() => {
      const newProjects = generateProjects(10).map(project => ({
        ...project,
        id: project.id + projects.length // Ensure unique IDs
      }));
      
      setProjects(prevProjects => [...prevProjects, ...newProjects]);
      setLoading(false);
    }, 1000);
  }, [projects.length, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Creative Design Portfolio</h1>
          <p className="text-lg text-gray-600">
            Explore a collection of innovative design projects showcasing creativity and attention to detail.
          </p>
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

export default Home;