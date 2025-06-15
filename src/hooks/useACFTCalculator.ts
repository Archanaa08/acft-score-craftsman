
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { scoringTables } from '@/data/acftData';

export interface ACFTScores {
  deadlift: string;
  powerThrow: string;
  pushups: string;
  sprintDragCarry: string;
  plank: string;
  twoMileRun: string;
}

export interface ACFTResult {
  totalScore: number;
  category: string;
  passed: boolean;
  eventScores: { [key: string]: number };
}

export const useACFTCalculator = () => {
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

  const calculateEventScore = (event: string, value: number, age: string, gender: string): number => {
    const table = scoringTables[event];
    if (!table) return 0;

    // For time-based events (lower is better)
    if (event === 'sprintDragCarry' || event === 'twoMileRun') {
      for (let i = 0; i < table.length - 1; i++) {
        if (value <= table[i].value) {
          return table[i].points;
        }
        if (value > table[i].value && value <= table[i + 1].value) {
          // Linear interpolation between points
          const ratio = (value - table[i].value) / (table[i + 1].value - table[i].value);
          return Math.round(table[i].points - ratio * (table[i].points - table[i + 1].points));
        }
      }
      return 0;
    } else {
      // For performance-based events (higher is better)
      for (let i = 0; i < table.length - 1; i++) {
        if (value >= table[i].value) {
          return table[i].points;
        }
        if (value < table[i].value && value >= table[i + 1].value) {
          // Linear interpolation between points
          const ratio = (table[i].value - value) / (table[i].value - table[i + 1].value);
          return Math.round(table[i].points - ratio * (table[i].points - table[i + 1].points));
        }
      }
      return 0;
    }
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

  return {
    scores,
    setScores,
    ageGroup,
    setAgeGroup,
    gender,
    setGender,
    result,
    calculateACFT
  };
};
