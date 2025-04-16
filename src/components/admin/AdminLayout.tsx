import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Palette, Grid, FileText, Settings, LogOut, Menu, X, Save, Edit, Eye } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  isEditing?: boolean;
  onSave?: () => Promise<void>;
  onTogglePreview?: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title,
  isEditing = false,
  onSave,
  onTogglePreview
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleSave = async () => {
    if (onSave) {
      setIsSaving(true);
      try {
        await onSave();
      } catch (error) {
        console.error('Error saving:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <Grid size={20} /> },
    { path: '/admin/projects', label: 'Projects', icon: <Grid size={20} /> },
    { path: '/admin/pages', label: 'Pages', icon: <FileText size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top navbar */}
      <header className="bg-white shadow-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                <Palette size={24} className="text-indigo-600" />
                <span className="font-bold text-gray-800">Admin</span>
              </Link>
              <span className="text-gray-400 mx-2">|</span>
              <h1 className="text-lg font-medium text-gray-700">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
              {onSave && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors duration-200"
                >
                  {isSaving ? (
                    <>
                      <div className="loader mr-1"></div>
                      <span>Saving</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              )}

              {onTogglePreview && (
                <button
                  onClick={onTogglePreview}
                  className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-sm transition-colors duration-200"
                >
                  {isEditing ? (
                    <>
                      <Eye size={16} />
                      <span>Preview</span>
                    </>
                  ) : (
                    <>
                      <Edit size={16} />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Sign Out</span>
              </button>

              <button 
                className="md:hidden text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200">
          <nav className="mt-4 px-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                      location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <Eye size={20} />
                <span>View Site</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute top-[68px] left-0 w-64 h-full bg-white" onClick={(e) => e.stopPropagation()}>
              <nav className="mt-4 px-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                          location.pathname === item.path
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Eye size={20} />
                    <span>View Site</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;