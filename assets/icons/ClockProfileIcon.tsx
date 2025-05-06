import Svg, { Path } from 'react-native-svg';

const ClockProfileIcon = ({ width = 20, height = 21 }) => (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
    <Path 
      d="M11 4.5V11.5H16M21 11.5C21 17.299 16.5228 22 11 22C5.47715 22 1 17.299 1 11.5C1 5.70101 5.47715 1 11 1C16.5228 1 21 5.70101 21 11.5Z" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
    />

    </Svg>
);

export default ClockProfileIcon;
