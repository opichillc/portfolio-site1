// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    'Graphic Design', 'UI/UX Design', 'Brand Identity', 
    'Typography', 'Illustration', 'Print Design', 
    'Packaging Design', 'Motion Graphics', 'Web Design'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Designer Profile */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:shrink-0">
                <img 
                  src="https://source.unsplash.com/random/600x800?portrait,designer" 
                  alt="Designer portrait" 
                  className="h-full w-full object-cover md:w-48"
                />
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Jane Doe</h1>
                <h2 className="text-xl text-indigo-600 mb-4">Graphic Designer & Art Director</h2>
                <p className="text-gray-600 mb-6">
                  With over 10 years of experience in the design industry, I specialize in creating
                  compelling visual identities and thoughtful design solutions that help brands
                  communicate effectively with their audience.
                </p>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Mail size={18} className="mr-2 text-indigo-600" />
                    <span>jane.doe@designstudio.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={18} className="mr-2 text-indigo-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2 text-indigo-600" />
                    <span>New York City, NY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I'm a passionate designer who believes in the power of visual communication
                to transform how we experience the world. My design approach combines strategic
                thinking with aesthetic sensibility to create meaningful, impactful work.
              </p>
              <p>
                After graduating from the Rhode Island School of Design, I spent several years
                working with leading agencies in New York before establishing my independent
                design practice. My work has been recognized by major design publications and
                has won several industry awards.
              </p>
              <p>
                When I'm not designing, you can find me exploring art galleries, photographing
                urban architecture, or experimenting with new creative techniques in my studio.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">Brand Identity</h3>
                <p className="text-gray-600">
                  Comprehensive brand identity development including logo design, brand guidelines,
                  and visual identity systems.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">Print Design</h3>
                <p className="text-gray-600">
                  Design for various print media including stationery, packaging, publications,
                  and promotional materials.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">Digital Design</h3>
                <p className="text-gray-600">
                  User interface design, web design, social media assets, and digital marketing materials.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">Art Direction</h3>
                <p className="text-gray-600">
                  Creative direction for photoshoots, campaigns, and visual storytelling projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;