// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import React from 'react';
import { InstagramIcon, TwitterIcon, LinkedinIcon, GithubIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} DesignStudio. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <InstagramIcon size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <TwitterIcon size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <LinkedinIcon size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
              <GithubIcon size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;