import React from 'react';
import { combineReducers } from 'redux';
import {
  fireEvent,
  cleanup,
  queryByTestId,
  screen,
  wait,
} from '@testing-library/react';

// state
import { reducer as snippetReducer } from 'state/snippets';
import { reducer as uiReducer } from 'state/ui';

// test helpers
import { renderWithRedux } from 'lib/testFixture';

import SnippetManager from './SnippetManager';

describe('SnippetManager', () => {
  let container;

  afterAll(() => {
    cleanup();
  });

  beforeAll(() => {
    const renderResult = renderWithRedux(<SnippetManager />, {
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
    const menuText = 'Create Snippet';
    expect(screen.queryByText(menuText)).toBeInTheDocument();
    fireEvent.click(screen.queryByText(menuText));
    wait(
      () => {
        expect(screen.queryByText(menuText)).toBeNull();
      },
      { timeout: 300 },
    );
  });
});
