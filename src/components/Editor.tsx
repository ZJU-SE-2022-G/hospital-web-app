import React, { useRef } from 'react';
import { Editor as TuiEditor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';
import './github.markdown.css';

interface EditorProps {
  initialValue?: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  initialValue = ' ',
  onBlur,
  onChange,
}) => {
  const ref = useRef<TuiEditor>(null);

  return (
    <TuiEditor
      ref={ref}
      autofocus={false}
      hideModeSwitch
      initialEditType="wysiwyg"
      initialValue={initialValue}
      language="zh-CN"
      usageStatistics={false}
      onBlur={onBlur}
      onChange={() =>
        onChange?.(ref.current?.getInstance().getMarkdown() || '')
      }
    />
  );
};

export default Editor;
