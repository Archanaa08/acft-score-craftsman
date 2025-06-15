
import React from 'react';

interface BlogPostSection {
  title: string;
  content: string;
}

interface BlogPostContentProps {
  introduction: string;
  sections: BlogPostSection[];
  conclusion: string;
}

const BlogPostContent = ({ introduction, sections, conclusion }: BlogPostContentProps) => {
  return (
    <article className="prose prose-lg max-w-none">
      <div className="text-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
        {introduction}
      </div>

      {sections.map((section, index) => (
        <section key={index} className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
            {section.title}
          </h2>
          <div className="text-foreground leading-relaxed text-base sm:text-lg">
            {section.content}
          </div>
        </section>
      ))}

      <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-muted/30 rounded-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">Conclusion</h3>
        <div className="text-foreground leading-relaxed text-base sm:text-lg">
          {conclusion}
        </div>
      </div>
    </article>
  );
};

export default BlogPostContent;
