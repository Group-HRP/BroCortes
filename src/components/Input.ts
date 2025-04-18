import styled from "styled-components/native";
import type theme from "../theme";

interface InputProps {
	padding?: number;
	width?: number | string;
	color?: keyof typeof theme.colors;
	fontFamily?: keyof typeof theme.fonts.body | keyof typeof theme.fonts.heading;
	backgroundColor?: keyof typeof theme.colors;
	borderRadius?: number;
	borderColor?: keyof typeof theme.colors;
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
  font-family: ${({ fontFamily, theme, isTitle }) =>
		fontFamily
			? (
					isTitle
						? theme.fonts.heading[
								fontFamily as keyof typeof theme.fonts.heading
							]
						: theme.fonts.body[fontFamily as keyof typeof theme.fonts.body]
				)
			: theme.fonts.body.regular};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : "4px")};
  border-width: ${({ borderSize }) => (borderSize ? `${borderSize}px` : "0px")};
  border-color: ${({ borderColor, theme }) =>
		borderColor ? theme.colors[borderColor] : theme.colors.background};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : "0px")};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : "0px")};
  padding: ${({ padding }) => (padding ? `${padding}px` : "12px")};
`;
