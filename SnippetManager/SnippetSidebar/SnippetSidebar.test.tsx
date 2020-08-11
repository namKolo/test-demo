import React from 'react';
import { combineReducers } from 'redux';
import {
  fireEvent,
  cleanup,
  queryByTestId,
  screen,
} from '@testing-library/react';

// state
import { reducer as snippetReducer } from 'state/snippets';
import { reducer as uiReducer } from 'state/ui';

// test helpers
import { renderWithRedux } from 'lib/testFixture';

import SnippetPageSidebar from './SnippetSidebar';

describe('SnippetSidebar', () => {
  let container;

  afterAll(() => {
    cleanup();
  });

  beforeAll(() => {
    const renderResult = renderWithRedux(<SnippetPageSidebar />, {
      reducer: combineReducers({ snippets: snippetReducer, ui: uiReducer }),
      initialState: {
        snippets: [],
        ui: { SnippetManager: { chosenSnippetId: '' } },
      },
    });

    container = renderResult.container;
  });

  it('Click Add button should render SnippetMenu', () => {
    fireEvent.click(queryByTestId(container, 'btn-add'));
    expect(screen.queryByText('Create Snippet')).toBeInTheDocument();
  });
});
