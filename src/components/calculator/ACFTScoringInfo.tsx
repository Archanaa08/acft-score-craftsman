
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ACFTScoringInfo = () => {
  return (
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
  );
};

export default ACFTScoringInfo;
