import React from 'react';
import { storiesOf } from '@storybook/react';

import SnippetManager from './SnippetManager';

storiesOf('SnippetManager', module)
  // .addDecorator(story => <div style={{ width: 256 }}>{story()}</div>)
  .add('Render Manager', () => {
    return <SnippetManager />;
  });
