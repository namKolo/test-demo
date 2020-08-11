import React, { ReactElement } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { createSnippet } from 'state/snippets/fixtures';
import { Snippet } from 'state/snippets';

import SnippetList from './SnippetList';

const renderSnippetName = ({ snippet }: { snippet: Snippet }): ReactElement => (
  <div>{snippet.name}</div>
);

describe('SnippetList', () => {
  afterAll(() => {
    cleanup();
  });

  it('Should render folder1', () => {
    const { getByText } = render(
      <SnippetList
        snippets={[createSnippet('folder1', '', true)]}
        onSnippetIdChange={jest.fn()}
        renderSnippetName={renderSnippetName}
      />,
    );
    expect(getByText('folder1')).toBeInTheDocument();
  });

  it('Should call onSnippetIdChange() when clicking on Snippet', () => {
    const mockSnippetIdChange = jest.fn();
    const snippet = createSnippet('snippet1', '', false);
    const { queryByText } = render(
      <SnippetList
        snippets={[snippet]}
        onSnippetIdChange={mockSnippetIdChange}
        renderSnippetName={renderSnippetName}
      />,
    );

    fireEvent.click(queryByText(/snippet1/i));
    expect(mockSnippetIdChange).toHaveBeenCalledTimes(1);
    expect(mockSnippetIdChange).toHaveBeenCalledWith(snippet.id);
  });
});
