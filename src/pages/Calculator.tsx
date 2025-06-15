
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator as CalculatorIcon, Info } from 'lucide-react';
import { useACFTCalculator } from '@/hooks/useACFTCalculator';
import ACFTScoreInput from '@/components/calculator/ACFTScoreInput';
import ACFTResults from '@/components/calculator/ACFTResults';
import ACFTGuide from '@/components/calculator/ACFTGuide';
import ACFTScoringInfo from '@/components/calculator/ACFTScoringInfo';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const {
    scores,
    setScores,
    ageGroup,
    setAgeGroup,
    gender,
    setGender,
    result,
    calculateACFT
  } = useACFTCalculator();

  // Enhanced SEO for calculator page
  React.useEffect(() => {
    document.title = 'ACFT Calculator - Free Army Combat Fitness Test Score Calculator | Calculate All 6 Events';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free ACFT Calculator for Army Combat Fitness Test. Calculate your total score for all 6 events: deadlift, power throw, push-ups, sprint-drag-carry, plank, and 2-mile run. Get instant fitness category and promotion points.');
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://acftscore.one/calculator');
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', 'https://acftscore.one/calculator');
      document.head.appendChild(canonical);
    }

    // Add calculator-specific structured data
    const calculatorStructuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "ACFT Calculator",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Any",
      "url": "https://acftscore.one/calculator",
      "description": "Free Army Combat Fitness Test calculator for all 6 ACFT events. Calculate your total score, fitness category, and promotion points impact.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "3-Repetition Maximum Deadlift scoring",
        "Standing Power Throw calculation",
        "Hand-Release Push-ups scoring",
        "Sprint-Drag-Carry evaluation",
        "Plank hold timing",
        "2-Mile Run performance",
        "Total score calculation",
        "Fitness category determination",
        "Promotion points calculation"
      ]
    };

    let calculatorScript = document.querySelector('script[data-calculator="true"]') as HTMLScriptElement;
    if (calculatorScript) {
      calculatorScript.textContent = JSON.stringify(calculatorStructuredData);
    } else {
      calculatorScript = document.createElement('script');
      calculatorScript.type = 'application/ld+json';
      calculatorScript.setAttribute('data-calculator', 'true');
      calculatorScript.textContent = JSON.stringify(calculatorStructuredData);
      document.head.appendChild(calculatorScript);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <>
      {/* SEO Content - Hidden but crawlable */}
      <div style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>ACFT Calculator - Army Combat Fitness Test Score Calculator</h1>
        <p>Free online ACFT calculator for Army Combat Fitness Test. Calculate your total score, fitness category, and understand each event with our comprehensive guide. Get accurate ACFT scoring for all six events including 3-rep max deadlift, standing power throw, hand-release push-ups, sprint-drag-carry, plank hold, and 2-mile run. Determine your fitness category (Gray, Green, Gold) and understand promotion points impact.</p>
        <h2>ACFT Events Included:</h2>
        <ul>
          <li>3-Repetition Maximum Deadlift (MDL) - Test muscular strength</li>
          <li>Standing Power Throw (SPT) - Test explosive power</li>
          <li>Hand-Release Push-ups (HRP) - Test muscular endurance</li>
          <li>Sprint-Drag-Carry (SDC) - Test anaerobic capacity</li>
          <li>Plank (PLK) - Test core strength</li>
          <li>2-Mile Run (2MR) - Test aerobic endurance</li>
        </ul>
        <h2>ACFT Scoring Standards</h2>
        <p>Each ACFT event is scored from 0-100 points. Minimum passing score is 60 points per event for a total minimum of 360 points. Fitness categories: Gray (360-449), Green (450-539), Gold (540-600).</p>
      </div>

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8" itemScope itemType="https://schema.org/WebApplication">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" itemProp="name">
              Free ACFT Calculator & Complete Event Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" itemProp="description">
              Calculate your Army Combat Fitness Test scores and learn about each event with our comprehensive guide. 
              Get accurate scoring for all six ACFT events and understand the proper techniques to maximize your performance and promotion points.
            </p>
            
            {/* Enhanced internal linking */}
            <div className="mt-4 text-sm text-muted-foreground">
              <span>New to ACFT? </span>
              <a href="/blog/what-is-acft-comprehensive-overview" className="text-primary hover:text-acft-yellow-400 underline">
                Read our beginner's guide
              </a>
              <span> or </span>
              <a href="/blog/understanding-acft-score-chart-promotion-points" className="text-primary hover:text-acft-yellow-400 underline">
                learn about promotion points
              </a>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <CalculatorIcon className="h-4 w-4" />
                ACFT Score Calculator
              </TabsTrigger>
              <TabsTrigger value="guide" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Complete Events Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-8">
              {/* Calculator Description for SEO */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">How to Use the ACFT Calculator</h2>
                <p className="text-muted-foreground text-sm">
                  Enter your performance for each of the 6 ACFT events below. Select your age group and gender for accurate scoring. 
                  The calculator will instantly provide your individual event scores, total score, fitness category (Gray/Green/Gold), 
                  and promotion points impact. All scoring is based on official Army Combat Fitness Test standards.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-2">
                  <ACFTScoreInput
                    scores={scores}
                    setScores={setScores}
                    ageGroup={ageGroup}
                    setAgeGroup={setAgeGroup}
                    gender={gender}
                    setGender={setGender}
                    onCalculate={calculateACFT}
                  />
                </div>

                {/* Results */}
                <div className="lg:col-span-1">
                  <ACFTResults result={result} />
                </div>
              </div>

              {/* Additional Calculator Info for SEO */}
              <div className="mt-12 bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">ACFT Calculator Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold mb-2">Accurate Scoring</h3>
                    <p className="text-muted-foreground">Based on official Army ACFT scoring standards with age and gender-specific calculations.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instant Results</h3>
                    <p className="text-muted-foreground">Get immediate feedback on your total score, fitness category, and individual event performance.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                    <p className="text-muted-foreground">Use the calculator on any device - desktop, tablet, or mobile phone.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Free to Use</h3>
                    <p className="text-muted-foreground">No registration required. Calculate your ACFT score as many times as needed.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guide" className="space-y-8">
              {/* Guide Description for SEO */}
              <div className="bg-muted/30 border border-border rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">Complete ACFT Events Guide</h2>
                <p className="text-muted-foreground text-sm">
                  Learn proper techniques, scoring standards, and training tips for all 6 Army Combat Fitness Test events. 
                  Our comprehensive guide covers everything from basic form to advanced training strategies for maximum performance.
                </p>
              </div>
              
              <ACFTGuide />
              <ACFTScoringInfo />
              
              {/* Additional Guide Content for SEO */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">ACFT Training Resources</h2>
                <p className="text-muted-foreground mb-4">
                  Maximize your ACFT performance with our expert training guides and tips. Learn proper form, 
                  understand scoring standards, and discover training strategies for each event.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="/blog/hex-bar-setup-acft-deadlift" className="block p-3 bg-muted rounded border hover:border-primary transition-colors">
                    <h3 className="font-semibold text-sm mb-1">Hex Bar Deadlift Setup</h3>
                    <p className="text-xs text-muted-foreground">Learn proper hex bar deadlift technique for maximum ACFT MDL scores.</p>
                  </a>
                  <a href="/blog/what-is-acft-comprehensive-overview" className="block p-3 bg-muted rounded border hover:border-primary transition-colors">
                    <h3 className="font-semibold text-sm mb-1">ACFT Overview</h3>
                    <p className="text-xs text-muted-foreground">Complete beginner's guide to all 6 ACFT events and scoring system.</p>
                  </a>
                  <a href="/blog/understanding-acft-score-chart-promotion-points" className="block p-3 bg-muted rounded border hover:border-primary transition-colors">
                    <h3 className="font-semibold text-sm mb-1">Promotion Points</h3>
                    <p className="text-xs text-muted-foreground">Understand how ACFT scores impact your promotion points and career.</p>
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculator;
