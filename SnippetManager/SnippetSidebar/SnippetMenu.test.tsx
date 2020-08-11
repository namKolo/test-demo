import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import { reducer } from 'state/snippets';
import { renderWithRedux } from 'lib/testFixture';

import SnippetMenu from './SnippetMenu';

describe('SnippetMenu', () => {
  afterAll(() => {
    cleanup();
  });

  it('render SnippetMenu', () => {
    const { store, queryByText, getByText } = renderWithRedux(
      <SnippetMenu trigger={['click']}>
        <div>Click me</div>
      </SnippetMenu>,
      { reducer, initialState: [] },
    );

    // should not render by default
    const menuItemTexts = ['Create Snippet', 'Create Folder'];
    menuItemTexts.forEach(text => expect(queryByText(text)).toBeNull());

    // Should render menu item when click
    fireEvent.click(queryByText('Click me'));
    menuItemTexts.forEach(text => expect(getByText(text)).toBeInTheDocument());

    // should create snippet
    fireEvent.click(queryByText('Create Snippet'));
    let state = store.getState();
    expect(state.length).toBe(1);
    expect(state.filter(snippet => !snippet.isFolder).length).toBe(1);

    // Should create folder
    fireEvent.click(queryByText('Click me'));
    fireEvent.click(queryByText('Create Folder'));
    state = store.getState();
    expect(state.length).toBe(2);
    expect(state.filter(snippet => snippet.isFolder).length).toBe(1);
  });
});
