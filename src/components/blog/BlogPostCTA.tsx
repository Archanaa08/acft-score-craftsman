
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface BlogPostCTAProps {
  slug: string;
}

const BlogPostCTA = ({ slug }: BlogPostCTAProps) => {
  const isPromotionPointsPost = slug === 'understanding-acft-score-chart-promotion-points';
  
  return (
    <div className="mt-12 text-center bg-primary/5 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        {isPromotionPointsPost 
          ? 'Calculate Your ACFT Score and Promotion Points'
          : 'Ready to Test Your ACFT Deadlift Score?'
        }
      </h3>
      <p className="text-muted-foreground mb-6">
        {isPromotionPointsPost
          ? 'Use our ACFT calculator to see your fitness category and understand your promotion point potential.'
          : 'Use our ACFT calculator to see how your deadlift performance translates to points.'
        }
      </p>
      <Link to="/calculator">
        <Button size="lg">
          Calculate Your Score
        </Button>
      </Link>
    </div>
  );
};

export default BlogPostCTA;
