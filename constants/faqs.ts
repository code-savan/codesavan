export interface Faq {
  question: string;
  answer: string;
}

// Single source of truth for the homepage FAQ. Rendered by the FAQ
// accordion (components/landing/FAQs.tsx) and mirrored verbatim in
// FAQPage JSON-LD (components/JsonLd.tsx) and public/llm-content/faq.md.
export const faqs: Faq[] = [
  {
    question: 'What services do you offer?',
    answer:
      'I specialize in UX/UI design, web development, and branding for individuals and businesses.',
  },
  {
    question: 'How long does it take to complete a project?',
    answer:
      "Project timelines vary depending on complexity and scope. A typical website takes 2-4 weeks, while larger projects may take 6-8 weeks. I'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: 'Can I request additional revisions?',
    answer:
      "Yes, I offer revision rounds as part of every project. We'll work together until you're completely satisfied with the final result.",
  },
  {
    question: 'What tools do you use for design?',
    answer:
      'I use industry-standard tools including Figma, Adobe Creative Suite, and modern web technologies like React, Next.js, and Tailwind CSS.',
  },
  {
    question: 'Is coding required to manage the designs you create?',
    answer:
      'No, I provide user-friendly content management systems that allow you to update your website without any coding knowledge.',
  },
];
