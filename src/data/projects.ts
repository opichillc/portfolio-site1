// IMPORTANT: Before modifying this file, please update CHANGELOG.md with a summary of your changes.
// Also, make clear comments about every change in this file and what it was replacing so that we
// don't end up trying the same fixes repeatedly.

import { Project } from '../types';

// Generate random heights for masonry layout
const getRandomHeight = (): number => {
  // Heights between 200px and 600px
  return Math.floor(Math.random() * 400) + 200;
};

// Array of Pexels image IDs for curated design/art images
const pexelsImageIds = [
  '1646953', '1279813', '1762851', '3568518', '3094799',
  '1036848', '1105666', '1579739', '3585094', '3137074',
  '2983881', '2166456', '1563256', '3705549', '3765274',
  '327509', '1482476', '3874342', '3764984', '691640',
  '1493226', '1910229', '3760529', '326503', '6444'
];

// Generate dummy projects data
export const generateProjects = (count: number): Project[] => {
  const categories = ['Branding', 'Web Design', 'Illustration', 'Typography', 'Packaging'];
  
  return Array.from({ length: count }, (_, i) => {
    // Get a random image ID from our curated list or fall back to a generated ID based on index
    const imageIndex = i % pexelsImageIds.length;
    const imageId = pexelsImageIds[imageIndex];
    
    return {
      id: i + 1,
      title: `Project ${i + 1}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      // Using Pexels for high-quality design/art images
      imageUrl: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1`,
      height: getRandomHeight(),
    };
  });
};

// Initial projects data
export const initialProjects = generateProjects(20);