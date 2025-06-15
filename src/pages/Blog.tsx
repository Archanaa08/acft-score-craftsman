
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 'what-is-acft-comprehensive-overview',
      title: 'What is ACFT? A Comprehensive Overview of the Army Combat Fitness Test',
      description: 'Complete beginner\'s guide to the Army Combat Fitness Test (ACFT). Learn about all 6 events, ACFT score chart, scoring system, and how it impacts promotion points in your military career.',
      date: '2024-12-17',
      author: 'ACFT Expert',
      readTime: '12 min read',
      slug: 'what-is-acft-comprehensive-overview'
    },
    {
      id: 'understanding-acft-score-chart-promotion-points',
      title: 'Understanding the ACFT Score Chart and Its Impact on Promotion Points',
      description: 'Comprehensive guide to ACFT scoring system, fitness categories, and how your test performance directly affects promotion points and career advancement in the Army.',
      date: '2024-12-16',
      author: 'ACFT Expert',
      readTime: '10 min read',
      slug: 'understanding-acft-score-chart-promotion-points'
    },
    {
      id: 'hex-bar-setup-acft-deadlift',
      title: 'How to Properly Set Up a Hex Bar for the ACFT Deadlift',
      description: 'Learn the proper technique and setup for maximizing your ACFT deadlift performance with a hex bar. Essential tips for proper form and safety.',
      date: '2024-12-15',
      author: 'ACFT Expert',
      readTime: '8 min read',
      slug: 'hex-bar-setup-acft-deadlift'
    }
  ];

  // Handle SEO meta updates
  React.useEffect(() => {
    document.title = 'ACFT Blog - Army Combat Fitness Test Tips & Guides | ACFT Calculator';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert ACFT tips, training guides, and fitness advice for the Army Combat Fitness Test. Learn proper techniques for all 6 ACFT events to maximize your score.');
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://acft-calculator.com/blog');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://acft-calculator.com/blog');
      document.head.appendChild(canonical);
    }

    // Return cleanup function
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            ACFT Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert tips, training guides, and insights to help you excel in the Army Combat Fitness Test
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2 line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Calculate Your ACFT Score?
          </h2>
          <p className="text-muted-foreground mb-6">
            Use our professional ACFT calculator to determine your fitness category and track your progress.
          </p>
          <Link 
            to="/calculator"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            <span>Try Calculator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
