import React from 'react';
import styled from 'styled-components';
import {IconLoaderQuarter} from '@tabler/icons';
import {BPColors} from './standards';

const SpinLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${BPColors.gray[400]};
  
  // Infinite loop animation.
  -webkit-animation: rotating 1400ms linear infinite;
  -moz-animation: rotating 1400ms linear infinite;
  -ms-animation: rotating 1400ms linear infinite;
  -o-animation: rotating 1400ms linear infinite;
  animation: rotating 1400ms linear infinite;

  // Keyframe animation for Safari and Chrome.
  @-webkit-keyframes rotating {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  
  // Keyframe animation for all backwards compatible browsers.
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

/**
 * [BP] A loading spinner component.
 * @return {React.Component}
 */
export default function BPLoader({style}) {
  return (
    <SpinLayout>
      <IconLoaderQuarter style={style}/>
    </SpinLayout>
  );
}