
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

  return (
    <>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>ACFT Calculator - Army Combat Fitness Test Score Calculator</h1>
        <p>Free online ACFT calculator for Army Combat Fitness Test. Calculate your total score, fitness category, and understand each event with our comprehensive guide. Get accurate ACFT scoring for all six events including deadlift, power throw, push-ups, sprint-drag-carry, plank, and 2-mile run.</p>
      </div>

      <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              ACFT Calculator & Guide
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Calculate your Army Combat Fitness Test scores and learn about each event with our comprehensive guide. 
              Get accurate scoring for all six ACFT events and understand the proper techniques.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <CalculatorIcon className="h-4 w-4" />
                ACFT Calculator
              </TabsTrigger>
              <TabsTrigger value="guide" className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Events Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-8">
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
            </TabsContent>

            <TabsContent value="guide" className="space-y-8">
              <ACFTGuide />
              <ACFTScoringInfo />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculator;
