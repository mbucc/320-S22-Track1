import React from 'react';
import {Button} from '@mui/material';
import {BPColors, BPStandards} from './standards';

const BPTextButton = ({id = 'bp-text-button', children, style, ...props}) => {
  return (
    <Button
      id={id}
      {...props}
      onClick={props.onClick}
      variant="text"
      sx={{
        color: BPColors.gray[400],
        borderRadius: 999,
        p: '5px 17px',
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: BPStandards.fontFamily,
        letterSpacing: '0.2px',
        textTransform: 'Initial',
        '&:hover': {
          backgroundColor: '#00000007',
          color: BPColors.black,
        },
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

const BPButton = ({id = 'bp-button', children, ...props}) => {
  return (
    <Button
      id={id}
      {...props}
      size={'small'}
      sx={{
        color: 'white',
        borderRadius: 999,
        p: '2.5px 6px 3.5px 6px',
        fontSize: '15px',
        fontWeight: '500',
        fontFamily: BPStandards.fontFamily,
        letterSpacing: '0.2px',
        textTransform: 'Initial',
        backgroundColor: '#22c55e',
        '&:hover': {
          backgroundColor: '#16a34a',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  BPTextButton,
  BPButton,
};