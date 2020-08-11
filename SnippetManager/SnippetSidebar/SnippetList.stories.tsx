import 'stylesheets/main.less';
import React, { ReactElement } from 'react';
import { storiesOf } from '@storybook/react';

// state
import { createSnippet } from 'state/snippets/fixtures';
import { Snippet } from 'state/snippets';

import SnippetList from './SnippetList';

const onSnippetIdChange = () => {};
const renderSnippetName = ({ snippet }: { snippet: Snippet }): ReactElement => (
  <div>{snippet.name}</div>
);

const snippets = [
  createSnippet('folder.1', '', true),
  createSnippet('snippet.1', 'folder.1', false),
  createSnippet('folder.2', '', true),
  createSnippet('folder.2-2', 'folder.2', true),
  createSnippet('folder.2-2-3', 'folder.2-2', true),
  createSnippet('snippet.1', '', false),
  createSnippet('snippet.deep', 'folder.2-2-3', false),
];

storiesOf('SnippetList', module)
  .addDecorator(story => <div style={{ width: 256 }}>{story()}</div>)
  .add('No items', () => (
    <SnippetList
      snippets={[]}
      onSnippetIdChange={onSnippetIdChange}
      renderSnippetName={renderSnippetName}
    />
  ))
  .add('Recursive rendering', () => (
    <SnippetList
      snippets={snippets}
      renderSnippetName={renderSnippetName}
      onSnippetIdChange={onSnippetIdChange}
    />
  ))
  .add('Auto expand the folder when selecting a snippet', () => (
    <SnippetList
      snippets={snippets}
      chosenSnippet={snippets[snippets.length - 1]}
      renderSnippetName={renderSnippetName}
      onSnippetIdChange={onSnippetIdChange}
    />
  ));
