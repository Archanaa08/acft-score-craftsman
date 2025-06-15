
import { useEffect } from 'react';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
}

export const useBlogPostSEO = (post: BlogPost | undefined, slug: string | undefined) => {
  useEffect(() => {
    if (post && slug) {
      document.title = `${post.title} | ACFT Calculator Blog`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.description);
      }

      // Update canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://acft-calculator.com/blog/${slug}`);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `https://acft-calculator.com/blog/${slug}`);
        document.head.appendChild(canonical);
      }

      // Add article structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.description,
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "ACFT Calculator",
          "url": "https://acft-calculator.com"
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://acft-calculator.com/blog/${slug}`
        },
        "articleSection": "Fitness",
        "keywords": slug === 'understanding-acft-score-chart-promotion-points' 
          ? "ACFT score chart, promotion points, Army fitness test, military career, ACFT scoring, fitness categories"
          : "ACFT, deadlift, hex bar, Army Combat Fitness Test, military fitness, training"
      };

      let scriptTag = document.querySelector('script[data-article="true"]') as HTMLScriptElement;
      if (scriptTag) {
        scriptTag.textContent = JSON.stringify(structuredData);
      } else {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.setAttribute('data-article', 'true');
        scriptTag.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptTag);
      }
    }
  }, [post, slug]);
};
