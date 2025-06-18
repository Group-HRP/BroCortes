import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";

interface InputProps {
	padding?: number;
	width?: number | string;
	color?: keyof DefaultTheme["colors"];
	fontFamily?:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"];
	fontSize?: keyof DefaultTheme["fonts"]["sizes"] | string;
	backgroundColor?: keyof DefaultTheme["colors"];
	borderRadius?: keyof DefaultTheme["borders"]["radius"];
	borderColor?: keyof DefaultTheme["colors"];
	borderSize?: number;
	borderBottomWidth?: number;
	marginTop?: number;
	marginBottom?: number;
	isTitle?: boolean;
}

const getFontSize = (
	fontSize: keyof DefaultTheme["fonts"]["sizes"] | string | undefined,
	isTitle: boolean | undefined,
	theme: DefaultTheme,
): string => {
	if (!fontSize) {
		return `${isTitle ? theme.fonts.sizes.md : theme.fonts.sizes.lg}px`;
	}
	if (typeof fontSize === "string" && fontSize in theme.fonts.sizes) {
		return `${theme.fonts.sizes[fontSize as keyof typeof theme.fonts.sizes]}px`;
	}
	return fontSize; // valor string customizado
};

export const Input = styled.TextInput<InputProps>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.text)};
  background-color: ${({ backgroundColor, theme }) =>
		backgroundColor
			? theme.colors[backgroundColor]
			: theme.colors.background300};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "100%")};
  font-family: ${({ fontFamily, theme, isTitle }) => {
		if (!fontFamily) return theme.fonts.body.regular;

		return isTitle
			? theme.fonts.heading[fontFamily as keyof typeof theme.fonts.heading] ||
					theme.fonts.body.regular
			: theme.fonts.body[fontFamily as keyof typeof theme.fonts.body] ||
					theme.fonts.body.regular;
	}};

	

font-size: ${({ fontSize, isTitle, theme }) =>
			getFontSize(fontSize, isTitle, theme)};

  border-radius: ${({ borderRadius, theme }) =>
		borderRadius ? `${theme.borders.radius[borderRadius]}px` : "4px"};
  border-width: ${({ borderSize }) => (borderSize ? `${borderSize}px` : "0px")};
  ${({ borderBottomWidth }) =>
    borderBottomWidth !== undefined && `border-bottom-width: ${borderBottomWidth}px;`}
  border-color: ${({ borderColor, theme }) =>
		borderColor ? theme.colors[borderColor] : theme.colors.background};
    
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : "0px")};
  padding: ${({ padding }) => (padding ? `${padding}px` : "12px")};
`;
