import Svg, { Path } from 'react-native-svg';

const BackArrowIcon = ({ width = 26, height = 16 }) => (
    <Svg width={width} height={height} fill="none" viewBox="0 0 26 16">
    <Path 
      d="M1 8H25M1 8L7.85714 15M1 8L7.85714 1" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
    />
    </Svg>
);

export default BackArrowIcon;
