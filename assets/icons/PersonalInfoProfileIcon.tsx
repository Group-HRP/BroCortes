import Svg, { Path } from 'react-native-svg';

const PersonalInfoProfileIcon = ({ width = 20, height = 21 }) => (
    <Svg width={width} height={height} fill="none" viewBox="0 0 22 23">
    <Path 
      d="M4.51997 19.11C4.79498 18.1947 5.35771 17.3924 6.12468 16.8222C6.89166 16.252 7.82202 15.9442 8.77774 15.9444H13.2222C14.1791 15.9441 15.1106 16.2527 15.8782 16.8242C16.6457 17.3957 17.2083 18.1998 17.4822 19.1167M21 11.5C21 17.0228 16.5228 21.5 11 21.5C5.47715 21.5 1 17.0228 1 11.5C1 5.97715 5.47715 1.5 11 1.5C16.5228 1.5 21 5.97715 21 11.5ZM14.3333 9.27778C14.3333 11.1187 12.8409 12.6111 11 12.6111C9.15905 12.6111 7.66667 11.1187 7.66667 9.27778C7.66667 7.43683 9.15905 5.94444 11 5.94444C12.8409 5.94444 14.3333 7.43683 14.3333 9.27778Z" 
      stroke="white" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
    />

    </Svg>
);

export default PersonalInfoProfileIcon;
