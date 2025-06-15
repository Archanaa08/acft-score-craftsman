import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: "Complete Event Scoring",
      description: "Score all 6 ACFT events: Deadlift, Standing Power Throw, Hand-Release Push-ups, Sprint-Drag-Carry, Plank, and 2-Mile Run."
    },
    {
      title: "Instant Results",
      description: "Get your total score and fitness category immediately with detailed breakdowns and performance insights."
    },
    {
      title: "Mobile Optimized",
      description: "Access your ACFT calculator anywhere with our responsive, mobile-friendly design."
    },
    {
      title: "Accurate Scoring",
      description: "Based on official Army Combat Fitness Test standards and scoring tables."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              ACFT Calculator
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Calculate your Army Combat Fitness Test score instantly with our professional, 
              accurate, and easy-to-use calculator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/calculator">
                <Button size="lg" className="acft-button flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Calculate ACFT Score</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our ACFT Calculator?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get accurate, reliable ACFT scoring with our professional-grade calculator designed for military personnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="acft-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About ACFT Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              About the Army Combat Fitness Test
            </h2>
            <p className="text-lg text-muted-foreground">
              The ACFT is the Army's premier physical fitness test, designed to better connect fitness with combat readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Six Event Assessment</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• <strong>3-Repetition Maximum Deadlift (MDL)</strong> - Tests muscular strength</li>
                <li>• <strong>Standing Power Throw (SPT)</strong> - Tests explosive power</li>
                <li>• <strong>Hand-Release Push-ups (HRP)</strong> - Tests muscular endurance</li>
                <li>• <strong>Sprint-Drag-Carry (SDC)</strong> - Tests anaerobic capacity</li>
                <li>• <strong>Plank (PLK)</strong> - Tests core strength</li>
                <li>• <strong>2-Mile Run (2MR)</strong> - Tests aerobic endurance</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="text-xl font-semibold text-foreground mb-4">Scoring Information</h4>
              <p className="text-muted-foreground mb-4">
                Each event is scored on a 0-100 point scale. The minimum passing score is 60 points per event, 
                with a total minimum score of 360 points.
              </p>
              <Link to="/calculator">
                <Button className="w-full acft-button">
                  Start Calculating Your Score
                </Button>
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
          </p>
          <Link to="/calculator">
            <Button size="lg" className="acft-button">
              Calculate Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
