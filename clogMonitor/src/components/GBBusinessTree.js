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

//export const StateContext = createContext();
const dates = new Date()

const data = 
[
    {
        id: '1',
        name: 'EAI Domain 1',
        CREATION_TIME: dates,
        children: 
        [
            {
                id: '2',name: 'Publishing Domain 1',CREATION_TIME: dates,
                children: 
                [
                    {
                        id: '4',name: 'Business Process 1',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '6',name: 'Business Process-1a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '7',name: 'Business Process-1b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '8',name: 'Business Process-1c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '5',name: 'Business Process 2',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '9',name: 'Business Process-2a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '10',name: 'Business Process-2b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '11',name: 'Business Process-2c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },
     



           {
                id: '3',name: 'Publishing Domain 2',CREATION_TIME: dates,
                children: 
                [
                    {
                        id: '12',name: 'Business Process 1',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '14',name: 'Business Process-1a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '15',name: 'Business Process-1b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '16',name: 'Business Process-1c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '13',name: 'Business Process 2',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '17',name: 'Business Process-2a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '18',name: 'Business Process-2b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '19',name: 'Business Process-2c BP',CREATION_TIME: dates,
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
        CREATION_TIME: dates,
        children: 
        [
            {
                id: '21',name: 'Publishing Domain 1',CREATION_TIME: dates,
                children: 
                [
                    {
                        id: '23',name: 'Business Process 1',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '25',name: 'Business Process-1a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '26',name: 'Business Process-1b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '27',name: 'Business Process-1c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '24',name: 'Business Process 2',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '28',name: 'Business Process-2a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '29',name: 'Business Process-2b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '30',name: 'Business Process-2c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                        ],
                    },
                ],
            },
     



           {
                id: '22',name: 'Publishing Domain 2',CREATION_TIME: dates,
                children: 
                [
                    {
                        id: '31',name: 'Business Process 1',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '33',name: 'Business Process-1a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '34',name: 'Business Process-1b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '35',name: 'Business Process-1c BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },          
                        ],
                    },
    
                    {
                        id: '32',name: 'Business Process 2',CREATION_TIME: dates,
                        children: 
                        [
                            {
                                id: '36',name: 'Business Process-2a BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '37',name: 'Business Process-2b BP',CREATION_TIME: dates,
                                context1: 'Context Name 1 = Context Value 1',context2: 'Context Name 2 = Context Value 2',
                            },
                            {
                                id: '38',name: 'Business Process-2c BP',CREATION_TIME: dates,
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
  return Object.fromEntries(Object.entries(obj).
    filter(([key, val]) => callback(val, key)));
}

function parentCounter(render) {
    for(let i = 0; i < 3; i++) {
      return render
      }

    return(1)
}

export function RichObjectTreeView({startTime, endTime, data2}) {
    console.log("Repeat")
    console.log(data2)
    console.log("Repeat")
    const data3 = []
    data2.filter((obj)=>
    {
        data3.push({BUSINESS_DOMAIN: obj.BUSINESS_DOMAIN, BUSINESS_SUBDOMAIN: obj.BUSINESS_SUBDOMAIN, CREATION_TIME: obj.CREATION_TIME, EAI_DOMAIN: obj.EAI_DOMAIN, SEVERITY: obj.SEVERITY})
        filterObject(obj,(val, key)=>
            {
                if(key ==="BUSINESS_DOMAIN" ||key ==="BUSINESS_SUBDOMAIN" ||key ==="CREATION_TIME" ||key ==="EAI_DOMAIN" ||key ==="SEVERITY")
                {
                    
                    return true
                }
                /*console.log("Value")
                console.log(val)
                console.log("Value")
                console.log("Key")
                console.log(key)
                console.log("Key")*/
                return false
            }
        )
     return true
    })

    console.log("Repeat3")
    console.log(data3)
    console.log("Repeat3")
    const data4 = []
    let node_count0 = 1
    let node_count1 = 2
    let node_count2 = 3
    let node_count3 = 4

    data3.filter((obj)=>
    {
       
        data4.push({id:node_count0.toString(),
        name: obj.EAI_DOMAIN,
        CREATION_TIME: obj.CREATION_TIME,
        children: [
        {
            id:node_count1.toString(),
        name: obj.BUSINESS_DOMAIN,
        CREATION_TIME: obj.CREATION_TIME,
        children: [
            {
                id:node_count2.toString(),
                name: obj.BUSINESS_SUBDOMAIN,
                CREATION_TIME: obj.CREATION_TIME,
                children: [
                    {
                        id:node_count3.toString(),
                        name: obj.SEVERITY,
                        CREATION_TIME: obj.CREATION_TIME,
        
                    }
        
                ]
            }
        
        ]
        }
        
        ]})
        node_count0 =node_count0+4;
        node_count1 =node_count1 +4;
        node_count2 =node_count2 +4;
        node_count3 =node_count3 +4;
        return true
    }
    )
    console.log("Repeat4")
    console.log(data4)
    console.log("Repeat4")

    
  const renderTree = (nodes) => {
return nodes.map((el) => { //<-- mapping on array
  return (
  <div>
    <TreeItem key={el.id} nodeId={el.id} label={el.name + " " + el.CREATION_TIME}>
      {Array.isArray(el.children) && el.children.length > 0
        ? renderTree(el.children.filter((obj)=>
      {
                /*console.log("Timer")
                console.log(obj)
                console.log(obj.CREATION_TIME)
                console.log("Timer")*/
                console.log(startTime)
                
                console.log(startTime.getTime())
                //return true
                if (obj.CREATION_TIME.getTime() >= startTime.getTime() && obj.CREATION_TIME.getTime() <= endTime.getTime())
                {
                    console.log("Timer")
                    return true
                }
                return false       
      })) //<-- recursion in case children has values
        : null}
    </TreeItem>
    </div>
  );
});
};


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
  //<StateContext.Provider value={useReducer(reducer, initialState)}>
    
  <FormControl sx={{ height: 300, flexGrow: 1, minWidth: 900, overflowX: 'hidden', overflowY: 'auto', border: 1, borderColor: 'grey.500', borderRadius: 1}}>
    <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpanded}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Box>
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleToggle}
    >
    
      {
      
      renderTree(data4.filter((obj)=>
      {
                console.log("Timer")
                console.log(obj)
                console.log(obj.CREATION_TIME)
                console.log("Timer")
                console.log(startTime)
                
                console.log(startTime.getTime())
                //return true
                if (obj.CREATION_TIME.getTime() >= startTime.getTime() && obj.CREATION_TIME.getTime() <= endTime.getTime())
                {
                    console.log("Timer")
                    return true
                }
                return false       
      }))
      
      }
    </TreeView>
    </FormControl>
    //</StateContext.Provider>
  );
  
  
}

//export const useStateValue = () => useContext(StateContext);
