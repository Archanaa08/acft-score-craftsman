
import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

interface BlogPostHeaderProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
}

const BlogPostHeader = ({ title, description, date, author, readTime, image, imageAlt }: BlogPostHeaderProps) => {
  return (
    <header className="mb-6 sm:mb-8">
      {image && (
        <div className="aspect-video relative overflow-hidden rounded-lg mb-6 sm:mb-8">
          <img 
            src={image.replace('w=800&h=400', 'w=1200&h=600')} 
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-4 sm:mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm sm:text-base">{new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span className="text-sm sm:text-base">{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm sm:text-base">{readTime}</span>
        </div>
      </div>

      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    </header>
  );
};

export default BlogPostHeader;
