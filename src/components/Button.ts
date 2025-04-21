import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";

interface ButtonProps {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: keyof DefaultTheme['fonts']['sizes'];
  backgroundColor?: keyof DefaultTheme['colors'];
  color?: keyof DefaultTheme['colors'];
  fontFamily?: keyof DefaultTheme['fonts']['body'] | keyof DefaultTheme['fonts']['heading'];
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  borderRadius?: number | keyof DefaultTheme['spacing'];
  fullWidth?: boolean;
  disabled?: boolean;
  alignSelf?: "flex-start" | "center" | "flex-end";
  width?: number | string;
  height?: number | string;
  borderWidth?: number;
  borderColor?: keyof DefaultTheme['colors'];
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  /* Layout */
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ width }) => width !== undefined && `width: ${typeof width === "number" ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === "number" ? `${height}px` : height};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ display }) => display && `display: ${display};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  
  /* Appearance */
  background-color: ${({ backgroundColor, theme }) =>
		backgroundColor ? theme.colors[backgroundColor] : theme.colors.background};
  
  /* Spacing */
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  
  /* Margin */
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
  ${({ marginTop }) => marginTop !== undefined && `margin-top: ${marginTop}px;`}
  ${({ marginBottom }) => marginBottom !== undefined && `margin-bottom: ${marginBottom}px;`}
  
  /* Borders */
  ${({ borderRadius, theme }) => {
		if (borderRadius === undefined) return "border-radius: 4px;";
		if (typeof borderRadius === "number")
			return `border-radius: ${borderRadius}px;`;
		return `border-radius: ${theme.spacing[borderRadius]}px;`;
	}}
  
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  ${({ borderColor, theme }) =>
		borderColor !== undefined && `border-color: ${theme.colors[borderColor]};`}
  
  /* States */
  ${({ disabled }) => disabled && "opacity: 0.6;"}
  
`;

interface ButtonTextProps {
	color?: keyof DefaultTheme["colors"];
	fontSize?: keyof DefaultTheme["fonts"]["sizes"];
	fontFamily?:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"];
	weight?: keyof DefaultTheme["fonts"]["weights"];
	uppercase?: boolean;
	isTitle?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ fontSize = "md", theme }) => theme.fonts.sizes[fontSize]}px;
  font-weight: ${({ weight = "semiBold", theme }) => theme.fonts.weights[weight]};
  font-family: ${({ fontFamily, weight = "normal", isTitle, theme }) => {
		if (fontFamily) {
			return isTitle ? theme.fonts.heading.bold : theme.fonts.body[fontFamily];
		}
		return isTitle
			? theme.fonts.heading.bold
			: theme.fonts.body[weight as keyof typeof theme.fonts.body] ||
					theme.fonts.body.regular;
	}};
  ${({ uppercase }) => uppercase && "text-transform: uppercase;"}
`;
