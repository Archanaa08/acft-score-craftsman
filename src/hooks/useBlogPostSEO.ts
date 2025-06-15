
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

      // Update canonical URL with correct domain
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `https://acftscore.one/blog/${slug}`);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `https://acftscore.one/blog/${slug}`);
        document.head.appendChild(canonical);
      }

      // Add Open Graph meta tags for better social sharing
      const updateOrCreateMeta = (property: string, content: string, isProperty = true) => {
        const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
        let meta = document.querySelector(selector);
        if (meta) {
          meta.setAttribute('content', content);
        } else {
          meta = document.createElement('meta');
          if (isProperty) {
            meta.setAttribute('property', property);
          } else {
            meta.setAttribute('name', property);
          }
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      updateOrCreateMeta('og:title', post.title);
      updateOrCreateMeta('og:description', post.description);
      updateOrCreateMeta('og:url', `https://acftscore.one/blog/${slug}`);
      updateOrCreateMeta('og:type', 'article');
      updateOrCreateMeta('twitter:title', post.title, false);
      updateOrCreateMeta('twitter:description', post.description, false);

      // Add article structured data with enhanced SEO
      const getKeywords = (slug: string) => {
        switch (slug) {
          case 'what-is-acft-comprehensive-overview':
            return "ACFT, Army Combat Fitness Test, ACFT score chart, army fitness test, promotion points, ACFT scoring system, military fitness, ACFT events, deadlift, power throw, push ups, sprint drag carry, plank, 2 mile run, army PT test, combat fitness, military training, fitness standards";
          case 'understanding-acft-score-chart-promotion-points':
            return "ACFT score chart, promotion points, Army fitness test, military career, ACFT scoring, fitness categories, army promotion, military advancement, PT score, combat fitness scoring, army standards";
          case 'hex-bar-setup-acft-deadlift':
            return "ACFT, deadlift, hex bar, Army Combat Fitness Test, military fitness, training, deadlift form, hex bar deadlift, ACFT deadlift, military training, strength training";
          default:
            return "ACFT, Army Combat Fitness Test, military fitness, army training, combat fitness";
        }
      };

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
          "url": "https://acftscore.one",
          "logo": {
            "@type": "ImageObject",
            "url": "https://acftscore.one/favicon.ico"
          }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://acftscore.one/blog/${slug}`
        },
        "articleSection": "Fitness",
        "keywords": getKeywords(slug),
        "url": `https://acftscore.one/blog/${slug}`,
        "image": {
          "@type": "ImageObject",
          "url": "https://lovable.dev/opengraph-image-p98pqg.png",
          "width": 1200,
          "height": 630
        },
        "inLanguage": "en-US"
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
