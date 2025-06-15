
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ArrowRight, Target, Trophy, Users, Clock } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: "Complete Event Scoring",
      description: "Score all 6 ACFT events: Deadlift, Standing Power Throw, Hand-Release Push-ups, Sprint-Drag-Carry, Plank, and 2-Mile Run.",
      icon: Target
    },
    {
      title: "Instant Results",
      description: "Get your total score and fitness category immediately with detailed breakdowns and performance insights.",
      icon: Clock
    },
    {
      title: "Mobile Optimized",
      description: "Access your ACFT calculator anywhere with our responsive, mobile-friendly design.",
      icon: Users
    },
    {
      title: "Accurate Scoring",
      description: "Based on official Army Combat Fitness Test standards and scoring tables for precise results.",
      icon: Trophy
    }
  ];

  // Enhanced SEO for home page
  React.useEffect(() => {
    // Update canonical URL with correct domain
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://acftscore.one/');
    }

    // Add enhanced structured data for home page
    const websiteStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "ACFT Calculator",
      "alternateName": "Army Combat Fitness Test Calculator",
      "url": "https://acftscore.one",
      "description": "Free Army Combat Fitness Test calculator with comprehensive guide for all 6 ACFT events including deadlift, power throw, push-ups, sprint-drag-carry, plank, and 2-mile run",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://acftscore.one/calculator",
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ACFT Calculator",
        "url": "https://acftscore.one"
      }
    };

    let websiteScript = document.querySelector('script[data-website="true"]') as HTMLScriptElement;
    if (websiteScript) {
      websiteScript.textContent = JSON.stringify(websiteStructuredData);
    } else {
      websiteScript = document.createElement('script');
      websiteScript.type = 'application/ld+json';
      websiteScript.setAttribute('data-website', 'true');
      websiteScript.textContent = JSON.stringify(websiteStructuredData);
      document.head.appendChild(websiteScript);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="min-h-screen bg-background" itemScope itemType="https://schema.org/WebApplication">
      {/* Hero Section with enhanced SEO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6" itemProp="name">
              Free ACFT Calculator - Army Combat Fitness Test Score Calculator
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto" itemProp="description">
              Calculate your Army Combat Fitness Test score instantly with our professional, 
              accurate, and easy-to-use calculator. Get instant scoring for all 6 ACFT events with official Army standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/calculator">
                <Button size="lg" className="acft-button flex items-center space-x-2" title="Free ACFT Score Calculator">
                  <Calculator className="h-5 w-5" />
                  <span>Calculate ACFT Score</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/blog" className="text-primary hover:text-acft-yellow-400 underline font-medium">
                Read ACFT Training Tips →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with enhanced SEO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our ACFT Calculator?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get accurate, reliable ACFT scoring with our professional-grade calculator designed specifically for military personnel and Army Combat Fitness Test preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="acft-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl font-semibold text-foreground">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About ACFT Section with enhanced content and internal linking */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About the Army Combat Fitness Test (ACFT)
            </h2>
            <p className="text-lg text-muted-foreground">
              The ACFT is the Army's premier physical fitness test, designed to better connect fitness with combat readiness. 
              Learn about all 6 events and how they impact your military career and promotion points.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card rounded-xl border border-border p-8 shadow-md transition-shadow">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Six Event Assessment</h3>
              <ul className="space-y-3 text-foreground">
                <li>• <strong>3-Repetition Maximum Deadlift (MDL)</strong> - Tests muscular strength and functional movement</li>
                <li>• <strong>Standing Power Throw (SPT)</strong> - Tests explosive power and coordination</li>
                <li>• <strong>Hand-Release Push-ups (HRP)</strong> - Tests muscular endurance and upper body strength</li>
                <li>• <strong>Sprint-Drag-Carry (SDC)</strong> - Tests anaerobic capacity and functional fitness</li>
                <li>• <strong>Plank (PLK)</strong> - Tests core strength and stability</li>
                <li>• <strong>2-Mile Run (2MR)</strong> - Tests aerobic endurance and cardiovascular fitness</li>
              </ul>
              <div className="mt-6">
                <Link 
                  to="/blog/what-is-acft-comprehensive-overview" 
                  className="text-primary hover:text-acft-yellow-400 underline font-medium"
                  title="Complete ACFT Guide - Learn about all 6 events"
                >
                  Read our comprehensive ACFT guide →
                </Link>
              </div>
            </div>
            <div className="bg-muted border border-border rounded-lg p-6 text-foreground">
              <h4 className="text-xl font-semibold mb-4">ACFT Scoring Information</h4>
              <p className="mb-4">
                Each event is scored on a 0-100 point scale. The minimum passing score is 60 points per event, 
                with a total minimum score of 360 points. Your ACFT score directly impacts your promotion points and military career advancement.
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                Fitness categories range from Gray (360-449) to Gold (540-600), with each category affecting your career progression differently.
              </p>
              <Link to="/calculator">
                <Button className="w-full acft-button mb-3" title="Calculate your ACFT score now">
                  Start Calculating Your Score
                </Button>
              </Link>
              <Link 
                to="/blog/understanding-acft-score-chart-promotion-points" 
                className="block text-center text-primary hover:text-acft-yellow-400 underline text-sm"
                title="Learn how ACFT scores affect promotion points"
              >
                Learn about promotion points →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced SEO Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete ACFT Training Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to excel in the Army Combat Fitness Test. From scoring calculators to training guides, 
              we provide comprehensive resources for military personnel at all fitness levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">ACFT Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Free online calculator for all 6 ACFT events. Get instant scores and fitness category determination.
              </p>
              <Link to="/calculator" className="text-primary hover:text-acft-yellow-400 underline">
                Try Calculator →
              </Link>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Training Guides</h3>
              <p className="text-muted-foreground mb-4">
                Expert tips and techniques for each ACFT event to maximize your performance and scores.
              </p>
              <Link to="/blog" className="text-primary hover:text-acft-yellow-400 underline">
                Read Guides →
              </Link>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Score Chart</h3>
              <p className="text-muted-foreground mb-4">
                Understand ACFT scoring standards, fitness categories, and promotion point implications.
              </p>
              <Link to="/blog/understanding-acft-score-chart-promotion-points" className="text-primary hover:text-acft-yellow-400 underline">
                View Chart →
              </Link>
            </div>
          </div>

          {/* Additional SEO content */}
          <div className="bg-muted/30 rounded-lg p-8 border">
            <h3 className="text-2xl font-bold text-foreground mb-4 text-center">
              ACFT Events Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Strength Events</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <strong>3-Rep Max Deadlift:</strong> 140-340 lbs range</li>
                  <li>• <strong>Standing Power Throw:</strong> 4.5-12.5 meter range</li>
                  <li>• <strong>Hand-Release Push-ups:</strong> 10-57+ repetitions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Endurance Events</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <strong>Sprint-Drag-Carry:</strong> Variable time standards</li>
                  <li>• <strong>Plank Hold:</strong> 1:30-4:20+ minute range</li>
                  <li>• <strong>2-Mile Run:</strong> Age and gender specific times</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link 
                to="/blog/what-is-acft-comprehensive-overview"
                className="text-primary hover:text-acft-yellow-400 underline font-medium"
              >
                Learn detailed event requirements and standards →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Calculate Your ACFT Score?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with our professional ACFT calculator and track your fitness progress today. 
            Calculate scores for all 6 events and understand your fitness category and promotion point impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button size="lg" className="acft-button" title="Free ACFT Calculator - All 6 Events">
                Calculate Now
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" size="lg" title="ACFT Training Tips and Guides">
                Read Training Tips
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
