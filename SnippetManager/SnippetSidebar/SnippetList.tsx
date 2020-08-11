import React, {
  useCallback,
  useState,
  useEffect,
  ReactElement,
  useRef,
} from 'react';
import { Menu } from 'antd';

// helpers
import { groupSnippetsByParentId, getSnippetParentPath } from 'lib/snippet';

// types
import { Snippet, SnippetGroup } from 'state/snippets';

const { SubMenu } = Menu;

type SnippetTreeProps = {
  snippets: SnippetGroup[];
  renderSnippetName: ({ snippet }: { snippet: Snippet }) => ReactElement;
};
const SnippetTree = ({
  snippets,
  renderSnippetName,
}: SnippetTreeProps): JSX.Element[] => {
  return snippets.map(snippet => {
    if (snippet.isFolder) {
      return (
        <SubMenu key={snippet.id} title={renderSnippetName({ snippet })}>
          {SnippetTree({ snippets: snippet.snippets, renderSnippetName })}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={snippet.id}>{renderSnippetName({ snippet })}</Menu.Item>
    );
  });
};

type Props = {
  snippets: Snippet[];
  chosenSnippet?: Snippet;
  renderSnippetName: ({ snippet }: { snippet: Snippet }) => ReactElement;
  onSnippetIdChange: (snippetId: string) => void;
};

const SnippetList: React.FC<Props> = ({
  chosenSnippet,
  snippets,
  onSnippetIdChange,
  renderSnippetName,
}) => {
  // data
  const groups = groupSnippetsByParentId(snippets, '');
  const chosenSnippetParentId = chosenSnippet && chosenSnippet.parentId;

  // handlers
  const onMenuItemSelect = useCallback(
    ({ key }) => {
      onSnippetIdChange(key);
    },
    [onSnippetIdChange],
  );

  const [openKeys, setOpenKeys] = useState([]);
  const openKeysRef = useRef(openKeys);

  // update openKeys whenever selecting snippet
  useEffect(() => {
    const distinct = (value: string, index: number, self: string[]): boolean =>
      self.indexOf(value) === index;

    if (chosenSnippetParentId) {
      const parentPaths = getSnippetParentPath(
        snippets,
        chosenSnippetParentId,
        [],
      );
      setOpenKeys(openKeys => openKeys.concat(parentPaths).filter(distinct));
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (): void => {};
  }, [chosenSnippetParentId, snippets, openKeysRef]);

  return (
    <Menu
      mode="inline"
      key="snippetList"
      onSelect={onMenuItemSelect}
      selectedKeys={[chosenSnippet && chosenSnippet.id]}
      openKeys={openKeys}
      onOpenChange={(openKeys: string[]): void => {
        setOpenKeys(openKeys);
      }}
    >
      {SnippetTree({ snippets: groups, renderSnippetName })}
    </Menu>
  );
};

export default SnippetList;
