import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { PageContent, SiteSetting } from '../types';

export const useContentApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch page content sections
  const getPageContent = async (page: string): Promise<PageContent[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page', page);
        
      if (error) throw error;
      
      return data as PageContent[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch page content';
      setError(errorMessage);
      console.error('Error fetching page content:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Update a specific content section
  const updatePageContent = async (id: string, content: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('page_content')
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update content';
      setError(errorMessage);
      console.error('Error updating content:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get site settings
  const getSiteSettings = async (): Promise<SiteSetting[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
        
      if (error) throw error;
      
      return data as SiteSetting[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch site settings';
      setError(errorMessage);
      console.error('Error fetching site settings:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Update a site setting
  const updateSiteSetting = async (id: string, value: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ 
          value,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
        
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update site setting';
      setError(errorMessage);
      console.error('Error updating site setting:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    getPageContent,
    updatePageContent,
    getSiteSettings,
    updateSiteSetting
  };
};