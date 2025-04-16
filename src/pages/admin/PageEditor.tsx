import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import Editor from '../../components/Editor';
import { useContentApi } from '../../hooks/useContentApi';
import { PageContent } from '../../types';

const PageEditor: React.FC = () => {
  const { pageName } = useParams<{ pageName: string }>();
  const [isEditing, setIsEditing] = useState(true);
  const [contentSections, setContentSections] = useState<PageContent[]>([]);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});
  
  const { getPageContent, updatePageContent, isLoading, error } = useContentApi();

  useEffect(() => {
    const fetchContent = async () => {
      if (pageName) {
        const data = await getPageContent(pageName);
        setContentSections(data);
        
        // Initialize edited content
        const initialContent: Record<string, string> = {};
        data.forEach(section => {
          initialContent[section.id] = section.content;
        });
        setEditedContent(initialContent);
      }
    };

    fetchContent();
  }, [pageName, getPageContent]);

  const handleContentChange = (id: string, content: string) => {
    setEditedContent(prev => ({
      ...prev,
      [id]: content
    }));
  };

  const handleSave = async () => {
    const promises = Object.entries(editedContent).map(([id, content]) => {
      return updatePageContent(id, content);
    });
    
    await Promise.all(promises);
  };

  const togglePreview = () => {
    setIsEditing(!isEditing);
  };

  const getPageTitle = () => {
    switch (pageName) {
      case 'home':
        return 'Home Page';
      case 'projects':
        return 'Projects Page';
      case 'about':
        return 'About Page';
      default:
        return 'Page Editor';
    }
  };

  const renderContentSections = () => {
    // Group content sections by their key for better organization
    const groupedSections: Record<string, PageContent> = {};
    contentSections.forEach(section => {
      groupedSections[section.section_key] = section;
    });

    return (
      <div className="space-y-8">
        {Object.entries(groupedSections).map(([key, section]) => {
          // Format the section key for display
          const formattedKey = key
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <div key={section.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">{formattedKey}</h3>
              
              {isEditing ? (
                <Editor
                  initialValue={editedContent[section.id] || section.content}
                  onChange={(content) => handleContentChange(section.id, content)}
                  inline={key.includes('title') || key.includes('subtitle')}
                  height={key.includes('title') || key.includes('subtitle') ? 100 : 300}
                />
              ) : (
                <div 
                  className="prose max-w-none bg-gray-50 p-4 rounded-md"
                  dangerouslySetInnerHTML={{ __html: editedContent[section.id] || section.content }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AdminLayout 
      title={`Edit ${getPageTitle()}`}
      isEditing={isEditing}
      onTogglePreview={togglePreview}
      onSave={handleSave}
    >
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="loader"></div>
            <p className="ml-2">Loading page content...</p>
          </div>
        ) : contentSections.length === 0 ? (
          <div className="bg-yellow-50 text-yellow-700 p-4 rounded-md">
            No content sections found for this page.
          </div>
        ) : (
          renderContentSections()
        )}
      </div>
    </AdminLayout>
  );
};

export default PageEditor;