import React from 'react';
import {ResponsiveBubble} from '@nivo/circle-packing';

const BubbleChart = ({root}) => (
  <ResponsiveBubble
    root={root}
    margin={{top: 20, right: 20, bottom: 20, left: 20}}
    identity="name"
    value="value"
    colors={{scheme: 'blues'}}
    colorBy="value"
    leavesOnly={true}
    enableLabel={true}
    labelSkipRadius={20}
    labelTextColor={{from: 'color', modifiers: [['brighter', 2]]}}
    borderColor={{from: 'color', modifiers: [['darker', 0.3]]}}
    animate={true}
    motionStiffness={90}
    motionDamping={12}
  />
);

export default BubbleChart;
