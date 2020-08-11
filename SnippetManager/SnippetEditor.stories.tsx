import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { createSnippet } from 'state/snippets/fixtures';

import SnippetEditor from './SnippetEditor';

storiesOf('SnippetEditor', module)
  .addDecorator(story => <div style={{ width: 256 }}>{story()}</div>)
  .add('Render snippet', () => {
    const [snippet, onSnippetChange] = useState(
      createSnippet('snippetId', '', false, 'My code snippet'),
    );

    const onContentChange = ({ snippetId, content }) => {
      const newSnippet = { ...snippet, content };
      onSnippetChange(newSnippet);
    };

    return (
      <SnippetEditor snippet={snippet} onContentChange={onContentChange} />
    );
  });
