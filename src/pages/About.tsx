
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Target, Users, Shield } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Calculator,
      title: "Accurate Calculations",
      description: "Based on official ACFT scoring standards and regularly updated to reflect current Army regulations."
    },
    {
      icon: Target,
      title: "Purpose-Built",
      description: "Designed specifically for military personnel and fitness enthusiasts preparing for the ACFT."
    },
    {
      icon: Users,
      title: "User-Friendly",
      description: "Intuitive interface that makes calculating your ACFT score quick and straightforward."
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data stays on your device. We don't store personal information or fitness scores."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About ACFT Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A professional tool designed to help military personnel accurately calculate 
            their Army Combat Fitness Test scores.
          </p>
        </div>

        <div className="space-y-12">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                The ACFT Calculator was created to provide military personnel with a reliable, 
                accurate, and easy-to-use tool for calculating Army Combat Fitness Test scores. 
                We understand the importance of fitness readiness in military service and aim to 
                support soldiers in tracking their progress and achieving their fitness goals.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Why Choose Our Calculator?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* About ACFT */}
          <Card>
            <CardHeader>
              <CardTitle>About the Army Combat Fitness Test</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-4">
              <p className="text-muted-foreground">
                The Army Combat Fitness Test (ACFT) is the Army's premier physical fitness assessment, 
                replacing the Army Physical Fitness Test (APFT). It consists of six events designed to 
                measure a soldier's physical readiness for combat operations.
              </p>
              <p className="text-muted-foreground">
                The ACFT better reflects the physical demands soldiers face in combat and operational 
                environments, testing muscular strength, endurance, power, speed, agility, and cardiovascular fitness.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-200">Important Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                This calculator is not affiliated with the U.S. Army and is provided for informational 
                purposes only. While we strive for accuracy based on official ACFT standards, always 
                refer to official Army publications and consult with your unit's fitness personnel for 
                authoritative information regarding ACFT requirements and scoring.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
