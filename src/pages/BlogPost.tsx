
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useBlogPostData } from '@/hooks/useBlogPostData';
import { useBlogPostSEO } from '@/hooks/useBlogPostSEO';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostCTA from '@/components/blog/BlogPostCTA';

const BlogPost = () => {
  const { slug } = useParams();
  const { blogPosts } = useBlogPostData();
  
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : undefined;
  
  useBlogPostSEO(post, slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back to Blog */}
        <Link to="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-6 sm:mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>

        <BlogPostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          readTime={post.readTime}
          image={post.image}
          imageAlt={post.imageAlt}
        />

        <BlogPostContent
          introduction={post.content.introduction}
          sections={post.content.sections}
          conclusion={post.content.conclusion}
        />

        <BlogPostCTA slug={slug || ''} />
      </div>
    </div>
  );
};

export default BlogPost;
