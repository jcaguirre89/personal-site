import React from 'react';
import {ResponsiveBubble} from '@nivo/circle-packing';

const BubbleChart = ({ root, colorMode }) => {

  const bubbleColor = colorMode === "dark" ? "hsla(212, 80%, 70%, 1)" : "hsla(212, 80%, 60%, 1)";
  const labelColorModifiers =
    colorMode === "dark" ? [["darker", 2]] : [["brighter", 2]];

  return <ResponsiveBubble
  root={root}
  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    identity="name"
    value="value"
    colors={bubbleColor}
    leavesOnly={true}
    enableLabel={true}
    labelSkipRadius={20}
    labelTextColor={{ from: "color", modifiers: labelColorModifiers }}
    borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
    animate={true}
    motionStiffness={90}
    motionDamping={12}
    />
  }

export default BubbleChart;
