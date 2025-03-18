'use client';

import { useState } from 'react';
import { Input, Button, Textarea } from '@heroui/react';
import TiptapEditor from '@/components/tiptap-editor';

export default function ProjectForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          summary,
          content,
          imageUrl,
          githubUrl,
          liveUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // Reset form
      setTitle('');
      setSummary('');
      setContent('');
      setImageUrl('');
      setGithubUrl('');
      setLiveUrl('');
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        label="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
      />
      <Input
        label="Image URL"
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <Input
        label="GitHub URL"
        type="url"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <Input
        label="Live URL"
        type="url"
        value={liveUrl}
        onChange={(e) => setLiveUrl(e.target.value)}
      />
      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write your project description..."
        />
      </div>
      <Button
        type="submit"
        color="primary"
        isLoading={loading}
        className="w-full"
      >
        Save Project
      </Button>
    </form>
  );
}
