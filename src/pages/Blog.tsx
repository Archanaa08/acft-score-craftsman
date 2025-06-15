
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
      date: '2025-06-15',
      author: 'ACFT Expert',
      readTime: '12 min read',
      slug: 'what-is-acft-comprehensive-overview',
      image: '/lovable-uploads/5dcb0e4b-2081-4b32-b670-8abdd30173e4.png',
      imageAlt: 'Army Combat Fitness Test overview showing all six ACFT events with American flag'
    },
    {
      id: 'understanding-acft-score-chart-promotion-points',
      title: 'Understanding the ACFT Score Chart and Its Impact on Promotion Points',
      description: 'Comprehensive guide to ACFT scoring system, fitness categories, and how your test performance directly affects promotion points and career advancement in the Army.',
      date: '2025-06-10',
      author: 'ACFT Expert',
      readTime: '10 min read',
      slug: 'understanding-acft-score-chart-promotion-points',
      image: '/lovable-uploads/dd74196a-5ff2-48ca-a8d3-f6edec3b3cf7.png',
      imageAlt: 'ACFT score chart showing Gold and Gray categories, fitness and promotion icons',
    },
    {
      id: 'hex-bar-setup-acft-deadlift',
      title: 'How to Properly Set Up a Hex Bar for the ACFT Deadlift',
      description: 'Learn the proper technique and setup for maximizing your ACFT deadlift performance with a hex bar. Essential tips for proper form and safety.',
      date: '2025-06-05',
      author: 'ACFT Expert',
      readTime: '8 min read',
      slug: 'hex-bar-setup-acft-deadlift',
      image: '/lovable-uploads/2b37379a-0179-4f48-8f6a-e61f55a5549a.png',
      imageAlt: 'Army soldier demonstrating hex bar deadlift setup: grip, stance, safety for ACFT event'
    }
  ];

  // Enhanced SEO meta updates
  React.useEffect(() => {
    document.title = 'ACFT Blog - Army Combat Fitness Test Tips & Guides | ACFT Calculator';
    
    // Update meta description with more keywords
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Expert ACFT tips, training guides, and fitness advice for the Army Combat Fitness Test. Learn proper techniques for all 6 ACFT events to maximize your score and promotion points.');
    }

    // Update canonical URL with correct domain
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://acftscore.one/blog');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://acftsore.one/blog');
      document.head.appendChild(canonical);
    }

    // Add structured data for Blog page
    const blogStructuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "ACFT Calculator Blog",
      "description": "Expert tips, training guides, and insights for the Army Combat Fitness Test",
      "url": "https://acftscore.one/blog",
      "publisher": {
        "@type": "Organization",
        "name": "ACFT Calculator",
        "url": "https://acftscore.one"
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": blogPosts.map((post, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Article",
            "headline": post.title,
            "description": post.description,
            "url": `https://acftscore.one/blog/${post.slug}`,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author
            }
          }
        }))
      }
    };

    let blogScript = document.querySelector('script[data-blog="true"]') as HTMLScriptElement;
    if (blogScript) {
      blogScript.textContent = JSON.stringify(blogStructuredData);
    } else {
      blogScript = document.createElement('script');
      blogScript.type = 'application/ld+json';
      blogScript.setAttribute('data-blog', 'true');
      blogScript.textContent = JSON.stringify(blogStructuredData);
      document.head.appendChild(blogScript);
    }

    // Return cleanup function
    return () => {
      // Optional cleanup if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" itemScope itemType="https://schema.org/Blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header with enhanced SEO */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 acft-blog-highlight" itemProp="name">
            ACFT Blog - Army Combat Fitness Test Guide
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4" itemProp="description">
            <span className="acft-blog-highlight">Expert tips, training guides, and insights</span> to help you excel in the Army Combat Fitness Test. Learn proper techniques for all 6 ACFT events including deadlift, power throw, push-ups, sprint-drag-carry, plank, and 2-mile run.
          </p>
          
          {/* Enhanced internal linking for SEO */}
          <div className="mt-6 flex justify-center">
            <Link 
              to="/calculator"
              className="text-primary hover:text-acft-yellow-400 underline font-medium"
              title="Calculate your ACFT score with our professional calculator"
            >
              Try our free ACFT Calculator →
            </Link>
          </div>
        </div>

        {/* Blog Posts Grid with enhanced SEO markup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" itemScope itemType="https://schema.org/ItemList">
          {blogPosts.map((post, index) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden acft-blog-card-highlight" itemScope itemType="https://schema.org/Article" itemProp="itemListElement">
              <meta itemProp="position" content={String(index + 1)} />
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  itemProp="image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
              <CardHeader className="p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 acft-blog-highlight" />
                    <time dateTime={post.date} itemProp="datePublished">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 acft-blog-highlight" />
                    <span itemProp="author" itemScope itemType="https://schema.org/Person">
                      <span itemProp="name">{post.author}</span>
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl mb-2 line-clamp-2 leading-tight acft-blog-highlight" itemProp="headline">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3 text-sm sm:text-base" itemProp="description">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center space-x-1 text-primary hover:text-acft-yellow-400 font-medium transition-colors text-sm sm:text-base"
                    title={`Read: ${post.title}`}
                    itemProp="url"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4 acft-blog-highlight" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Call to Action with internal linking */}
        <div className="mt-12 sm:mt-16 text-center bg-muted/30 rounded-lg p-6 sm:p-8 mx-4 sm:mx-0 border dark:border-acft-yellow-400">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 acft-blog-highlight">
            Ready to Calculate Your ACFT Score?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our professional <Link to="/calculator" className="text-primary underline hover:text-acft-yellow-400">ACFT calculator</Link> to determine your fitness category and track your progress. Calculate scores for all 6 events including deadlift, power throw, push-ups, sprint-drag-carry, plank, and 2-mile run.
          </p>
          <Link 
            to="/calculator"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-acft-yellow-600 transition-colors acft-blog-highlight"
            title="Free ACFT Score Calculator - Calculate all 6 events"
          >
            <span>Try Calculator</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Additional SEO content section */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Army Combat Fitness Test Resources
          </h2>
          <p className="text-muted-foreground mb-6">
            Our comprehensive ACFT resources help military personnel understand the Army Combat Fitness Test scoring system, 
            learn proper event techniques, and track their fitness progress. Whether you're preparing for your first ACFT 
            or looking to improve your promotion points, our tools and guides provide the information you need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">ACFT Events</h3>
              <p className="text-muted-foreground">Learn about all 6 ACFT events: Deadlift, Power Throw, Push-ups, Sprint-Drag-Carry, Plank, and 2-Mile Run</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Score Calculator</h3>
              <p className="text-muted-foreground">Free online calculator to determine your ACFT total score and fitness category</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Training Tips</h3>
              <p className="text-muted-foreground">Expert advice on proper form, training techniques, and performance improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
