'use client';

import { useState } from 'react';
import { Input, Button, Textarea } from '@heroui/react';
import TiptapEditor from '@/components/tiptap-editor';

export default function BlogForm() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Blog Form (Disabled)</h2>
      <p className="text-gray-600">Backend functionality temporarily disabled.</p>
    </div>
  );
}
