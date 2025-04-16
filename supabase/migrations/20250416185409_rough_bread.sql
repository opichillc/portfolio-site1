/*
  # Initial schema for portfolio CMS

  1. New Tables
    - `users` - Admin users with email/password authentication
    - `projects` - Store portfolio project data
    - `page_content` - Store editable text content for pages
    - `site_settings` - Store global site settings like logo, footer links
  
  2. Security
    - Enable RLS on all tables
    - Add policies to restrict access to authenticated users
*/

-- Projects table to replace static project data
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  description text,
  client text,
  year text,
  timeline text,
  services text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Page content table for editable text sections
CREATE TABLE IF NOT EXISTS page_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section_key text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section_key)
);

-- Site settings table for global configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Authenticated users can read projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can modify projects"
  ON projects
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read page content"
  ON page_content
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify page content"
  ON page_content
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read site settings"
  ON site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can modify site settings"
  ON site_settings
  USING (auth.role() = 'authenticated');

-- Initial seed data for site settings
INSERT INTO site_settings (key, value) 
VALUES 
  ('site_name', 'DesignStudio'),
  ('footer_copyright', '© 2025 DesignStudio. All rights reserved.'),
  ('instagram_link', '#'),
  ('twitter_link', '#'),
  ('linkedin_link', '#'),
  ('github_link', '#');

-- Initial seed data for page content
INSERT INTO page_content (page, section_key, content)
VALUES
  ('home', 'title', 'Creative Design Portfolio'),
  ('home', 'subtitle', 'Explore a collection of innovative design projects showcasing creativity and attention to detail.'),
  ('projects', 'title', 'Project Gallery'),
  ('projects', 'subtitle', 'Browse through our diverse collection of design work.'),
  ('about', 'designer_name', 'Jane Doe'),
  ('about', 'designer_title', 'Graphic Designer & Art Director'),
  ('about', 'designer_bio', 'With over 10 years of experience in the design industry, I specialize in creating compelling visual identities and thoughtful design solutions that help brands communicate effectively with their audience.'),
  ('about', 'designer_email', 'jane.doe@designstudio.com'),
  ('about', 'designer_phone', '+1 (555) 123-4567'),
  ('about', 'designer_location', 'New York City, NY'),
  ('about', 'about_me', '<p>I''m a passionate designer who believes in the power of visual communication to transform how we experience the world. My design approach combines strategic thinking with aesthetic sensibility to create meaningful, impactful work.</p><p>After graduating from the Rhode Island School of Design, I spent several years working with leading agencies in New York before establishing my independent design practice. My work has been recognized by major design publications and has won several industry awards.</p><p>When I''m not designing, you can find me exploring art galleries, photographing urban architecture, or experimenting with new creative techniques in my studio.</p>');