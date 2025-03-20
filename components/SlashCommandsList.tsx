import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  ChevronDown,
  Quote,
  Code,
} from 'lucide-react';
import type { Editor } from '@tiptap/core';

export interface CommandItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  command: (props: { editor: Editor }) => void;
}

interface SlashCommandsListProps {
  items: CommandItem[];
  command: (item: CommandItem) => void;
}

const SlashCommandsList = forwardRef((props: SlashCommandsListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Filter out section headers for selection purposes
  const selectableItems = props.items.filter(item => !item.title.startsWith('__'));

  const selectItem = (index: number) => {
    const filteredIndex = props.items.findIndex(item =>
      item === selectableItems[index]
    );

    if (filteredIndex !== -1) {
      props.command(props.items[filteredIndex]);
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + selectableItems.length - 1) % selectableItems.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % selectableItems.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    // Reset selection when items change
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  // Group items by section
  let currentSection = '';

  return (
    <div className="slash-commands-menu bg-white rounded-xl shadow-xl border border-gray-200 w-72 overflow-hidden">
      <div className="slash-commands-items max-h-[300px] overflow-y-auto">
        {props.items.length ? (
          props.items.map((item, index) => {
            // Check if this is a section header
            if (item.title.startsWith('__')) {
              currentSection = item.title.replace(/__/g, '');
              return (
                <div
                  key={`section-${index}`}
                  className="text-sm text-gray-500 px-3 py-2 bg-gray-50 font-medium border-t border-b border-gray-200 first:border-t-0"
                >
                  {currentSection}
                </div>
              );
            }

            // Find the index in the selectable items array
            const selectableIndex = selectableItems.findIndex(si => si === item);
            const isSelected = selectableIndex === selectedIndex;

            return (
              <button
                className={`flex items-center w-full px-3 py-2 text-left hover:bg-gray-100 text-gray-900 ${
                  isSelected ? 'bg-gray-100' : ''
                }`}
                key={index}
                onClick={() => {
                  if (selectableIndex !== -1) {
                    setSelectedIndex(selectableIndex);
                    selectItem(selectableIndex);
                  }
                }}
              >
                <div className="w-8 h-8 flex items-center justify-center mr-2 text-gray-800">
                  {item.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-xs text-gray-600">{item.description}</div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="px-3 py-2 text-gray-500">No results</div>
        )}
      </div>
    </div>
  );
});

SlashCommandsList.displayName = 'SlashCommandsList';

export default SlashCommandsList;

export const getSuggestionItems = () => {
  return [
    {
      title: 'Heading 1',
      description: 'Large section heading',
      icon: <Heading1 className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading',
      icon: <Heading2 className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      title: 'Heading 3',
      description: 'Small section heading',
      icon: <Heading3 className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bulleted list',
      icon: <List className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleBulletList().run(),
    },
    {
      title: 'Numbered List',
      description: 'Create a numbered list',
      icon: <ListOrdered className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      title: 'Task List',
      description: 'Create a task list',
      icon: <CheckSquare className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleTaskList().run(),
    },
    {
      title: 'Toggle List',
      description: 'Toggleable content section',
      icon: <ChevronDown className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleBulletList().run(), // Replace with toggle list implementation
    },
    {
      title: 'Blockquote',
      description: 'Capture a quote',
      icon: <Quote className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      title: 'Code Block',
      description: 'Display code with syntax highlighting',
      icon: <Code className="w-4 h-4" />,
      command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleCodeBlock().run(),
    },
  ];
};
