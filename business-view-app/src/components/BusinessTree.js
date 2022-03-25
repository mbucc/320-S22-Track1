import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

export default function BusinessTree() {
  return (
    <TreeView
      aria-label="business tree"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 900, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="EAI Domain 1">
        <TreeItem nodeId="2" label="Publishing Domain 1"> 
          <TreeItem nodeId="4" label="Business Process 1">
            <TreeItem nodeId="6" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="7" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="8" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
          <TreeItem nodeId="5" label="Business Process 2">
            <TreeItem nodeId="9" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="10" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="11" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="3" label="Publishing Domain 2">
        <TreeItem nodeId="12" label="Business Process 1">
            <TreeItem nodeId="14" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="15" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="16" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
          <TreeItem nodeId="13" label="Business Process 2">
            <TreeItem nodeId="17" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="18" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="19" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem nodeId="20" label="EAI Domain 2">
        <TreeItem nodeId="21" label="Publishing Domain 1"> 
          <TreeItem nodeId="23" label="Business Process 1">
            <TreeItem nodeId="25" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="26" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="27" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
          <TreeItem nodeId="24" label="Business Process 2">
            <TreeItem nodeId="28" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="29" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="30" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
        </TreeItem>
        <TreeItem nodeId="22" label="Publishing Domain 2">
        <TreeItem nodeId="31" label="Business Process 1">
            <TreeItem nodeId="33" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="34" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="35" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
          <TreeItem nodeId="32" label="Business Process 2">
            <TreeItem nodeId="36" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="37" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            <TreeItem nodeId="38" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}

//@hiimlo file
//PLEASE DO NOT CHANGE ANY OF THE STRUCTURE ABOVE.
//final thing to do: selection from this tree is used to filter