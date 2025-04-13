import styled from "styled-components/native";
import type ThemeType from "../theme";

interface ButtonProps {
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	fontSize?: keyof (typeof ThemeType)["fonts"]["sizes"];
	backgroundColor?: keyof (typeof ThemeType)["colors"];
	color?: keyof (typeof ThemeType)["colors"];
	fontFamily?: keyof (typeof ThemeType)["fonts"]["family"];
	margin?: number;
	marginHorizontal?: number;
	marginVertical?: number;
	borderRadius?: number | keyof (typeof ThemeType)["fonts"]["sizes"]; // Assumindo que seu tema pode ter valores de radius
	fullWidth?: boolean;
	disabled?: boolean;
	alignSelf?: "flex-start" | "center" | "flex-end";
	width?: number | string;
	height?: number | string;
	borderWidth?: number;
	borderColor?: keyof (typeof ThemeType)["colors"];
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ width }) => width !== undefined && `width: ${typeof width === "number" ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === "number" ? `${height}px` : height};`}
  
  background-color: ${({ backgroundColor, theme }) =>
		backgroundColor ? theme.colors[backgroundColor] : theme.colors.background};
  
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
  
  ${({ borderRadius, theme }) => {
		if (borderRadius === undefined) return "border-radius: 4px;";
		if (typeof borderRadius === "number")
			return `border-radius: ${borderRadius}px;`;
		return `border-radius: ${theme.fonts.sizes?.[borderRadius] || 4}px;`;
	}}
  
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  ${({ borderColor, theme }) => borderColor !== undefined && `border-color: ${theme.colors[borderColor]};`}
  
  ${({ alignSelf }) => alignSelf !== undefined && `align-self: ${alignSelf};`}
  
  ${({ disabled }) => disabled && "opacity: 0.6;"}
  
  justify-content: center;
  align-items: center;
`;

interface ButtonTextProps {
	color?: keyof (typeof ThemeType)["colors"];
	fontSize?: keyof (typeof ThemeType)["fonts"]["sizes"];
	fontFamily?: keyof (typeof ThemeType)["fonts"]["family"];
	weight?: keyof (typeof ThemeType)["fonts"]["weights"];
	uppercase?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ fontSize = "medium", theme }) => theme.fonts.sizes[fontSize]}px;
  font-weight: ${({ weight = "normal", theme }) => theme.fonts.weights[weight]};
  font-family: ${({ fontFamily, weight = "medium", theme }) =>
		fontFamily
			? theme.fonts.family[fontFamily]
			: theme.fonts.family[weight === "bold" ? "bold" : "regular"]};
  ${({ uppercase }) => uppercase && "text-transform: uppercase;"}
`;
