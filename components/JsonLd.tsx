import { faqs } from '@/constants/faqs';

const SITE_URL = 'https://www.codesavan.com';

function script(data: unknown) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite schema for the homepage layout. */
export function SiteJsonLd() {
  return script({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#business`,
        name: 'Code Savan',
        url: SITE_URL,
        image: `${SITE_URL}/profile.jpeg`,
        description:
          'Freelance web designer and full-stack developer in Abuja, Nigeria, available worldwide. Services: web design, web development, brand identity, UX/UI design, and consultation.',
        telephone: '+(234) 90 4614 3330',
        email: 'codesavan@proton.me',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Abuja',
          addressCountry: 'Nigeria',
        },
        areaServed: 'Worldwide',
        sameAs: [
          'https://x.com/codesavan',
          'https://instagram.com/codesavan',
          'https://linkedin.com/in/codesavan007',
        ],
        knowsAbout: [
          'Web Design',
          'Web Development',
          'Brand Identity',
          'UX/UI Design',
          'Design Consultation',
          'React',
          'Next.js',
          'Tailwind CSS',
          'Figma',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Code Savan - Web Designer & Developer',
        publisher: { '@id': `${SITE_URL}/#business` },
      },
    ],
  });
}

/** FAQPage schema mirroring the on-page FAQ accordion verbatim. */
export function FaqJsonLd() {
  return script({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  });
}

interface ProjectData {
  key: string;
  title: string;
  client: string;
  category: string;
  date: string;
  year: string;
  website?: string;
  image: string;
  logoImage: string;
  description: string;
  technologies: string[];
}

/** CreativeWork + BreadcrumbList schema for a portfolio project page. */
export function ProjectJsonLd({ project }: { project: ProjectData }) {
  const url = `${SITE_URL}/projects/${project.key}`;
  return script({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: project.title,
        url,
        image: `${SITE_URL}${project.image}`,
        description: project.description.replace(/\s+/g, ' ').trim(),
        creator: { '@id': `${SITE_URL}/#business` },
        datePublished: project.date,
        keywords: [project.category, ...(project.technologies ?? [])].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${SITE_URL}/projects`,
          },
          { '@type': 'ListItem', position: 3, name: project.title, item: url },
        ],
      },
    ],
  });
}
