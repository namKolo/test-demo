import React, { useCallback, ReactNode } from 'react';
import { Dropdown, Menu, Modal } from 'antd';
import { useDispatch } from 'react-redux';

// store
import {
  createSnippetAction,
  deleteSnippetAction,
} from 'state/snippets/actions';

// types
import { Snippet } from 'state/snippets';
import { ClickParam } from 'antd/lib/menu';

type Props = {
  children?: ReactNode;
  snippet?: Snippet;
  trigger: ('click' | 'hover' | 'contextMenu')[];
};

function showDeleteConfirm({ onDelete }): void {
  Modal.confirm({
    title: 'Are you sure delete this?',
    content: '',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      onDelete();
    },
  });
}

/**
 * Render the ContextMenu when right click on SnippetListItem or the ActionButton
 */
const ContextMenu: React.FC<Props> = ({ children, snippet, trigger }) => {
  const dispatch = useDispatch();

  const onMenuClick = useCallback(
    ({ key, domEvent }: ClickParam) => {
      domEvent.stopPropagation();

      const parentId = snippet
        ? snippet.isFolder
          ? snippet.id
          : snippet.parentId
        : '';

      if (key === 'menuItem.createSnippet') {
        dispatch(
          createSnippetAction({
            isFolder: false,
            name: 'New Snippet',
            content: 'Your Snippet',
            parentId,
          }),
        );
      }

      if (key === 'menuItem.createFolder') {
        dispatch(
          createSnippetAction({ name: 'New Folder', parentId, isFolder: true }),
        );
      }

      if (key === 'menuItem.delete' && snippet) {
        showDeleteConfirm({
          onDelete: () => {
            dispatch(deleteSnippetAction({ snippetId: snippet.id }));
          },
        });
      }
    },
    [snippet, dispatch],
  );

  const menu = (
    <Menu onClick={onMenuClick} key="snippetMenu">
      <Menu.Item key="menuItem.createSnippet">Create Snippet</Menu.Item>
      <Menu.Item key="menuItem.createFolder">Create Folder</Menu.Item>
      {snippet && (
        <Menu.Item key="menuItem.delete">
          Delete {snippet && snippet.name}
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={trigger}>
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
