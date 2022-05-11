import React, {createContext, useContext, useReducer} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material'

//wilsonnexus

export const StateContext = createContext();
const dates = new Date()

const data = 
[
    {
        id: '1',
        name: 'EAI Domain 1',
        date: dates,
        children: 
        [
            {
                id: '2',name: 'Publishing Domain 1',date: dates,
                children: 
                [
                    {
                        id: '4',name: 'Business Process 1',date: dates,
                        children: 
                        [
                            {
                                id: '6',name: 'Business Process-1a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '7',name: 'Business Process-1b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '8',name: 'Business Process-1c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '5',name: 'Business Process 2',date: dates,
                        children: 
                        [
                            {
                                id: '9',name: 'Business Process-2a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '10',name: 'Business Process-2b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '11',name: 'Business Process-2c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },
     



           {
                id: '3',name: 'Publishing Domain 2',date: dates,
                children: 
                [
                    {
                        id: '12',name: 'Business Process 1',date: dates,
                        children: 
                        [
                            {
                                id: '14',name: 'Business Process-1a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '15',name: 'Business Process-1b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '16',name: 'Business Process-1c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '13',name: 'Business Process 2',date: dates,
                        children: 
                        [
                            {
                                id: '17',name: 'Business Process-2a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '18',name: 'Business Process-2b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '19',name: 'Business Process-2c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },

        ],
    },



       


     {
        id: '20',
        name: 'EAI Domain 2',
        date: '',
        children: 
        [
            {
                id: '21',name: 'Publishing Domain 1',date: dates,
                children: 
                [
                    {
                        id: '23',name: 'Business Process 1',date: dates,
                        children: 
                        [
                            {
                                id: '25',name: 'Business Process-1a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '26',name: 'Business Process-1b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '27',name: 'Business Process-1c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '24',name: 'Business Process 2',date: dates,
                        children: 
                        [
                            {
                                id: '28',name: 'Business Process-2a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '29',name: 'Business Process-2b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '30',name: 'Business Process-2c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },
     



           {
                id: '22',name: 'Publishing Domain 2',date: dates,
                children: 
                [
                    {
                        id: '31',name: 'Business Process 1',date: dates,
                        children: 
                        [
                            {
                                id: '33',name: 'Business Process-1a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '34',name: 'Business Process-1b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '35',name: 'Business Process-1c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '32',name: 'Business Process 2',date: dates,
                        children: 
                        [
                            {
                                id: '36',name: 'Business Process-2a BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '37',name: 'Business Process-2b BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '38',name: 'Business Process-2c BP',date: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },

        ],
    },
];

function filterObject(obj, callback) {
    const lst = []
    for(let i = 0; i < 2; i++) {
      lst[i] = Object.fromEntries(Object.entries(obj[i]).filter(([key, val]) => callback(val, key)));
      }
    //console.log(lst)
  return lst
}

function parentCounter(render) {
    for(let i = 0; i < 3; i++) {
      return render
      }

    return(1)
}

export function RichObjectTreeView({reducer, initialState, startTime, endTime}) {
    
    /*const listNode = (nodes) =>{ 
    const lst = []
    for(let i = 0; i < 2; i++) {
      lst[i] = {k : <TreeItem key={nodes[i].id} nodeId={nodes[i].id} label={nodes[i].name + " " + nodes[i].date}>
      {Array.isArray(nodes[i].children)
        ? nodes.children.map((node) => renderTree(node[i]))
        : null}
    </TreeItem>}
      }
return lst 
}*/
  const renderTree = (nodes) => {
return nodes.map((el) => { //<-- mapping on array
  return (
  <div>
    <TreeItem key={el.id} nodeId={el.id} label={el.name + " " + el.date}>
      {Array.isArray(el.children) && el.children.length > 0
        ? renderTree(el.children) //<-- recursion in case children has values
        : null}
    </TreeItem>
    </div>
  );
});
};

  

  return (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    
  <FormControl sx={{ height: 300, flexGrow: 1, minWidth: 900, overflowX: 'hidden', overflowY: 'auto', border: 1, borderColor: 'grey.500', borderRadius: 1}}>
  
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      
    >
    {console.log(data)}
      {
      
      renderTree(data.filter((obj)=>
      {
                console.log(obj)
                return true
                if (obj.date.getTime() >= startTime.getTime() && obj.date.getTime() <= endTime.getTime())
                {
                    return true
                }
                return false       
      }))
           
          /*renderTree(filterObject(data, ([key, value]) => 
          {
                console.log("Hello")
                console.log(key)
                console.log("Hello")
              if (key === "date") {
                
                if (value.getTime() <= startTime.getTime() && value.getTime() >= endTime.getTime())
                {
                    return true
                }
                return false
              }
              return true
          }
          )
          )*/
      
      }
    </TreeView>
    </FormControl>
    </StateContext.Provider>
  );
  
  
}

export const useStateValue = () => useContext(StateContext);
