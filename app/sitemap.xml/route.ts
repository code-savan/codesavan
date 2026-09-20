import { portfolioProjects } from '@/constants';

const SITE_URL = 'https://www.codesavan.com';

// Last-modified dates for static routes, sourced from git history
// (`git log -1 --format="%ci" -- <file>`). Refresh these if the pages
// change materially; project pages below are fully data-driven.
const HOME_LAST_MOD = '2025-03-28'; // app/page.tsx
const PROJECTS_LAST_MOD = '2025-03-27'; // app/projects/page.tsx

// Hero slideshow images on /projects (see heroImages in app/projects/page.tsx).
const PROJECTS_HERO_IMAGES = ['/ph.avif', '/ph2.avif', '/ph3.avif', '/ph4.avif'];

const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

/**
 * Parse a data-source date like "Feb 20, 2025" into YYYY-MM-DD.
 * Parsed as UTC so the calendar day never shifts with server timezone.
 */
function toISODate(value: string): string | undefined {
  const match = value.match(/^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/);
  if (match) {
    const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
    if (month === undefined) return undefined;
    const parsed = new Date(Date.UTC(Number(match[3]), month, Number(match[2])));
    if (Number.isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().slice(0, 10);
  }
  const fallback = new Date(value);
  if (Number.isNaN(fallback.getTime())) return undefined;
  return fallback.toISOString().slice(0, 10);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const abs = (path: string) => `${SITE_URL}${path}`;

interface SitemapImage {
  loc: string;
  title: string;
  caption: string;
}

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  images?: SitemapImage[];
}

function renderImage(image: SitemapImage): string {
  return (
    `    <image:image>\n` +
    `      <image:loc>${escapeXml(image.loc)}</image:loc>\n` +
    `      <image:title>${escapeXml(image.title)}</image:title>\n` +
    `      <image:caption>${escapeXml(image.caption)}</image:caption>\n` +
    `    </image:image>\n`
  );
}

function renderUrl(entry: SitemapEntry): string {
  const images = (entry.images ?? []).map(renderImage).join('');
  return (
    `  <url>\n` +
    `    <loc>${escapeXml(entry.loc)}</loc>\n` +
    `    <lastmod>${entry.lastmod}</lastmod>\n` +
    `    <changefreq>${entry.changefreq}</changefreq>\n` +
    `    <priority>${entry.priority}</priority>\n` +
    `${images}` +
    `  </url>\n`
  );
}

export async function GET(): Promise<Response> {
  // Dynamic project routes, resolved against the canonical data source
  // (portfolioProjects in constants/index.js). New projects added there
  // appear here automatically — zero manual edits required.
  const projectEntries: SitemapEntry[] = portfolioProjects.map((project) => ({
    loc: `${SITE_URL}/projects/${project.key}`,
    lastmod: toISODate(project.date) ?? PROJECTS_LAST_MOD,
    changefreq: 'monthly',
    priority: 0.7,
    images: [
      {
        loc: abs(project.image),
        title: `${project.title} — featured project image`,
        caption: `${project.title} (${project.category})`,
      },
      {
        loc: abs(project.logoImage),
        title: `${project.title} logo`,
        caption: `${project.client} brand mark`,
      },
      ...(project.desImages ?? []).map((src: string, index: number) => ({
        loc: abs(src),
        title: `${project.title} — design showcase ${index + 1}`,
        caption: `${project.title} (${project.category})`,
      })),
    ],
  }));

  const entries: SitemapEntry[] = [
    {
      loc: SITE_URL,
      lastmod: HOME_LAST_MOD,
      changefreq: 'daily',
      priority: 1,
    },
    {
      loc: `${SITE_URL}/projects`,
      lastmod: PROJECTS_LAST_MOD,
      changefreq: 'weekly',
      priority: 0.8,
      images: [
        ...PROJECTS_HERO_IMAGES.map((src, index) => ({
          loc: abs(src),
          title: `Projects hero image ${index + 1}`,
          caption: 'Code Savan portfolio showcase',
        })),
        ...portfolioProjects.map((project) => ({
          loc: abs(project.image),
          title: `${project.title} — featured project image`,
          caption: `${project.title} (${project.category})`,
        })),
      ],
    },
    ...projectEntries,
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    entries.map(renderUrl).join('') +
    `</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
