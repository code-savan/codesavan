import ProjectContent from '@/components/projects/ProjectContent';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectContent slug={params.slug} />;
}
