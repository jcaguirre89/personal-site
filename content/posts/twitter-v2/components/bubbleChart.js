import { ResponsiveBubbleCanvas } from '@nivo/circle-packing'


const BubbleChart = ({ root }) => (
  <ResponsiveBubbleCanvas
    root={root}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    identity="name"
    value="value"
    colors={{ scheme: "yellow_orange_red" }}
    colorBy="name"
    leavesOnly={true}
    enableLabel={false}
    label="name"
    labelSkipRadius={10}
    labelTextColor={{ from: "color", modifiers: [["darker", 0.8]] }}
    borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
    animate={true}
    motionStiffness={90}
    motionDamping={12}
  />
);
