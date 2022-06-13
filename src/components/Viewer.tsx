import React from 'react';
import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import './github.markdown.css';

interface ViewerProps {
  initialValue?: string;
}

const Viewer: React.FC<ViewerProps> = ({ initialValue = ' ' }) => (
  <TuiViewer initialValue={initialValue} />
);

export default Viewer;
