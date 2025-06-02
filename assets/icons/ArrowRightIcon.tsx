import Svg, { Path } from 'react-native-svg';

const ArrowRightIcon = ({ width = 12, height = 19 }) => (
    <Svg width={width} height={height} fill="none" viewBox="0 0 12 19">
    <Path 
      d="M1 1L6 5.25L11 9.5L1 18" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
    />
    </Svg>
);

export default ArrowRightIcon;
