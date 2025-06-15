
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Info, Target, Trophy, Calculator as CalculatorIcon } from 'lucide-react';
import { acftEvents } from '@/data/acftData';

const ACFTGuide = () => {
  return (
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
  );
};

export default ACFTGuide;
