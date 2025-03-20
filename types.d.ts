// Type declarations for custom components
declare module '@/components/notion-like-editor' {
  interface NotionLikeEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
  }

  const NotionLikeEditor: React.FC<NotionLikeEditorProps>;
