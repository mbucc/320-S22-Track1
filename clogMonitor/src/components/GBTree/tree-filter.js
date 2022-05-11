import React, {useEffect, useState} from 'react';
import {BPDimens, BPStandards} from '../GBTimeTreeHelper/standards';
import {BPDatePicker} from '../GBTimePicker';
import {BPDomainSelector} from '../GBTimeTreeHelper/domain-selector';
import {BPButton} from '../GBTimeTreeHelper/button';

const BPTreeFilterComponent = ({eaiDomainList, publishingBusinessDomainList, onChange}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eaiDomains, setEAIDomains] = useState([]);
  const [publishingBusinessDomains, setPublishingBusinessDomains] = useState([]);

  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);

  // Track the common date picker error.
  useEffect(() => {
    if (startDate && startDate > new Date()) {
      setStartDateError('Start date must be in the past.');
    } else {
      setStartDateError(null);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDateError(null);
    }
  }, [endDate]);

  const onApplyClick = () => {
    if (startDate && endDate && startDate > endDate) {
      setEndDateError('End date must be later than start date.');
      return;
    }

    if (startDate && startDate > new Date()) {
      setStartDateError('Start date must be in the past.');
      return;
    }

    onChange({
      'startTime': startDate,
      'endTime': endDate,
      'eaiDomain': eaiDomains.join(','),
      'publishingBusinessDomain': publishingBusinessDomains.join(','),
    });
  };

  return (
    <div
      style={{
        width: 250,
        height: '100%',
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: BPDimens.toolbarHeight,
          flexShrink: 0,
          borderBottom: BPStandards.border,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 18,
          paddingRight: 17,
        }}
      >
        <p style={{fontSize: 17, fontWeight: '500'}}>
          Business Process
        </p>
        <BPButton
          id={'bp-tree-filter-apply-button'}
          onClick={onApplyClick}
        >
          Apply
        </BPButton>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 18,
          overflowY: 'auto',
          overscrollBehaviorY: 'contain',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: 17,
        }}
      >
        <BPDatePicker
          id={'bp-tree-filter-start-date-picker'}
          label={'Start Date'}
          onChange={(newDate)=> {
            setStartDate(newDate);
          }}
          error={startDateError}
        />

        <BPDatePicker
          id={'bp-tree-filter-end-date-picker'}
          label={'End Date'}
          onChange={(newDate)=> {
            setEndDate(newDate);
          }}
          baseDate={startDate}
          error={endDateError}
        />

        <BPDomainSelector
          id={'bp-tree-filter-eai-domain-selector'}
          label={'EAI Domain'}
          searchPlaceholder={'Search an EAI domain'}
          list={eaiDomainList}
          onChange={(value) => setEAIDomains(value)}
        />

        <BPDomainSelector
          id={'bp-tree-filter-publishing-business-domain-selector'}
          label={'Publishing Business Domain'}
          searchPlaceholder={'Search a publishing domain'}
          list={publishingBusinessDomainList}
          onChange={(value) => setPublishingBusinessDomains(value)}
        />
      </div>
    </div>
  );
};

export default BPTreeFilterComponent;