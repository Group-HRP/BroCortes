import Svg, { Path } from 'react-native-svg';

const SchedulingIcon = ({ width = 20, height = 21, color = 'white' }) => (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill="none" accessibilityLabel="Scheduling Icon">
        <Path d="M4.33333 1V3M13.6667 1V3M1 15V5C1 3.89543 1.89543 3 3 3H15C16.1046 3 17 3.89543 17 5V15M1 15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15M1 15V8.33333C1 7.22876 1.89543 6.33333 3 6.33333H15C16.1046 6.33333 17 7.22876 17 8.33333V15" stroke={color} stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
);

export default SchedulingIcon;
