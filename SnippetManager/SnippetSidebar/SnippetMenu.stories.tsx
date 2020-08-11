import React from 'react';
import { storiesOf } from '@storybook/react';

import SnippetMenu from './SnippetMenu';

storiesOf('SnippetMenu', module)
  .addDecorator(story => <div style={{ width: 256 }}>{story()}</div>)
  .add('Render when click', () => {
    return (
      <SnippetMenu trigger={['click']}>
        <div>Click me</div>
      </SnippetMenu>
    );
  })
  .add('Render when right click', () => {
    return (
      <SnippetMenu trigger={['contextMenu']}>
        <div>Right Click me</div>
      </SnippetMenu>
    );
  });
