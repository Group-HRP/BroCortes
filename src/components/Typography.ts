import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";

// Props do componente usando DefaultTheme diretamente
interface TypographyProps {
	color?: keyof DefaultTheme["colors"] | string;
	fontSize?: keyof DefaultTheme["fonts"]["sizes"];
	fontWeight?: keyof DefaultTheme["fonts"]["weights"];
	fontFamily?:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"];
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	margin?: number;
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;
	marginHorizontal?: number;
	marginVertical?: number;
	borderBottomWidth?: number;
	borderColor?: keyof DefaultTheme["colors"];
	borderWidth?: number;
	borderRadius?: number | keyof DefaultTheme["spacing"];
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
	lineHeight?: number;
	letterSpacing?: number;
	textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
	isTitle?: boolean;
}

// Funções auxiliares usando DefaultTheme
const getFontSize = (
	fontSize: keyof DefaultTheme["fonts"]["sizes"] | undefined,
	isTitle: boolean | undefined,
	theme: DefaultTheme,
): number => {
	if (!fontSize) {
		return isTitle ? theme.fonts.sizes.md : theme.fonts.sizes.lg;
	}
	return theme.fonts.sizes[fontSize];
};

const getFontFamily = (
	fontFamily:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"]
		| undefined,
	fontWeight: keyof DefaultTheme["fonts"]["weights"] | undefined,
	isTitle: boolean | undefined,
	theme: DefaultTheme,
): string => {
	if (fontFamily) {
		return isTitle
			? theme.fonts.heading.bold
			: theme.fonts.body[fontFamily] || theme.fonts.body.regular;
	}

	const weight = fontWeight || "regular";
	return isTitle
		? theme.fonts.heading.bold
		: theme.fonts.body[weight as keyof typeof theme.fonts.body] ||
				theme.fonts.body.regular;
};

// Componente base usando DefaultTheme
const BaseText = styled.Text<TypographyProps>`
  /* Cores */
  color: ${({ color, theme }) => {
		if (!color) return theme.colors.text;
		return theme.colors[color as keyof DefaultTheme["colors"]] || color;
	}};

  /* Tipografia */
  font-size: ${({ fontSize, isTitle, theme }) =>
		`${getFontSize(fontSize, isTitle, theme)}px`};

  font-weight: ${({ fontWeight = "regular", theme }) =>
		theme.fonts.weights[fontWeight]};
  
  font-family: ${({ fontFamily, fontWeight, isTitle, theme }) =>
		getFontFamily(fontFamily, fontWeight, isTitle, theme)};
  
`;

export const Title = styled(BaseText).attrs({ isTitle: true })``;
export const Text = styled(BaseText).attrs({ isTitle: false })``;

