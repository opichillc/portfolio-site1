import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  initialValue: string;
  onChange: (content: string) => void;
  inline?: boolean;
  height?: number;
}

const Editor: React.FC<EditorProps> = ({ 
  initialValue, 
  onChange, 
  inline = false,
  height = 500
}) => {
  // Configure toolbar based on inline mode
  const modules = {
    toolbar: inline 
      ? [['bold', 'italic'], ['link'], ['clean']]
      : [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']
        ]
  };

  // Format options
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'color', 'background',
    'align'
  ];

  return (
    <div className={inline ? 'quill-inline' : ''} style={{ height: inline ? 'auto' : height }}>
      <ReactQuill
        theme="snow"
        value={initialValue}
        onChange={onChange}
        modules={modules}
        formats={formats}
        style={{ 
          height: inline ? 'auto' : height - 42, // Adjust for toolbar height
          ...(inline && { border: 'none' })
        }}
      />

      <style jsx>{`
        /* Additional styles for Quill editor */
        .quill-inline .ql-toolbar {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        
        .quill-inline .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Editor;