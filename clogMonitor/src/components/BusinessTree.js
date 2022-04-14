import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material'

/**
 * Tree view for selecting precise business process withing a eai domain/publishing domain
 * 
 * @author @hiimlo
 * 
 * Uses Box to contain tree view, and control how expanded content is shown (keep it contained in box)
 * Uses TreeView and TreeItem to build the structure of the tree
 * --> NOTE: TreeView and TreeItem are from mui/lab, which means they haven't been moved to core yet.
 *           For our purposes using the should still be fine, and I do not anticipate any major changes
 *           happening that would break how this set up works. However, imports will need to be updated 
 *           once TreeView and TreeItem move out of lab.
 * 
 * @returns {React.ElementType}
 */

export default function BusinessTree() {
  const [expanded, setExpanded] = React.useState([]); 

  const handleToggle = (e, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleExpanded = () => {
    setExpanded((old) =>
      //these are all the ids of the nodes that expand to show more nodes
      old.length === 0 ? ['1', '2', '3', '4', '5', '12', '13', '20', '21', '22', '23', '24', '31', '32' ] : [],
    );
  };

  return (
    <FormControl sx={{ height: 300, flexGrow: 1, minWidth: 950, overflowX: 'hidden', overflowY: 'auto', border: 1, borderColor: 'grey.500', borderRadius: 1}}>
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpanded}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Box>
      <TreeView
        aria-label="business tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
      >
        <TreeItem nodeId="1" label="EAI Domain 1">
          <TreeItem nodeId="2" label="Publishing Domain 1"> 
            <TreeItem nodeId="4" label="Business Process 1">
              <TreeItem nodeId="6" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="7" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="8" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
            <TreeItem nodeId="5" label="Business Process 2">
              <TreeItem nodeId="9" label="Business Process-2a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="10" label="Business Process-2b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="11" label="Business Process-2c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="3" label="Publishing Domain 2">
            <TreeItem nodeId="12" label="Business Process 1">
              <TreeItem nodeId="14" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="15" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="16" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
            <TreeItem nodeId="13" label="Business Process 2">
              <TreeItem nodeId="17" label="Business Process-2a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="18" label="Business Process-2b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="19" label="Business Process-2c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
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
              <TreeItem nodeId="28" label="Business Process-2a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="29" label="Business Process-2b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="30" label="Business Process-2c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
          </TreeItem>
          <TreeItem nodeId="22" label="Publishing Domain 2">
          <TreeItem nodeId="31" label="Business Process 1">
              <TreeItem nodeId="33" label="Business Process-1a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="34" label="Business Process-1b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="35" label="Business Process-1c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
            <TreeItem nodeId="32" label="Business Process 2">
              <TreeItem nodeId="36" label="Business Process-2a BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="37" label="Business Process-2b BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
              <TreeItem nodeId="38" label="Business Process-2c BP Create Date; Context Name 1 = Context Value 1; Context Name 2 = Context Value 2"/>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    </FormControl>
  );
}


//PLEASE DO NOT CHANGE ANY OF THE STRUCTURE ABOVE.
//final thing todo: selection from this tree is used to filter