
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Calculator as CalculatorIcon, Info, Target, Trophy, Users, Clock, Dumbbell } from 'lucide-react';

interface ACFTScores {
  deadlift: string;
  powerThrow: string;
  pushups: string;
  sprintDragCarry: string;
  plank: string;
  twoMileRun: string;
}

interface ACFTResult {
  totalScore: number;
  category: string;
  passed: boolean;
  eventScores: { [key: string]: number };
}

const Calculator = () => {
  const [scores, setScores] = useState<ACFTScores>({
    deadlift: '',
    powerThrow: '',
    pushups: '',
    sprintDragCarry: '',
    plank: '',
    twoMileRun: ''
  });
  
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [result, setResult] = useState<ACFTResult | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');
  const { toast } = useToast();

  // Simplified scoring function (in real implementation, you'd use official ACFT scoring tables)
  const calculateEventScore = (event: string, value: number, age: string, gender: string): number => {
    // This is a simplified scoring system - real implementation would use official ACFT tables
    const baseScores: { [key: string]: { min: number, max: number, maxScore: number } } = {
      deadlift: { min: 140, max: 340, maxScore: 100 },
      powerThrow: { min: 4.5, max: 12.5, maxScore: 100 },
      pushups: { min: 10, max: 60, maxScore: 100 },
      sprintDragCarry: { min: 180, max: 120, maxScore: 100 }, // Lower time = higher score
      plank: { min: 120, max: 330, maxScore: 100 }, // In seconds
      twoMileRun: { min: 21*60, max: 13*60 + 30, maxScore: 100 } // Lower time = higher score
    };

    const eventData = baseScores[event];
    if (!eventData) return 0;

    let score = 0;
    
    if (event === 'sprintDragCarry' || event === 'twoMileRun') {
      // For time-based events, lower is better
      if (value <= eventData.max) score = 100;
      else if (value >= eventData.min) score = 60;
      else score = Math.max(60, 100 - ((value - eventData.max) / (eventData.min - eventData.max)) * 40);
    } else {
      // For performance-based events, higher is better
      if (value >= eventData.max) score = 100;
      else if (value <= eventData.min) score = 60;
      else score = Math.max(60, 60 + ((value - eventData.min) / (eventData.max - eventData.min)) * 40);
    }

    return Math.round(Math.max(0, Math.min(100, score)));
  };

  const calculateACFT = () => {
    if (!ageGroup || !gender) {
      toast({
        title: "Missing Information",
        description: "Please select age group and gender before calculating.",
        variant: "destructive"
      });
      return;
    }

    const requiredFields = Object.entries(scores);
    const emptyFields = requiredFields.filter(([_, value]) => !value);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete Scores",
        description: "Please enter all event scores to calculate your ACFT result.",
        variant: "destructive"
      });
      return;
    }

    // Convert string inputs to numbers and calculate scores
    const eventScores = {
      deadlift: calculateEventScore('deadlift', parseFloat(scores.deadlift), ageGroup, gender),
      powerThrow: calculateEventScore('powerThrow', parseFloat(scores.powerThrow), ageGroup, gender),
      pushups: calculateEventScore('pushups', parseInt(scores.pushups), ageGroup, gender),
      sprintDragCarry: calculateEventScore('sprintDragCarry', parseFloat(scores.sprintDragCarry), ageGroup, gender),
      plank: calculateEventScore('plank', parseFloat(scores.plank), ageGroup, gender),
      twoMileRun: calculateEventScore('twoMileRun', parseFloat(scores.twoMileRun), ageGroup, gender)
    };

    const totalScore = Object.values(eventScores).reduce((sum, score) => sum + score, 0);
    const passed = Object.values(eventScores).every(score => score >= 60) && totalScore >= 360;
    
    let category = 'Fail';
    if (passed) {
      if (totalScore >= 540) category = 'Black';
      else if (totalScore >= 480) category = 'Gold';
      else if (totalScore >= 420) category = 'Silver';
      else category = 'Pass';
    }

    setResult({
      totalScore,
      category,
      passed,
      eventScores
    });

    toast({
      title: "ACFT Score Calculated",
      description: `Your total score is ${totalScore} points - ${category}`,
    });
  };

  const eventLabels = {
    deadlift: '3-Rep Max Deadlift (lbs)',
    powerThrow: 'Standing Power Throw (meters)',
    pushups: 'Hand-Release Push-ups (reps)',
    sprintDragCarry: 'Sprint-Drag-Carry (seconds)',
    plank: 'Plank (seconds)',
    twoMileRun: '2-Mile Run (seconds)'
  };

  const acftEvents = [
    {
      id: 'deadlift',
      name: '3-Repetition Maximum Deadlift (MDL)',
      icon: <Dumbbell className="h-6 w-6" />,
      description: 'The Maximum Deadlift tests muscular strength, balance, and flexibility.',
      procedure: [
        'Stand with feet shoulder-width apart behind the hex bar',
        'Squat down and grip the handles with palms facing your body',
        'Keep your back straight and chest up',
        'Drive through your heels to lift the bar',
        'Stand fully upright with shoulders back',
        'Lower the bar under control to the ground',
        'Complete 3 repetitions with proper form'
      ],
      tips: [
        'Keep the bar close to your body throughout the movement',
        'Breathe out during the lifting phase',
        'Focus on driving through your heels',
        'Maintain a neutral spine position'
      ],
      scoring: 'Minimum passing score: 140 lbs, Maximum score: 340+ lbs'
    },
    {
      id: 'powerThrow',
      name: 'Standing Power Throw (SPT)',
      icon: <Target className="h-6 w-6" />,
      description: 'The Standing Power Throw measures explosive power of the hips, legs, trunk, and arms.',
      procedure: [
        'Stand with both feet behind the start line',
        'Hold the 10-pound medicine ball with both hands',
        'Throw the ball backward over your head as far as possible',
        'The ball must land within the 42-foot wide lane',
        'You get 2 attempts, best throw counts',
        'Feet must remain behind the line during throw'
      ],
      tips: [
        'Use your whole body in the throwing motion',
        'Keep your feet planted firmly',
        'Follow through with your arms',
        'Practice the motion to build coordination'
      ],
      scoring: 'Minimum passing score: 4.5 meters, Maximum score: 12.5+ meters'
    },
    {
      id: 'pushups',
      name: 'Hand-Release Push-up (HRP)',
      icon: <Users className="h-6 w-6" />,
      description: 'The Hand-Release Push-up tests muscular endurance of the chest, shoulders, and triceps.',
      procedure: [
        'Start in the push-up position with hands flat on ground',
        'Lower your body until your chest touches the ground',
        'Lift both hands completely off the ground',
        'Return hands to ground and push back up',
        'Arms must fully extend at the top',
        'Repeat for 2 minutes maximum'
      ],
      tips: [
        'Keep your body in a straight line',
        'Fully extend arms at the top of each rep',
        'Control the descent to the ground',
        'Lift hands clearly off the ground each rep'
      ],
      scoring: 'Minimum passing score: 10 repetitions, Maximum score: 60+ repetitions'
    },
    {
      id: 'sprintDragCarry',
      name: 'Sprint-Drag-Carry (SDC)',
      icon: <Clock className="h-6 w-6" />,
      description: 'The Sprint-Drag-Carry tests multiple fitness components including power, strength, and agility.',
      procedure: [
        'Sprint 25 meters to the 25m line',
        'Drag a 90-pound sled backwards 25 meters',
        'Sprint 25 meters to the 25m line',
        'Carry two 40-pound kettlebells 25 meters',
        'Sprint 25 meters back to the start line',
        'Complete all phases without rest'
      ],
      tips: [
        'Pace yourself through all 5 phases',
        'Use proper lifting technique for kettlebells',
        'Keep low body position when dragging sled',
        'Maintain forward momentum throughout'
      ],
      scoring: 'Minimum passing score: 3:00 (180 seconds), Maximum score: 2:00 (120 seconds) or faster'
    },
    {
      id: 'plank',
      name: 'Plank (PLK)',
      icon: <Trophy className="h-6 w-6" />,
      description: 'The Plank tests core muscular endurance, stability, and neuromuscular control.',
      procedure: [
        'Start in the push-up position',
        'Lower to forearms with elbows under shoulders',
        'Keep body in straight line from head to heels',
        'Hold position for maximum time up to 2 minutes',
        'Do not allow hips to sag or pike up',
        'Keep head in neutral position'
      ],
      tips: [
        'Engage your core throughout the hold',
        'Keep breathing steady and controlled',
        'Focus on maintaining proper form',
        'Squeeze glutes to maintain straight line'
      ],
      scoring: 'Minimum passing score: 2:00 (120 seconds), Maximum score: 5:30 (330 seconds) or longer'
    },
    {
      id: 'twoMileRun',
      name: '2-Mile Run (2MR)',
      icon: <CalculatorIcon className="h-6 w-6" />,
      description: 'The 2-Mile Run tests aerobic and muscular endurance and cardiovascular fitness.',
      procedure: [
        'Complete 2 miles (3.2 kilometers) as fast as possible',
        'Run on a measured course or track',
        'Maintain consistent pace throughout',
        'Walking is permitted but not recommended',
        'Must cross finish line under own power',
        'Time is recorded when you cross the line'
      ],
      tips: [
        'Start at a sustainable pace',
        'Focus on consistent breathing',
        'Use proper running form',
        'Save energy for a strong finish'
      ],
      scoring: 'Minimum passing score: 21:00 (1260 seconds), Maximum score: 13:30 (810 seconds) or faster'
    }
  ];

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
                  <Card className="acft-card hover-scale transition-all duration-300">
                    <CardHeader>
                      <CardTitle>Enter Your ACFT Scores</CardTitle>
                      <CardDescription>
                        Fill in your performance for each of the six ACFT events
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Demographics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="gender">Gender</Label>
                          <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="age">Age Group</Label>
                          <Select value={ageGroup} onValueChange={setAgeGroup}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select age group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="17-21">17-21</SelectItem>
                              <SelectItem value="22-26">22-26</SelectItem>
                              <SelectItem value="27-31">27-31</SelectItem>
                              <SelectItem value="32-36">32-36</SelectItem>
                              <SelectItem value="37-41">37-41</SelectItem>
                              <SelectItem value="42-46">42-46</SelectItem>
                              <SelectItem value="47-51">47-51</SelectItem>
                              <SelectItem value="52-56">52-56</SelectItem>
                              <SelectItem value="57-61">57-61</SelectItem>
                              <SelectItem value="62+">62+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Event Scores */}
                      <div className="space-y-4">
                        {Object.entries(eventLabels).map(([key, label]) => (
                          <div key={key} className="animate-fade-in">
                            <Label htmlFor={key}>{label}</Label>
                            <Input
                              id={key}
                              type="number"
                              step="0.1"
                              value={scores[key as keyof ACFTScores]}
                              onChange={(e) => setScores(prev => ({ ...prev, [key]: e.target.value }))}
                              placeholder={`Enter ${label.toLowerCase()}`}
                              className="mt-1 transition-all duration-200 focus:scale-[1.02]"
                            />
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={calculateACFT} 
                        className="w-full acft-button hover-scale"
                        size="lg"
                      >
                        Calculate ACFT Score
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Results */}
                <div className="lg:col-span-1">
                  {result ? (
                    <Card className="acft-card animate-scale-in">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          ACFT Results
                          <Badge variant={result.passed ? "default" : "destructive"}>
                            {result.category}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-foreground mb-2">
                            {result.totalScore}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Points</div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Event Breakdown:</h4>
                          {Object.entries(result.eventScores).map(([event, score]) => (
                            <div key={event} className="flex justify-between items-center animate-fade-in">
                              <span className="text-sm text-muted-foreground capitalize">
                                {event.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <Badge variant={score >= 60 ? "default" : "destructive"}>
                                {score}
                              </Badge>
                            </div>
                          ))}
                        </div>

                        {result.passed ? (
                          <Alert>
                            <AlertDescription>
                              Congratulations! You passed the ACFT with a {result.category} score.
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <Alert variant="destructive">
                            <AlertDescription>
                              You did not meet the minimum ACFT standards. Focus on improving scores below 60 points.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="acft-card">
                      <CardHeader>
                        <CardTitle>ACFT Scoring Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Minimum Pass:</span>
                            <span className="font-semibold">60 per event</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Minimum:</span>
                            <span className="font-semibold">360 points</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <h4 className="font-semibold">Categories:</h4>
                          <div className="text-sm space-y-1">
                            <div>• <strong>Black:</strong> 540+ points</div>
                            <div>• <strong>Gold:</strong> 480-539 points</div>
                            <div>• <strong>Silver:</strong> 420-479 points</div>
                            <div>• <strong>Pass:</strong> 360-419 points</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="guide" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-6 w-6" />
                    Understanding the ACFT Events and Scoring System
                  </CardTitle>
                  <CardDescription>
                    Learn about each of the six Army Combat Fitness Test events, proper techniques, and scoring standards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {acftEvents.map((event, index) => (
                      <AccordionItem key={event.id} value={event.id} className="animate-fade-in">
                        <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-lg transition-colors">
                          <div className="flex items-center gap-3">
                            {event.icon}
                            <div className="text-left">
                              <div className="font-semibold">{event.name}</div>
                              <div className="text-sm text-muted-foreground">{event.description}</div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-6 mt-4">
                            {/* Step-by-step procedure */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Step-by-Step Procedure
                              </h4>
                              <ol className="space-y-2">
                                {event.procedure.map((step, stepIndex) => (
                                  <li key={stepIndex} className="flex gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                      {stepIndex + 1}
                                    </span>
                                    <span className="text-muted-foreground">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Tips and techniques */}
                            <div>
                              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Trophy className="h-4 w-4" />
                                Tips for Success
                              </h4>
                              <ul className="space-y-2">
                                {event.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex gap-2 items-start">
                                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="text-muted-foreground">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Scoring information */}
                            <div className="bg-muted/30 p-4 rounded-lg">
                              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                <CalculatorIcon className="h-4 w-4" />
                                Scoring Standards
                              </h4>
                              <p className="text-muted-foreground">{event.scoring}</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Additional scoring information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ACFT Scoring Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black text-white rounded-lg">
                      <span className="font-semibold">Black</span>
                      <span>540-600 points</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500 text-black rounded-lg">
                      <span className="font-semibold">Gold</span>
                      <span>480-539 points</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-400 text-black rounded-lg">
                      <span className="font-semibold">Silver</span>
                      <span>420-479 points</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500 text-white rounded-lg">
                      <span className="font-semibold">Pass</span>
                      <span>360-419 points</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-semibold">Minimum Score</div>
                        <div className="text-sm text-muted-foreground">60 points per event to pass</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-semibold">Total Minimum</div>
                        <div className="text-sm text-muted-foreground">360 total points required</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-semibold">Age/Gender Standards</div>
                        <div className="text-sm text-muted-foreground">Same standards for all soldiers</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-semibold">Testing Frequency</div>
                        <div className="text-sm text-muted-foreground">Conducted twice per year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Calculator;
