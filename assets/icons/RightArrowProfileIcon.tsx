import Svg, { Path } from 'react-native-svg';

const RightArrowProfileIcon = ({ width = 12, height = 19, margin = 1 }) => (
    <Svg 
        width={width} 
        height={height}
        fill="none" 
        viewBox={`${-margin} ${-margin} ${14 + margin*2} ${21 + margin*2}`} // Ajustado para conter todo o desenho
        preserveAspectRatio="xMidYMid meet"
    >
        <Path 
            d="M1 1L7 5.75L13 10.5L1 20" 
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default RightArrowProfileIcon;