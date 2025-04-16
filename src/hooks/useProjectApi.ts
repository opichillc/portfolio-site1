import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';

export const useProjectApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all projects
  const getProjects = async (): Promise<Project[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      return data.map(project => ({
        id: project.id,
        title: project.title,
        category: project.category,
        imageUrl: project.image_url,
        height: 400, // Default height
        description: project.description,
        client: project.client,
        year: project.year,
        timeline: project.timeline,
        services: project.services
      })) as Project[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single project by ID
  const getProject = async (id: string): Promise<Project | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) throw error;
      
      return {
        id: data.id,
        title: data.title,
        category: data.category,
        imageUrl: data.image_url,
        height: 400, // Default height
        description: data.description,
        client: data.client,
        year: data.year,
        timeline: data.timeline,
        services: data.services
      } as Project;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project';
      setError(errorMessage);
      console.error('Error fetching project:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new project
  const createProject = async (project: Omit<Project, 'id' | 'height'>): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: project.title,
          category: project.category,
          image_url: project.imageUrl,
          description: project.description,
          client: project.client,
          year: project.year,
          timeline: project.timeline,
          services: project.services
        }])
        .select();
        
      if (error) throw error;
      
      return data[0].id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
      setError(errorMessage);
      console.error('Error creating project:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing project
  const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'height'>>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updateData: any = {
        updated_at: new Date().toISOString()
      };
      
      if (project.title !== undefined) updateData.title = project.title;
      if (project.category !== undefined) updateData.category = project.category;
      if (project.imageUrl !== undefined) updateData.image_url = project.imageUrl;
      if (project.description !== undefined) updateData.description = project.description;
      if (project.client !== undefined) updateData.client = project.client;
      if (project.year !== undefined) updateData.year = project.year;
      if (project.timeline !== undefined) updateData.timeline = project.timeline;
      if (project.services !== undefined) updateData.services = project.services;
      
      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      console.error('Error updating project:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a project
  const deleteProject = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      console.error('Error deleting project:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
  };
};