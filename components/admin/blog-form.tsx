'use client';

import { useState } from 'react';
import { Input, Button, Textarea } from '@heroui/react';
import TiptapEditor from '@/components/tiptap-editor';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          summary,
          content,
          coverImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      // Reset form
      setTitle('');
      setSummary('');
      setContent('');
      setCoverImage('');
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Blog Title"
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
        label="Cover Image URL"
        type="url"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        required
      />
      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Write your blog post..."
        />
      </div>
      <Button
        type="submit"
        color="primary"
        isLoading={loading}
        className="w-full"
      >
        Save Blog Post
      </Button>
    </form>
  );
}
