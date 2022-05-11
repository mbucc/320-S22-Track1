import React, {useEffect, useRef, useState} from 'react';
import {BPColors, BPDimens, BPStandards} from './standards';

import BPTextInput from './text-input';

import {ClickAwayListener, Popper} from '@mui/material';
import {BPDomainSelectorItem} from './domain-selector-item';

export const BPDomainSelector = ({id = 'bp-domain-selector', label, onChange, searchPlaceholder, list = []}) => {
  const [selectedList, setSelectedList] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  const [resultList, setResultList] = useState(list);

  const [isHovered, setIsHovered] = useState(false);

  // Popper open state.
  const [isOpen, setIsOpen] = useState(false);

  // Popper anchor element.
  const boxRef = useRef(null);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchInputValue.length > 0) {
      setResultList(
          list.filter((item) => item.toLowerCase().includes(searchInputValue.toLowerCase()))
      );
    } else {
      setResultList(list);
    }
  }, [searchInputValue, list]);

  useEffect(() => {
    if (onChange) {
      onChange(selectedList);
    }
  }, [selectedList]);

  const labelStyle = {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 3,
    color: isHovered ? BPColors.green[600] : BPColors.gray[400],
    transition: 'color 0.15s ease-in-out',
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <div
          style={{
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            {label ? (
              <div style={labelStyle}>{label}</div>
            ) : <></>}
            <div
              id={id}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                minHeight: BPDimens.textInputHeight,
                padding: '5px 5px',
                color: BPColors.gray[900],
                borderRadius: BPDimens.smallRadius,
                border: isHovered ? BPStandards.borderFocus : BPStandards.border,
                background: isHovered ? BPColors.white : BPColors.gray[30],
                transition: 'all 0.15s ease-in-out',
                cursor: 'pointer',
              }}
              ref={(ref) => {
                boxRef.current = ref;
              }}
              onClick={(event) => {
                setIsOpen(!isOpen);
              }}
            >
              <div
                id={`${id}-selected-all`}
                style={{
                  padding: '5px 5px',
                  fontSize: 16,
                  fontWeight: '400',
                  color: BPColors.gray[900],
                  display: selectedList.length === 0 ? 'flex' : 'none',
                }}
              >
                All
              </div>
              <div
                id={`${id}-selected-items`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 5,
                }}
              >
                {
                  selectedList.slice(0, 5).map((item) => (
                    <div
                      key={item}
                      style={{
                        fontSize: 12,
                        fontWeight: '500',
                        backgroundColor: BPColors.gray[150],
                        padding: '2px 6px',
                        borderRadius: 3,
                      }}
                    >
                      {item}
                    </div>
                  ))
                }
                <div
                  id={`${id}-selected-more`}
                  style={{
                    paddingLeft: 4,
                    fontSize: 12,
                    fontWeight: '400',
                    color: BPColors.gray[500],
                    display: selectedList.length > 5 ? 'flex' : 'none',
                  }}
                >
                  ... {selectedList.length - 5} more
                </div>
              </div>
            </div>
          </div>
          <Popper
            id={isOpen ? `${id}-popper` : undefined}
            open={isOpen}
            anchorEl={boxRef.current}
            onClose={handlePopoverClose}
            placement='bottom-start'
            style={{
              zIndex: 100,
              width: boxRef.current?.clientWidth + 100 ?? 'auto',
            }}
            modifiers={[
              {
                name: 'preventOverflow',
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: false,
                  tether: true,
                  rootBoundary: 'viewport',
                  padding: 8,
                },
              },
            ]}
          >
            <div
              style={{
                width: '100%',
                borderRadius: BPDimens.cornerRadius,
                border: BPStandards.border,
                overflow: 'hidden',
                backgroundColor: 'white',
                paddingTop: 8,
                paddingLeft: 8,
                paddingRight: 8,
                boxShadow: '0px 20px 50px 0px rgba(0,0,0,0.10)',
                marginTop: 6,
                marginBottom: 6,
                transform: 'translateX(-5px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <BPTextInput
                id={`${id}-popper-search`}
                style={{
                  width: '100%',
                  flexShrink: 0,
                }}
                value={searchInputValue}
                onTextChange={(value) => setSearchInputValue(value)}
                placeholder={searchPlaceholder || 'Search a domain'}
              />
              <div
                id={`${id}-popper-list`}
                style={{
                  width: '100%',
                  maxHeight: '40vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingTop: resultList.length > 0 ? 6 : 0,
                  paddingBottom: 8,
                }}
              >
                <BPDomainSelectorItem
                  id={`${id}-popper-item-all`}
                  item={'All'}
                  selected={selectedList.length === 0 || selectedList.includes('All')}
                  onClick={() => {
                    if (selectedList.length !== 0) {
                      setSelectedList([]);
                    }
                  }}
                  style={{
                    display: resultList.length > 0 ? 'flex' : 'none',
                  }}
                />
                {resultList.map((item) => (
                  <BPDomainSelectorItem
                    key={item}
                    item={item}
                    selected={selectedList.includes(item)}
                    onClick={() => {
                      if (selectedList.includes(item)) {
                        setSelectedList(selectedList.filter(
                            (selectedItem) => selectedItem !== item
                        ));
                      } else {
                        const newSelectedList = [...selectedList, item];
                        setSelectedList(list.filter(
                            (selectedItem) => newSelectedList.includes(selectedItem)
                        ));
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};