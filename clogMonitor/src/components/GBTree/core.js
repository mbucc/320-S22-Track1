import React from 'react';
import BPTreeComponent from './tree-view';
import {BPColors} from '../GBTimeTreeHelper/standards';
import BPTreeFilterComponent from './tree-filter';

import {useLPSession} from '@taci-tech/launchpad-js';
import {BPLaunchpad} from '../launchpad/core';
import BPLoader from '../GBTimeTreeHelper/loader';
import {IconMoodEmpty} from '@tabler/icons';

const BPTreeView = ({
  onChange,
}) => {
  const {
    data,
    setParam,
    isLoading,
  } = useLPSession(BPLaunchpad.tree.getMap());

  const {
    data: eaiDomainList,
  } = useLPSession(BPLaunchpad.tree.getEAIDomainList());

  const {
    data: publishingBusinessDomainList,
  } = useLPSession(BPLaunchpad.tree.getPublishingBusinessDomainList());

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPTreeFilterComponent
        eaiDomainList={eaiDomainList}
        publishingBusinessDomainList={publishingBusinessDomainList}
        onChange={(filter) => {
          setParam(filter);
        }}
      />

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Map Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          backgroundColor: '#ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTreeComponent
          data={data}
          isLoading={isLoading}
          onChange={(log) => {
            if (onChange && log) {
              onChange(log.eai_transaction_id);
            }
          }}
        />
        <div
          style={{
            display: isLoading ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: BPColors.white,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '12px',
          }}
        >
          <BPLoader/>
          <div
            style={{
              fontSize: '15px',
              fontWeight: '500',
              color: BPColors.gray[400],
            }}
          >
            Loading...
          </div>
        </div>
        <div
          style={{
            display: !isLoading && data.length === 0 ? 'flex' : 'none',
            position: 'absolute',
            backgroundColor: BPColors.white,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '12px',
          }}
        >
          <IconMoodEmpty
            style={{
              color: BPColors.gray[400],
            }}
          />
          <div
            style={{
              fontSize: '15px',
              fontWeight: '500',
              color: BPColors.gray[400],
            }}
          >
            No entries found
          </div>
        </div>
      </div>
    </div>
  );
};

export default BPTreeView;