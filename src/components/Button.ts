import styled from "styled-components/native";
import type { FontBody } from "../theme";

type AppTheme = {
	colors: {
		background: string;
		background200: string;
		background300: string;
		primary: string;
		primary200: string;
		primary300: string;
		accent: string;
		accent200: string;
		accent300: string;
		text: string;
	};
	fonts: {
		body: FontBody;
		heading: {
			bold: string;
		};
		sizes: {
			xs: number;
			sm: number;
			md: number;
			lg: number;
			h6: number;
			h5: number;
			h4: number;
			h3: number;
			h2: number;
			h1: number;
		};
		weights: {
			light: number;
			normal: number;
			medium: number;
			semiBold: number;
			bold: number;
			extraBold: number;
		};
		lineHeight: string;
	};
	spacing: {
		small: number;
		medium: number;
		large: number;
	};
};

interface ButtonProps {
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	fontSize?: keyof AppTheme["fonts"]["sizes"];
	backgroundColor?: keyof AppTheme["colors"];
	color?: keyof AppTheme["colors"];
	fontFamily?:
		| keyof AppTheme["fonts"]["body"]
		| keyof AppTheme["fonts"]["heading"];
	margin?: number;
	marginHorizontal?: number;
	marginVertical?: number;
	marginTop?: number;
	marginBottom?: number;
	borderRadius?: number | keyof AppTheme["spacing"];
	fullWidth?: boolean;
	disabled?: boolean;
	alignSelf?: "flex-start" | "center" | "flex-end";
	width?: number | string;
	height?: number | string;
	borderWidth?: number;
	borderColor?: keyof AppTheme["colors"];
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  /* Layout */
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ width }) => width !== undefined && `width: ${typeof width === "number" ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === "number" ? `${height}px` : height};`}
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  
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
  
  /* Flex */
  justify-content: center;
  align-items: center;
`;

interface ButtonTextProps {
	color?: keyof AppTheme["colors"];
	fontSize?: keyof AppTheme["fonts"]["sizes"];
	fontFamily?:
		| keyof AppTheme["fonts"]["body"]
		| keyof AppTheme["fonts"]["heading"];
	weight?: keyof AppTheme["fonts"]["weights"];
	uppercase?: boolean;
	isTitle?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ fontSize = "md", theme }) => theme.fonts.sizes[fontSize]}px;
  font-weight: ${({ weight = "semiBold", theme }) => theme.fonts.weights};
  font-family: ${({ fontFamily, weight = "normal", isTitle, theme }) => {
		if (fontFamily) {
			return isTitle
				? // biome-ignore lint/complexity/useLiteralKeys: <explanation>
					theme.fonts.heading["bold"] || theme.fonts.heading.bold
				: theme.fonts.body[fontFamily as keyof FontBody];
		}
		return isTitle
			? theme.fonts.heading.bold
			: theme.fonts.body[weight as keyof FontBody] || theme.fonts.body.regular;
	}};
  ${({ uppercase }) => uppercase && "text-transform: uppercase;"}
`;

declare module "styled-components" {
	export interface DefaultTheme extends AppTheme {}
}
