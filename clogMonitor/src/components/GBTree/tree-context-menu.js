import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {BPDimens, BPStandards} from '../GBTimeTreeHelper/standards';
import {findExpandable} from './tree-view';
import {useEffect, useState} from 'react';

/**
 * The context menu for the tree.
 * @param {object} props - The props of the context menu component.
 * @return {JSX.Element} - The context menu for the tree.
 */
export default function TreeContextMenu({contextMenu, handleClose, expanded, setExpanded}) {
  // Use states to avoid content-jumping while animating.
  const [expandLabel, setExpandLabel] = useState('');
  const [collapseLabel, setCollapseLabel] = useState('');

  useEffect(() => {
    if (contextMenu) {
      if (contextMenu.level === 2) {
        setExpandLabel('Expand');
        setCollapseLabel('Collapse');
      } else {
        setExpandLabel('Expand All Children');
        setCollapseLabel('Collapse All Children');
      }
    }
  }, [contextMenu]);

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
          contextMenu !== null ?
            {top: contextMenu.mouseY, left: contextMenu.mouseX} :
            undefined
      }
      sx={{
        '& .MuiPaper-root': {
          borderRadius: BPDimens.cornerRadius + 'px',
          border: BPStandards.border,
          boxShadow: BPStandards.menuShadow,
        },
        '& .MuiMenuItem-root': {
          fontSize: '0.95rem',
        },
      }}
      onContextMenu={(event) => event.preventDefault()}
    >
      <MenuItem
        onClick={() => {
          const toBeExpanded = findExpandable([contextMenu.node]);
          if (!expanded.includes(contextMenu.node.name)) {
            // Expand.
            setExpanded([...expanded, ...toBeExpanded]);
          } else {
            setExpanded([
              ...expanded,
              ...(toBeExpanded.filter((n) => n !== contextMenu.node.name)),
            ]);
          }
          handleClose();
        }}
      >
        {expandLabel}
      </MenuItem>
      <MenuItem
        onClick={() => {
          const toBeCollapsed = findExpandable([contextMenu.node]);
          if (contextMenu.level === 2) {
            setExpanded(expanded.filter((name) => !toBeCollapsed.includes(name)));
          } else {
            setExpanded(expanded.filter((name) => {
              return !toBeCollapsed.includes(name) || name === contextMenu.node.name;
            }));
          }
          handleClose();
        }}
      >
        {collapseLabel}
      </MenuItem>
    </Menu>
  );
}