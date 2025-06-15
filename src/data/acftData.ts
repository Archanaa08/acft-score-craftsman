import { Calculator as CalculatorIcon, Target, Users, Clock, Dumbbell, Trophy } from 'lucide-react';

export const sliderRanges = {
  deadlift: { min: 140, max: 340, step: 10 },
  powerThrow: { min: 4.5, max: 12.5, step: 0.1 },
  pushups: { min: 10, max: 60, step: 1 },
  sprintDragCarry: { min: 120, max: 180, step: 1 }, // seconds
  plank: { min: 120, max: 330, step: 5 }, // seconds
  twoMileRun: { min: 810, max: 1260, step: 5 } // seconds (13:30 to 21:00)
};

export const eventLabels = {
  deadlift: '3-Rep Max Deadlift (lbs)',
  powerThrow: 'Standing Power Throw (meters)',
  pushups: 'Hand-Release Push-ups (reps)',
  sprintDragCarry: 'Sprint-Drag-Carry (seconds)',
  plank: 'Plank (seconds)',
  twoMileRun: '2-Mile Run (seconds)'
};

export const acftEvents = [
  {
    id: 'deadlift',
    name: '3-Repetition Maximum Deadlift (MDL)',
    icon: 'Dumbbell',
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
    icon: 'Target',
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
    icon: 'Users',
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
    icon: 'Clock',
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
    icon: 'Trophy',
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
    icon: 'CalculatorIcon',
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

export const scoringTables: { [key: string]: { points: number, value: number }[] } = {
  deadlift: [
    { points: 100, value: 340 },
    { points: 95, value: 320 },
    { points: 90, value: 300 },
    { points: 85, value: 280 },
    { points: 80, value: 260 },
    { points: 75, value: 240 },
    { points: 70, value: 220 },
    { points: 65, value: 200 },
    { points: 60, value: 180 },
    { points: 0, value: 140 }
  ],
  powerThrow: [
    { points: 100, value: 12.5 },
    { points: 95, value: 11.5 },
    { points: 90, value: 10.5 },
    { points: 85, value: 9.5 },
    { points: 80, value: 8.5 },
    { points: 75, value: 7.5 },
    { points: 70, value: 6.5 },
    { points: 65, value: 5.5 },
    { points: 60, value: 4.5 },
    { points: 0, value: 4.0 }
  ],
  pushups: [
    { points: 100, value: 60 },
    { points: 95, value: 55 },
    { points: 90, value: 50 },
    { points: 85, value: 45 },
    { points: 80, value: 40 },
    { points: 75, value: 35 },
    { points: 70, value: 30 },
    { points: 65, value: 25 },
    { points: 60, value: 20 },
    { points: 0, value: 10 }
  ],
  sprintDragCarry: [
    { points: 100, value: 120 },
    { points: 95, value: 125 },
    { points: 90, value: 130 },
    { points: 85, value: 135 },
    { points: 80, value: 140 },
    { points: 75, value: 145 },
    { points: 70, value: 150 },
    { points: 65, value: 155 },
    { points: 60, value: 160 },
    { points: 0, value: 180 }
  ],
  plank: [
    { points: 100, value: 330 },
    { points: 95, value: 300 },
    { points: 90, value: 270 },
    { points: 85, value: 240 },
    { points: 80, value: 210 },
    { points: 75, value: 180 },
    { points: 70, value: 150 },
    { points: 65, value: 135 },
    { points: 60, value: 120 },
    { points: 0, value: 60 }
  ],
  twoMileRun: [
    { points: 100, value: 810 }, // 13:30
    { points: 95, value: 870 }, // 14:30
    { points: 90, value: 930 }, // 15:30
    { points: 85, value: 990 }, // 16:30
    { points: 80, value: 1050 }, // 17:30
    { points: 75, value: 1110 }, // 18:30
    { points: 70, value: 1170 }, // 19:30
    { points: 65, value: 1230 }, // 20:30
    { points: 60, value: 1260 }, // 21:00
    { points: 0, value: 1500 }
  ]
};
