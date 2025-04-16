import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Grid, FileText, Settings, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout title="Dashboard">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Projects</h2>
              <Grid size={24} className="text-indigo-500" />
            </div>
            <p className="text-3xl font-bold mt-2">20</p>
            <div className="mt-4">
              <Link
                to="/admin/projects"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <span>Manage projects</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Pages</h2>
              <FileText size={24} className="text-indigo-500" />
            </div>
            <p className="text-3xl font-bold mt-2">3</p>
            <div className="mt-4">
              <Link
                to="/admin/pages"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <span>Edit pages</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Settings</h2>
              <Settings size={24} className="text-indigo-500" />
            </div>
            <p className="text-3xl font-bold mt-2">Global</p>
            <div className="mt-4">
              <Link
                to="/admin/settings"
                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                <span>Manage settings</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/projects/new"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <h3 className="font-medium text-gray-800">Add New Project</h3>
              <p className="text-gray-600 text-sm mt-1">Create a new portfolio project</p>
            </Link>
            
            <Link
              to="/admin/pages/home"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <h3 className="font-medium text-gray-800">Edit Home Page</h3>
              <p className="text-gray-600 text-sm mt-1">Update your homepage content</p>
            </Link>
            
            <Link
              to="/admin/pages/about"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <h3 className="font-medium text-gray-800">Edit About Page</h3>
              <p className="text-gray-600 text-sm mt-1">Update your about information</p>
            </Link>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Welcome to the Admin Dashboard</h2>
          <p className="text-indigo-600">
            Use this dashboard to manage your portfolio content. You can add or edit projects, update page content, and change global site settings.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;