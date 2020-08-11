import React from 'react';
import { storiesOf } from '@storybook/react';

import SnippetSidebar from './SnippetSidebar';

storiesOf('SnippetSidebar', module)
  .addDecorator(story => <div style={{ width: 256 }}>{story()}</div>)
  .add('SnippetSidebar', () => {
    return <SnippetSidebar />;
  });
