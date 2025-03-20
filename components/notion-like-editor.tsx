'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import { Extension, Editor } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import type { Range } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import { Plugin } from '@tiptap/pm/state';
import { Upload, Table as TableIcon, Grip } from 'lucide-react';
import SlashCommandsList, { CommandItem, getSuggestionItems } from './SlashCommandsList';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface NotionLikeEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Define types for ReactRenderer ref
interface CommandsListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

// Augment the getSuggestionItems function to include insert options
const getExtendedSuggestionItems = () => {
  // Get the original format items
  const formatItems = getSuggestionItems();

  // Add insert section header with title
  const insertItems: CommandItem[] = [
    {
      title: '__INSERT__', // Special title for section heading
      description: '',
      icon: <></>,
      command: ({ editor }: { editor: Editor }) => {}, // Empty command for section header
    },
    {
      title: 'Table',
      description: 'Insert a table',
      icon: <TableIcon className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
      },
    },
    {
      title: 'Image',
      description: 'Upload an image',
      icon: <Upload className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (file) {
            // Create FormData object to upload the image
            const formData = new FormData();
            formData.append('file', file);

            try {
              // Upload the image to your API
              const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              });

              if (!response.ok) {
                throw new Error('Failed to upload image');
              }

              const { imageUrl } = await response.json();

              // Insert the image into the editor
              editor.chain().focus().setImage({ src: imageUrl }).run();
            } catch (error) {
              console.error('Error uploading image:', error);
              alert('Failed to upload image. Please try again.');
            }
          }
        };

        input.click();
      },
    },
    {
      title: 'Horizontal Rule',
      description: 'Insert a separator line',
      icon: <Grip className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().setHorizontalRule().run(),
    },
  ];

  // Add FORMAT header to the beginning of format items
  const formattedItems = [
    {
      title: '__FORMAT__', // Special title for section heading
      description: '',
      icon: <></>,
      command: ({ editor }: { editor: Editor }) => {}, // Empty command for section header
    },
    ...formatItems
  ];

  return [
    ...formattedItems,
    ...insertItems
  ];
};

const SlashCommand = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: { editor: Editor; range: Range; props: any }) => {
          props.command({ editor });
          editor.chain().focus().deleteRange(range).run();
          // Dispatch custom event when menu is closed by selection
          document.dispatchEvent(new CustomEvent('slash-menu-close'));
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }: { query: string }) => {
          const items = getExtendedSuggestionItems();
          if (!query) return items;

          return items.filter(item =>
            !item.title.startsWith('__') && (
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase())
            )
          );
        },
        render: () => {
          let reactRenderer: ReactRenderer | null = null;
          let popup: any = null;
          let destroyPopup = () => {
            if (popup && popup[0]) {
              popup[0].destroy();
              popup = null;
            }
          };

          return {
            onStart: (props: any) => {
              try {
                // Dispatch custom event when menu is opened
                document.dispatchEvent(new CustomEvent('slash-menu-open'));

                reactRenderer = new ReactRenderer(SlashCommandsList, {
                  props,
                  editor: props.editor,
                });

                popup = tippy('body', {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: reactRenderer.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: 'manual',
                  placement: 'bottom-start',
                  animation: 'shift-away',
                  maxWidth: 'none',
                  onHide() {
                    // Dispatch custom event when tippy is hidden
                    document.dispatchEvent(new CustomEvent('slash-menu-close'));
                  },
                });
              } catch (error) {
                console.error('Error starting slash menu:', error);
              }
            },
            onUpdate: (props: any) => {
              try {
                if (reactRenderer) {
                  reactRenderer.updateProps(props);
                }

                if (popup && popup[0]) {
                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                  });
                }
              } catch (error) {
                console.error('Error updating slash menu:', error);
              }
            },
            onKeyDown: (props: any) => {
              try {
                if (props.event.key === 'Escape') {
                  if (popup && popup[0]) {
                    popup[0].hide();
                  }
                  // Dispatch custom event when menu is closed with Escape
                  document.dispatchEvent(new CustomEvent('slash-menu-close'));
                  return true;
                }

                // Type check before accessing onKeyDown
                if (reactRenderer && reactRenderer.ref) {
                  const ref = reactRenderer.ref as any;
                  if (ref && typeof ref.onKeyDown === 'function') {
                    return ref.onKeyDown(props);
                  }
                }
              } catch (error) {
                console.error('Error handling keydown in slash menu:', error);
              }
              return false;
            },
            onExit: () => {
              try {
                destroyPopup();

                if (reactRenderer) {
                  reactRenderer.destroy();
                  reactRenderer = null;
                }

                // Dispatch custom event when menu is closed
                document.dispatchEvent(new CustomEvent('slash-menu-close'));
              } catch (error) {
                console.error('Error exiting slash menu:', error);
              }
            },
          };
        },
      }),
    ];
  },
});

// Custom paragraph with slash command handling
const CustomParagraph = Paragraph.extend({
  addKeyboardShortcuts() {
    return {
      'Mod-/': () => {
        try {
          // Make sure to trigger the slash command menu
          this.editor.commands.insertContent('/');
          return true;
        } catch (error) {
          console.error('Error inserting slash:', error);
          return false;
        }
      },
    };
  },
});

const NotionLikeEditor = ({ content, onChange, placeholder = 'Type / to browse options' }: NotionLikeEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSlashMenuOpen, setIsSlashMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      CustomParagraph,
      StarterKit.configure({
        document: false,
        paragraph: false,
        codeBlock: {
          HTMLAttributes: {
            class: 'code-block',
          },
          languageClassPrefix: 'language-',
          exitOnTripleEnter: true,
          exitOnArrowDown: true,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full my-4',
        },
      }),
      TextStyle,
      Color,
      Highlight,
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      HorizontalRule,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Heading';
          }

          return placeholder;
        },
        includeChildren: true,
        showOnlyCurrent: false,
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
      }),
      SlashCommand.configure({
        suggestion: {
          char: '/',
          startOfLine: false,
          command: ({ editor, range, props }: { editor: Editor; range: Range; props: any }) => {
            try {
              props.command({ editor });
              editor.chain().focus().deleteRange(range).run();
              setIsSlashMenuOpen(false);
            } catch (error) {
              console.error('Error executing slash command:', error);
            }
          },
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
      handleDOMEvents: {
        focus: (view, event) => {
          // Show drag handles and plus buttons when editor is focused
          document.body.classList.add('editor-focused');
          return false; // Don't prevent default behavior
        },
        blur: (view, event) => {
          // Hide drag handles and plus buttons when editor loses focus
          document.body.classList.remove('editor-focused');
          return false; // Don't prevent default behavior
        },
      },
      handleClick: (view, pos, event) => {
        // Check if we're clicking on a plus button
        if (event.target instanceof Element) {
          const target = event.target as Element;
          const computedStyle = window.getComputedStyle(target);

          // If we're clicking somewhere to the left of a paragraph (where the plus button is)
          if (target.closest('.ProseMirror') &&
              computedStyle.backgroundImage &&
              computedStyle.backgroundImage.includes('svg')) {

            // Get the nearest node
            const domAtPos = view.domAtPos(pos);
            if (domAtPos) {
              const node = domAtPos.node;
              if (node) {
                // Get node position
                const nodeEl = node.parentElement;
                if (nodeEl) {
                  // Set cursor at the beginning of this node and insert slash
                  const tr = view.state.tr;
                  tr.insertText('/', pos);
                  view.dispatch(tr);

                  // Prevent default behavior
                  event.preventDefault();
                  return true;
                }
              }
            }
          }

          return false; // Don't prevent default behavior if not clicking plus button
        }
      },
    },
  });

  // Set up event handlers for slash menu
  useEffect(() => {
    const handleSlashMenuOpen = () => {
      setIsSlashMenuOpen(true);
    };

    const handleSlashMenuClose = () => {
      setIsSlashMenuOpen(false);
    };

    // Add global event listeners
    document.addEventListener('slash-menu-open', handleSlashMenuOpen);
    document.addEventListener('slash-menu-close', handleSlashMenuClose);

    return () => {
      // Clean up event listeners
      document.removeEventListener('slash-menu-open', handleSlashMenuOpen);
      document.removeEventListener('slash-menu-close', handleSlashMenuClose);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create a FormData object to upload the image
        const formData = new FormData();
        formData.append('file', file);

        try {
          // Upload the image to your API
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const { imageUrl } = await response.json();

          // Insert the image into the editor
          editor?.chain().focus().setImage({ src: imageUrl }).run();
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    };

    input.click();
  }, [editor]);

  useEffect(() => {
    if (editor) {
      // Add support for paragraph drag and drop
      const handleDragStart = (event: DragEvent) => {
        if (!event.target || !(event.target instanceof Element)) return;

        // Check if we're dragging from the drag handle area
        const target = event.target;
        const computedStyle = window.getComputedStyle(target);
        const isDragHandle =
          target.closest('.ProseMirror') &&
          computedStyle.backgroundImage &&
          computedStyle.backgroundImage.includes('circle');

        if (isDragHandle) {
          // Find the closest paragraph or block element
          const node = target.closest('p, h1, h2, h3, ul, ol, blockquote, pre');
          if (node) {
            // Mark the element as being dragged
            node.setAttribute('data-dragging', 'true');

            // Set drag data
            if (event.dataTransfer) {
              event.dataTransfer.setData('text/html', node.innerHTML);
              event.dataTransfer.setData('text/plain', node.textContent || '');

              // Add drag effect
              event.dataTransfer.effectAllowed = 'move';
            }
          }
        }
      };

      const handleDragOver = (event: DragEvent) => {
        if (!event.target || !(event.target instanceof Element)) return;

        // Find the closest paragraph or block element
        const targetNode = event.target.closest('p, h1, h2, h3, ul, ol, blockquote, pre');
        if (targetNode) {
          // Prevent default to allow drop
          event.preventDefault();

          // Show drop indicator
          const rect = targetNode.getBoundingClientRect();
          const isTopHalf = event.clientY < rect.top + rect.height / 2;

          // Remove previous drop indicators
          document.querySelectorAll('.drop-before, .drop-after').forEach(el => {
            el.classList.remove('drop-before', 'drop-after');
          });

          // Add drop indicator class
          if (isTopHalf) {
            targetNode.classList.add('drop-before');
          } else {
            targetNode.classList.add('drop-after');
          }
        }
      };

      const handleDragEnd = (event: DragEvent) => {
        // Clean up drop indicators
        document.querySelectorAll('.drop-before, .drop-after').forEach(el => {
          el.classList.remove('drop-before', 'drop-after');
        });

        // Remove dragging attribute
        document.querySelectorAll('[data-dragging="true"]').forEach(el => {
          el.removeAttribute('data-dragging');
        });
      };

      const handleDrop = (event: DragEvent) => {
        if (!event.target || !(event.target instanceof Element) || !editor) return;

        // Prevent default to handle drop ourselves
        event.preventDefault();

        // Find the dragged element
        const draggedEl = document.querySelector('[data-dragging="true"]');
        if (!draggedEl) return;

        // Find the target element
        const targetNode = event.target.closest('p, h1, h2, h3, ul, ol, blockquote, pre');
        if (targetNode) {
          const isTopHalf = targetNode.classList.contains('drop-before');

          // Get positions in the editor state
          const draggedPos = editor.view.posAtDOM(draggedEl, 0);
          const targetPos = editor.view.posAtDOM(targetNode, 0);

          // Create a transaction to move the content
          if (draggedPos !== null && targetPos !== null) {
            const tr = editor.view.state.tr;

            // Get content from dragged node
            const draggedNode = editor.view.state.doc.nodeAt(draggedPos);
            if (draggedNode) {
              // Delete the original node
              tr.delete(draggedPos, draggedPos + draggedNode.nodeSize);

              // Calculate the insertion position, adjusting for the deleted content
              let insertPos = targetPos;
              if (!isTopHalf) {
                const targetNode = editor.view.state.doc.nodeAt(targetPos);
                if (targetNode) {
                  insertPos += targetNode.nodeSize;
                }
              }

              // Adjust position if we're moving content to after its original position
              if (draggedPos < targetPos) {
                insertPos -= draggedNode.nodeSize;
              }

              // Insert at the new position
              tr.insert(insertPos, draggedNode);

              // Dispatch the transaction
              editor.view.dispatch(tr);
            }
          }
        }

        // Clean up
        handleDragEnd(event);
      };

      // Add event listeners to the editor DOM
      const editorElement = editor.view.dom;
      editorElement.addEventListener('dragstart', handleDragStart);
      editorElement.addEventListener('dragover', handleDragOver);
      editorElement.addEventListener('dragend', handleDragEnd);
      editorElement.addEventListener('drop', handleDrop);

      // Clean up on unmount
      return () => {
        editorElement.removeEventListener('dragstart', handleDragStart);
        editorElement.removeEventListener('dragover', handleDragOver);
        editorElement.removeEventListener('dragend', handleDragEnd);
        editorElement.removeEventListener('drop', handleDrop);
      };
    }
  }, [editor]);

  if (!isMounted) {
    return <div className="min-h-[280px]"></div>;
  }

  if (!editor) {
    return <div className="min-h-[280px]"></div>;
  }

  return (
    <div className="notion-like-editor">
      {/* Bubble menu that appears when text is selected */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex space-x-1"
        shouldShow={({ editor, view, state, from, to }) => {
          return from !== to;
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
        >
          <span className="font-bold text-xs">B</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
        >
          <span className="italic text-xs">I</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100' : ''}`}
        >
          <span className="underline text-xs">U</span>
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
        >
          <span className="text-xs">🔗</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-gray-100' : ''}`}
        >
          <span className="text-xs">🖌️</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded text-gray-900 hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-100' : ''}`}
        >
          <span className="text-xs">{`<>`}</span>
        </button>
      </BubbleMenu>

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none min-h-[280px] focus:outline-none"
      />

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 280px;
          position: relative;
        }

        /* Paragraph controls (plus button and drag handle) */
        .ProseMirror p,
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror ul,
        .ProseMirror ol,
        .ProseMirror blockquote,
        .ProseMirror pre {
          position: relative;
          margin-left: 24px; /* Make space for controls on the left */
        }

        .ProseMirror p::before,
        .ProseMirror h1::before,
        .ProseMirror h2::before,
        .ProseMirror h3::before,
        .ProseMirror ul::before,
        .ProseMirror ol::before,
        .ProseMirror blockquote::before,
        .ProseMirror pre::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 0.5em;
          width: 16px;
          height: 16px;
          opacity: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='3' y1='12' x2='21' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='3' x2='12' y2='21'%3E%3C/line%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .ProseMirror p:hover::before,
        .ProseMirror h1:hover::before,
        .ProseMirror h2:hover::before,
        .ProseMirror h3:hover::before,
        .ProseMirror ul:hover::before,
        .ProseMirror ol:hover::before,
        .ProseMirror blockquote:hover::before,
        .ProseMirror pre:hover::before,
        .ProseMirror p.has-focus::before,
        .ProseMirror h1.has-focus::before,
        .ProseMirror h2.has-focus::before,
        .ProseMirror h3.has-focus::before,
        .ProseMirror ul.has-focus::before,
        .ProseMirror ol.has-focus::before,
        .ProseMirror blockquote.has-focus::before,
        .ProseMirror pre.has-focus::before {
          opacity: 1;
        }

        /* Drag handle at the left side */
        .ProseMirror p::after,
        .ProseMirror h1::after,
        .ProseMirror h2::after,
        .ProseMirror h3::after,
        .ProseMirror ul::after,
        .ProseMirror ol::after,
        .ProseMirror blockquote::after,
        .ProseMirror pre::after {
          content: '';
          position: absolute;
          left: -40px;
          top: 0.5em;
          width: 16px;
          height: 16px;
          opacity: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23A1A1AA' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='9' cy='7' r='2'%3E%3C/circle%3E%3Ccircle cx='9' cy='17' r='2'%3E%3C/circle%3E%3Ccircle cx='15' cy='7' r='2'%3E%3C/circle%3E%3Ccircle cx='15' cy='17' r='2'%3E%3C/circle%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          cursor: grab;
          transition: opacity 0.2s;
        }

        .ProseMirror p:hover::after,
        .ProseMirror h1:hover::after,
        .ProseMirror h2:hover::after,
        .ProseMirror h3:hover::after,
        .ProseMirror ul:hover::after,
        .ProseMirror ol:hover::after,
        .ProseMirror blockquote:hover::after,
        .ProseMirror pre:hover::after,
        .ProseMirror p.has-focus::after,
        .ProseMirror h1.has-focus::after,
        .ProseMirror h2.has-focus::after,
        .ProseMirror h3.has-focus::after,
        .ProseMirror ul.has-focus::after,
        .ProseMirror ol.has-focus::after,
        .ProseMirror blockquote.has-focus::after,
        .ProseMirror pre.has-focus::after {
          opacity: 1;
        }

        /* Placeholder styles for focused empty nodes */
        .ProseMirror p.is-empty:first-child::before,
        .ProseMirror p.is-empty.is-selected::before,
        .ProseMirror p.is-empty:focus::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
          position: absolute;
          top: 0.5em;
        }

        /* Remove any additional borders/styling */
        .ProseMirror {
          border: none;
          padding: 0;
        }

        /* Code block styles */
        .ProseMirror pre {
          background-color: #f1f3f5;
          color: #2a2f45;
          font-family: 'JetBrainsMono', monospace;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
          overflow-x: auto;
        }

        .ProseMirror pre code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.875rem;
        }

        /* Make sure there's always space after a code block for typing */
        .ProseMirror pre + p {
          margin-top: 1rem;
        }

        /* Heading styles */
        .ProseMirror h1 {
          font-size: 1.75rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }

        /* Paragraph spacing */
        .ProseMirror p {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        /* Task list styling */
        .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding: 0;
        }

        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: baseline;
        }

        .ProseMirror ul[data-type="taskList"] li > label {
          margin-right: 0.5rem;
          user-select: none;
        }

        .ProseMirror ul[data-type="taskList"] li > div {
          flex: 1 1 auto;
        }

        /* Table styles */
        .ProseMirror table {
          border-collapse: collapse;
          margin: 0;
          overflow: hidden;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 1rem;
        }

        .ProseMirror table td,
        .ProseMirror table th {
          border: 2px solid #ced4da;
          box-sizing: border-box;
          min-width: 1em;
          padding: 0.5rem;
          position: relative;
          vertical-align: top;
        }

        .ProseMirror table th {
          background-color: #f8f9fa;
          font-weight: bold;
          text-align: left;
        }

        .ProseMirror hr {
          margin: 1.5rem 0;
          border: none;
          border-top: 2px solid #e9ecef;
        }

        /* Drag and drop styling */
        .ProseMirror [data-dragging="true"] {
          opacity: 0.5;
        }

        .ProseMirror .drop-before {
          position: relative;
        }

        .ProseMirror .drop-before::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #3b82f6;
          border-radius: 4px;
          z-index: 10;
        }

        .ProseMirror .drop-after {
          position: relative;
        }

        .ProseMirror .drop-after::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 4px;
          background-color: #3b82f6;
          border-radius: 4px;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

export default NotionLikeEditor;
