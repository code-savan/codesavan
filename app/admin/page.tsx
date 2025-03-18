import { Tabs, Tab, Card } from '@heroui/react';
import ProjectForm from '@/components/admin/project-form';
import BlogForm from '@/components/admin/blog-form';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs aria-label="Admin sections">
        <Tab key="projects" title="Projects">
          <Card className="p-4">
            <ProjectForm />
          </Card>
        </Tab>
        <Tab key="blog" title="Blog Posts">
          <Card className="p-4">
            <BlogForm />
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
