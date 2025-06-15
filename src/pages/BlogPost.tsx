
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();

  // Blog post data - in a real app, this would come from a CMS or API
  const blogPosts = {
    'hex-bar-setup-acft-deadlift': {
      title: 'How to Properly Set Up a Hex Bar for the ACFT Deadlift',
      description: 'Master the proper technique and setup for maximizing your ACFT deadlift performance with a hex bar. Essential tips for form, safety, and scoring higher.',
      date: '2024-12-15',
      author: 'ACFT Expert',
      readTime: '8 min read',
      content: {
        introduction: 'The 3-Repetition Maximum Deadlift (MDL) is the first event in the Army Combat Fitness Test, and proper hex bar setup is crucial for both performance and safety. This comprehensive guide will walk you through every aspect of setting up and executing the perfect ACFT deadlift.',
        sections: [
          {
            title: 'Understanding the Hex Bar',
            content: 'The hex bar (also called a trap bar) is specifically designed for the ACFT deadlift. Unlike a traditional straight barbell, the hex bar allows you to step inside the frame, positioning the weight around your center of gravity rather than in front of your body. This design reduces stress on your lower back and allows for more natural movement patterns.'
          },
          {
            title: 'Proper Hex Bar Setup',
            content: 'Begin by ensuring the hex bar is loaded with the appropriate weight plates. The bar should be positioned on a flat, stable surface with enough clearance around all sides. Check that weight plates are evenly distributed and properly secured with collars to prevent sliding during the lift.'
          },
          {
            title: 'Foot Positioning and Stance',
            content: 'Step into the center of the hex bar with your feet positioned shoulder-width apart. Your feet should be parallel to each other, pointing straight ahead. The bar should be positioned over the middle of your feet, not your toes. This central positioning is crucial for maintaining balance and generating maximum power.'
          },
          {
            title: 'Grip and Hand Placement',
            content: 'Reach down and grab the handles with a firm, overhand grip. Your hands should be positioned evenly on the handles, and your grip should be secure but not overly tense. Keep your arms straight and shoulders directly over the bar. Avoid using straps or other grip aids unless specifically permitted for your test.'
          },
          {
            title: 'Body Positioning and Form',
            content: 'Before lifting, ensure your chest is up, shoulders back, and core engaged. Your back should maintain its natural curve - avoid rounding or excessive arching. Your knees should be bent with your thighs parallel to the ground or slightly higher. Keep your head in a neutral position, looking straight ahead or slightly upward.'
          },
          {
            title: 'The Lifting Movement',
            content: 'Initiate the lift by driving through your heels and extending your hips and knees simultaneously. Keep the bar close to your body throughout the movement. As you stand up, focus on pushing the ground away with your feet rather than pulling the bar up. Maintain a straight back and keep your core tight throughout the entire lift.'
          },
          {
            title: 'Lockout and Completion',
            content: 'Complete the lift by standing fully upright with your hips and knees extended. Your shoulders should be back and chest up. Hold this position momentarily to demonstrate control before carefully lowering the weight back to the starting position. Maintain control during the descent - never drop or slam the weight.'
          },
          {
            title: 'Common Mistakes to Avoid',
            content: 'Avoid these common errors: stepping too close to or too far from the handles, rounding your back during the lift, looking down or craning your neck upward, lifting the bar away from your body, and rushing through the movement without proper control.'
          },
          {
            title: 'Safety Considerations',
            content: 'Always warm up thoroughly before attempting your maximum lifts. Use proper progression when building up to your 3RM weight. Ensure you have adequate space around the lifting area and that all equipment is in good working condition. Listen to your body and stop if you experience any pain or discomfort.'
          },
          {
            title: 'Training Tips for ACFT Success',
            content: 'Practice the hex bar deadlift regularly as part of your training routine. Focus on progressive overload, gradually increasing weight over time. Include accessory exercises like squats, hip hinges, and core strengthening work. Practice the exact setup and timing you\'ll use during the actual test to build familiarity and confidence.'
          }
        ],
        conclusion: 'Mastering the hex bar setup for the ACFT deadlift requires attention to detail, consistent practice, and a focus on proper form over maximum weight. By following these guidelines and maintaining a disciplined approach to training, you\'ll be well-prepared to achieve your best possible score on this crucial ACFT event.'
      }
    }
  };

  const post = blogPosts[slug as keyof typeof blogPosts];

  React.useEffect(() => {
    if (post) {
      document.title = `${post.title} | ACFT Calculator Blog`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description);
      }

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://acft-calculator.com/blog/${slug}`);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `https://acft-calculator.com/blog/${slug}`);
        document.head.appendChild(canonical);
      }

      // Add article structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "ACFT Calculator",
          "url": "https://acft-calculator.com"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://acft-calculator.com/blog/${slug}`
        },
        "articleSection": "Fitness",
        "keywords": "ACFT, deadlift, hex bar, Army Combat Fitness Test, military fitness, training"
      };

      let scriptTag = document.querySelector('script[type="application/ld+json"][data-article]');
      if (scriptTag) {
        scriptTag.textContent = JSON.stringify(structuredData);
      } else {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.setAttribute('data-article', 'true');
        scriptTag.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptTag);
      }
    }
  }, [post, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <Link to="/blog" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center space-x-6 text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed mb-6">
            {post.content.introduction}
          </p>

          {post.content.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-foreground leading-relaxed">
                {section.content}
              </p>
            </section>
          ))}

          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-3">Conclusion</h3>
            <p className="text-foreground leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-primary/5 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Test Your ACFT Deadlift Score?
          </h3>
          <p className="text-muted-foreground mb-6">
            Use our ACFT calculator to see how your deadlift performance translates to points.
          </p>
          <Link to="/calculator">
            <Button size="lg">
              Calculate Your Score
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
