import React, {useState} from 'react';
import {BPColors, BPDimens} from './standards';
import {IconCheck} from '@tabler/icons';

export const BPDomainSelectorItem = ({id, item, selected, style, onClick}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={id}
      style={{
        padding: '10px 10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 15,
        fontWeight: '500',
        borderRadius: BPDimens.smallRadius,
        backgroundColor: isHovered ? BPColors.gray[70] : 'transparent',
        color: isHovered ? BPColors.gray[900] : BPColors.gray[500],
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: 20,
          height: 20,
          marginRight: 6,
        }}
      >
        <IconCheck
          color={BPColors.green[600]}
          strokeWidth={2.6}
          width={'100%'}
          height={'100%'}
          style={{
            opacity: selected ? 1 : 0,
            transition: 'opacity 0.15s ease-in-out',
          }}
        />
      </div>
      {item}
    </div>
  );
};