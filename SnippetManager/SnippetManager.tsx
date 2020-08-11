import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import styled from 'styled-components';

// actions
import { updateSnippetAction } from 'state/snippets/actions';

// selectors
import { selectChosenSnippet } from 'state/ui/SnippetManager/selectors';

// helpers
import themeHelper from 'lib/theme';

import SnippetEditor from './SnippetEditor';
import SnippetPageSidebar from './SnippetSidebar';

const SnippetPage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedSnippet = useSelector(selectChosenSnippet);

  const onSnippetChange = useCallback(
    ({ snippetId, content }: { snippetId: string; content: string }) => {
      dispatch(updateSnippetAction({ snippetId, updatingProps: { content } }));
    },
    [dispatch],
  );

  return (
    <Layout>
      <SnippetPageSidebar />
      {selectedSnippet ? (
        <Layout>
          <StyledHeader>{selectedSnippet && selectedSnippet.name}</StyledHeader>
          <StyledContent>
            <SnippetEditor
              snippet={selectedSnippet}
              onContentChange={onSnippetChange}
            />
          </StyledContent>
          <StyledEmptyBox />
        </Layout>
      ) : (
        <div />
      )}
    </Layout>
  );
};

export default SnippetPage;

const StyledHeader = styled.div`
  background-color: #fff;
  padding: ${themeHelper.spacing(2, 3)};
  border: ${themeHelper.border(1, 'solid')};
`;

const StyledContent = styled.div`
  margin: ${themeHelper.spacing(3)};
  box-shadow: ${themeHelper.boxShadow('base')};
  background: #fff;
`;

const StyledEmptyBox = styled.div`
  flex: auto;
`;
