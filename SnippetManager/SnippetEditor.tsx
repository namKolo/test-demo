import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

// app types
import { Snippet } from 'state/snippets';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/base16-light.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

type Props = {
  snippet: Snippet;
  onContentChange: (props: { snippetId: string; content: string }) => void;
};

const SnippetEditor: React.FC<Props> = ({ snippet, onContentChange }) => {
  const options = {
    mode: 'javascript',
    type: 'text/jsx',
    theme: 'base16-light',
    lineNumbers: true,
  };

  return (
    <CodeMirror
      options={options}
      value={snippet.content}
      onBeforeChange={(editor, data, value): void => {
        onContentChange({ snippetId: snippet.id, content: value });
      }}
    />
  );
};

export default SnippetEditor;
