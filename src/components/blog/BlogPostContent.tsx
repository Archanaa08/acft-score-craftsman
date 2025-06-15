
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
      <p className="text-foreground leading-relaxed mb-6">
        {introduction}
      </p>

      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            {section.title}
          </h2>
          <p className="text-foreground leading-relaxed">
            {section.content}
          </p>
        </section>
      ))}

      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold text-foreground mb-3">Conclusion</h3>
        <p className="text-foreground leading-relaxed">
          {conclusion}
        </p>
      </div>
    </article>
  );
};

export default BlogPostContent;
