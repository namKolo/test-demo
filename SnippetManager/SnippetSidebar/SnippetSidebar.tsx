import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, ReactElement } from 'react';
import { Layout, Button } from 'antd';
import styled from 'styled-components';

// helpers
import themeHelpers from 'lib/theme';

// store
import { selectSnippetAction } from 'state/ui/SnippetManager/actions';
import { selectSnippets } from 'state/snippets/selectors';
import { selectChosenSnippet } from 'state/ui/SnippetManager/selectors';
import { Snippet } from 'state/snippets';

// local
import SnippetList from './SnippetList';
import SnippetMenu from './SnippetMenu';

const renderSnippetName = ({ snippet }: { snippet: Snippet }): ReactElement => (
  <SnippetMenu snippet={snippet} trigger={['contextMenu']}>
    <div>{snippet.name}</div>
  </SnippetMenu>
);

const SnippetPageSidebar: React.FC = () => {
  const dispatch = useDispatch();

  // handlers
  const onSnippetIdChange = useCallback(
    (snippetId: string) => {
      dispatch(selectSnippetAction({ snippetId }));
    },
    [dispatch],
  );

  // data
  const snippets = useSelector(selectSnippets);
  const chosenSnippet = useSelector(selectChosenSnippet);

  return (
    <StyledSider width={256}>
      <StyledHeader>
        <StyledFlex>
          <SnippetMenu trigger={['click']}>
            <Button
              type="link"
              shape="circle"
              icon="plus"
              data-testid="btn-add"
            />
          </SnippetMenu>
        </StyledFlex>
      </StyledHeader>
      <SnippetList
        onSnippetIdChange={onSnippetIdChange}
        snippets={snippets}
        chosenSnippet={chosenSnippet}
        renderSnippetName={renderSnippetName}
      />
    </StyledSider>
  );
};

export default SnippetPageSidebar;

const StyledFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const StyledSider = styled(Layout.Sider)`
  height: 100vh;
  border: ${themeHelpers.border(1, 'solid')};
`;

const StyledHeader = styled.div`
  padding: ${themeHelpers.spacing(2)};
`;
