'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Underline as UnderlineIcon,
} from 'lucide-react';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const SimpleEditor = ({ content, onChange, placeholder = 'Start writing...' }: SimpleEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      // Use individual extensions instead of StarterKit to have more control
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
      Image.configure({
        allowBase64: true,
        inline: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none max-w-full min-h-[200px] px-4 py-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Handle image upload
  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');

    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Handle links
  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!isMounted) {
    return (
      <div className="border rounded-md p-4 min-h-[300px] bg-white">
        <div className="h-6 bg-gray-100 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse"></div>
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  // We're using basic HTML buttons now instead of imported components
  const getButtonClass = (isActive: boolean) => {
    return isActive
      ? "p-2 rounded bg-gray-100 hover:bg-gray-200"
      : "p-2 rounded hover:bg-gray-100";
  };

  return (
    <div className="border rounded-md overflow-hidden bg-white">
      {/* Simple toolbar */}
      <div className="border-b p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={getButtonClass(editor.isActive('bold'))}
          type="button"
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={getButtonClass(editor.isActive('italic'))}
          type="button"
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={getButtonClass(editor.isActive('underline'))}
          type="button"
          title="Underline"
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 1 }))}
          type="button"
          title="Heading 1"
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={getButtonClass(editor.isActive('heading', { level: 2 }))}
          type="button"
          title="Heading 2"
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={getButtonClass(editor.isActive('bulletList'))}
          type="button"
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={getButtonClass(editor.isActive('orderedList'))}
          type="button"
          title="Ordered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-100"
          type="button"
          title="Add Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          onClick={setLink}
          className={getButtonClass(editor.isActive('link'))}
          type="button"
          title="Add Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default SimpleEditor;
