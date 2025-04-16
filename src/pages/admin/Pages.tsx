import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { FileText, ArrowRight } from 'lucide-react';

const Pages: React.FC = () => {
  const pages = [
    {
      name: 'Home',
      path: '/admin/pages/home',
      description: 'Edit the main homepage content, hero section, and intro text.',
      icon: <FileText size={24} className="text-indigo-500" />
    },
    {
      name: 'Projects',
      path: '/admin/pages/projects',
      description: 'Edit the projects page content, title, and description.',
      icon: <FileText size={24} className="text-indigo-500" />
    },
    {
      name: 'About',
      path: '/admin/pages/about',
      description: 'Edit the about page content, designer information, and services.',
      icon: <FileText size={24} className="text-indigo-500" />
    }
  ];

  return (
    <AdminLayout title="Pages">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map(page => (
            <Link
              key={page.name}
              to={page.path}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{page.name} Page</h2>
                {page.icon}
              </div>
              <p className="text-gray-600 mb-4">{page.description}</p>
              <div className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                <span>Edit page</span>
                <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Pages;