import ProjectContent from '@/components/projects/ProjectContent';
import { ProjectJsonLd } from '@/components/JsonLd';
import { portfolioProjects } from '@/constants';

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.key }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = portfolioProjects.find((p) => p.key === params.slug);
  return (
    <>
      {project && <ProjectJsonLd project={project} />}
      <ProjectContent slug={params.slug} />
    </>
  );
}
