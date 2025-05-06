import Svg, { Path } from 'react-native-svg';

const DoorProfileIcon = ({ width = 20, height = 20}) => (
    <Svg 
        width={width} 
        height={height}
        fill="none" 
        viewBox="0 0 20 21" // Ajustado para conter todo o desenho
    >
        <Path 
            d="M11 10.5V10.51M1 19.5H19M3 19.5V3.5C3 2.96957 3.21071 2.46086 3.58579 2.08579C3.96086 1.71071 4.46957 1.5 5 1.5H11M15 12V19.5M19 5.5H12M12 5.5L15 2.5M12 5.5L15 8.5" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </Svg>
);

export default DoorProfileIcon;