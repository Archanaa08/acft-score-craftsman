
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { sliderRanges, eventLabels } from '@/data/acftData';
import { ACFTScores } from '@/hooks/useACFTCalculator';

interface ACFTScoreInputProps {
  scores: ACFTScores;
  setScores: React.Dispatch<React.SetStateAction<ACFTScores>>;
  ageGroup: string;
  setAgeGroup: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  onCalculate: () => void;
}

const ACFTScoreInput = ({
  scores,
  setScores,
  ageGroup,
  setAgeGroup,
  gender,
  setGender,
  onCalculate
}: ACFTScoreInputProps) => {
  const handleSliderChange = (event: string, value: number[]) => {
    const newValue = value[0].toString();
    setScores(prev => ({ ...prev, [event]: newValue }));
  };

  const handleInputChange = (event: string, value: string) => {
    setScores(prev => ({ ...prev, [event]: value }));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="acft-card hover-scale transition-all duration-300">
      <CardHeader>
        <CardTitle>Enter Your ACFT Scores</CardTitle>
        <CardDescription>
          Fill in your performance for each of the six ACFT events using sliders or text inputs
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

        {/* Event Scores with Sliders */}
        <div className="space-y-6">
          {Object.entries(eventLabels).map(([key, label]) => {
            const range = sliderRanges[key as keyof typeof sliderRanges];
            const currentValue = parseFloat(scores[key as keyof ACFTScores]) || range.min;
            
            return (
              <div key={key} className="animate-fade-in space-y-3">
                <Label htmlFor={key} className="text-sm font-medium">
                  {label}
                  {(key === 'sprintDragCarry' || key === 'twoMileRun') && currentValue && (
                    <span className="ml-2 text-muted-foreground">
                      ({formatTime(currentValue)})
                    </span>
                  )}
                </Label>
                
                {/* Slider */}
                <div className="px-2">
                  <Slider
                    value={[currentValue]}
                    onValueChange={(value) => handleSliderChange(key, value)}
                    min={range.min}
                    max={range.max}
                    step={range.step}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{range.min}</span>
                    <span className="font-medium">{currentValue}</span>
                    <span>{range.max}</span>
                  </div>
                </div>
                
                {/* Text Input */}
                <Input
                  id={key}
                  type="number"
                  step={range.step}
                  min={range.min}
                  max={range.max}
                  value={scores[key as keyof ACFTScores]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            );
          })}
        </div>

        <Button 
          onClick={onCalculate} 
          className="w-full acft-button hover-scale"
          size="lg"
        >
          Calculate ACFT Score
        </Button>
      </CardContent>
    </Card>
  );
};

export default ACFTScoreInput;
