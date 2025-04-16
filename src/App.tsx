import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import ProjectManager from './pages/admin/ProjectManager';
import ProjectForm from './pages/admin/ProjectForm';
import Pages from './pages/admin/Pages';
import PageEditor from './pages/admin/PageEditor';
import SiteSettings from './pages/admin/SiteSettings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on an admin page
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // For public pages, handle navigation between pages
  const handlePageChange = (page: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'projects':
        navigate('/projects');
        break;
      case 'about':
        navigate('/about');
        break;
      default:
        navigate('/');
    }
  };
  
  // Get the active page based on current route
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/projects') return 'projects';
    if (path === '/about') return 'about';
    return 'home';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {!isAdminRoute && (
        <Header 
          activePage={getActivePage()} 
          setActivePage={handlePageChange} 
        />
      )}
      
      <main className={`flex-grow ${!isAdminRoute ? 'pt-0' : ''}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects" 
            element={
              <ProtectedRoute>
                <ProjectManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects/new" 
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/projects/edit/:id" 
            element={
              <ProtectedRoute>
                <ProjectForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/pages" 
            element={
              <ProtectedRoute>
                <Pages />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/pages/:pageName" 
            element={
              <ProtectedRoute>
                <PageEditor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <SiteSettings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;