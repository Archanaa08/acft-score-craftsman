
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ACFTResult } from '@/hooks/useACFTCalculator';

interface ACFTResultsProps {
  result: ACFTResult | null;
}

const ACFTResults = ({ result }: ACFTResultsProps) => {
  if (!result) {
    return (
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
    );
  }

  return (
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
  );
};

export default ACFTResults;
