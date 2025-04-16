import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useContentApi } from '../../hooks/useContentApi';
import { SiteSetting } from '../../types';
import { InstagramIcon, TwitterIcon, LinkedinIcon, GithubIcon } from 'lucide-react';

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({});
  
  const { getSiteSettings, updateSiteSetting, isLoading, error } = useContentApi();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getSiteSettings();
      setSettings(data);
      
      // Initialize edited settings
      const initialSettings: Record<string, string> = {};
      data.forEach(setting => {
        initialSettings[setting.id] = setting.value;
      });
      setEditedSettings(initialSettings);
    };

    fetchSettings();
  }, [getSiteSettings]);

  const handleChange = (id: string, value: string) => {
    setEditedSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = async () => {
    const promises = Object.entries(editedSettings).map(([id, value]) => {
      return updateSiteSetting(id, value);
    });
    
    await Promise.all(promises);
  };

  const getSettingByKey = (key: string): SiteSetting | undefined => {
    return settings.find(setting => setting.key === key);
  };

  const renderSocialIcon = (key: string) => {
    switch (key) {
      case 'instagram_link':
        return <InstagramIcon size={20} className="text-gray-400" />;
      case 'twitter_link':
        return <TwitterIcon size={20} className="text-gray-400" />;
      case 'linkedin_link':
        return <LinkedinIcon size={20} className="text-gray-400" />;
      case 'github_link':
        return <GithubIcon size={20} className="text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout 
      title="Site Settings"
      onSave={handleSave}
    >
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="loader"></div>
            <p className="ml-2">Loading settings...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* General Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">General Settings</h2>
              
              <div className="space-y-4">
                {/* Site Name */}
                {getSettingByKey('site_name') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={editedSettings[getSettingByKey('site_name')!.id] || ''}
                      onChange={(e) => handleChange(getSettingByKey('site_name')!.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
                
                {/* Footer Copyright */}
                {getSettingByKey('footer_copyright') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Footer Copyright Text
                    </label>
                    <input
                      type="text"
                      value={editedSettings[getSettingByKey('footer_copyright')!.id] || ''}
                      onChange={(e) => handleChange(getSettingByKey('footer_copyright')!.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h2>
              
              <div className="space-y-4">
                {['instagram_link', 'twitter_link', 'linkedin_link', 'github_link'].map(key => {
                  const setting = getSettingByKey(key);
                  if (!setting) return null;
                  
                  // Format the key for display
                  const formattedKey = key
                    .replace('_link', '')
                    .charAt(0).toUpperCase() + key.replace('_link', '').slice(1);
                  
                  return (
                    <div key={setting.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formattedKey}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {renderSocialIcon(key)}
                        </div>
                        <input
                          type="url"
                          value={editedSettings[setting.id] || ''}
                          onChange={(e) => handleChange(setting.id, e.target.value)}
                          className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={`https://${key.replace('_link', '')}.com/username`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SiteSettings;