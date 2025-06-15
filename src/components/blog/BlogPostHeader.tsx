
import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

interface BlogPostHeaderProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
}

const BlogPostHeader = ({ title, description, date, author, readTime }: BlogPostHeaderProps) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center space-x-6 text-muted-foreground mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>

      <p className="text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  );
};

export default BlogPostHeader;
