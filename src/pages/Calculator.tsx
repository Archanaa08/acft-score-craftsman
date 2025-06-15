
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            ACFT Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your event scores to calculate your Army Combat Fitness Test results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <Card className="acft-card">
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
                    <div key={key}>
                      <Label htmlFor={key}>{label}</Label>
                      <Input
                        id={key}
                        type="number"
                        step="0.1"
                        value={scores[key as keyof ACFTScores]}
                        onChange={(e) => setScores(prev => ({ ...prev, [key]: e.target.value }))}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={calculateACFT} 
                  className="w-full acft-button"
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
              <Card className="acft-card">
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
                      <div key={event} className="flex justify-between items-center">
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
      </div>
    </div>
  );
};

export default Calculator;
