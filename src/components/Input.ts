import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";

interface InputProps {
	padding?: number;
	width?: number | string;
	color?: keyof DefaultTheme["colors"];
	fontFamily?:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"];
	backgroundColor?: keyof DefaultTheme["colors"];
	borderRadius?: keyof DefaultTheme["borders"]["radius"];
	borderColor?: keyof DefaultTheme["colors"];
	borderSize?: number;
	marginTop?: number;
	marginBottom?: number;
	isTitle?: boolean;
}

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

  border-radius: ${({ borderRadius, theme }) =>
		borderRadius ? `${theme.borders.radius[borderRadius]}px` : "4px"};
  border-width: ${({ borderSize }) => (borderSize ? `${borderSize}px` : "0px")};
  border-color: ${({ borderColor, theme }) =>
		borderColor ? theme.colors[borderColor] : theme.colors.background};
    
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : "0px")};
  padding: ${({ padding }) => (padding ? `${padding}px` : "12px")};
`;
