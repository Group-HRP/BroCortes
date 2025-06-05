import styled from "styled-components/native";
import type { DefaultTheme } from "styled-components";

// Props do componente
interface TypographyProps {
	color?: keyof DefaultTheme["colors"] | string;
	fontSize?: keyof DefaultTheme["fonts"]["sizes"] | string;
	fontWeight?: keyof DefaultTheme["fonts"]["weights"] | string;
	fontFamily?:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"]
		| string;
	padding?: number;
	paddingTop?: number;
	paddingBottom?: number;
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
	borderColor?: keyof DefaultTheme["colors"] | string;
	borderWidth?: number;
	borderRadius?: number | keyof DefaultTheme["spacing"];
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
	lineHeight?: number;
	letterSpacing?: number;
	textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
	isTitle?: boolean;
	width?: number;
}

// Helpers
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

const getFontFamily = (
	fontFamily:
		| keyof DefaultTheme["fonts"]["body"]
		| keyof DefaultTheme["fonts"]["heading"]
		| string
		| undefined,
	fontWeight: keyof DefaultTheme["fonts"]["weights"] | string | undefined,
	isTitle: boolean | undefined,
	theme: DefaultTheme,
): string => {
	if (isTitle) return theme.fonts.heading.bold;

	if (fontFamily) {
		if (fontFamily in theme.fonts.body) {
			return theme.fonts.body[fontFamily as keyof typeof theme.fonts.body];
		}
		return fontFamily; // string customizada
	}

	if (fontWeight && fontWeight in theme.fonts.body) {
		return theme.fonts.body[fontWeight as keyof typeof theme.fonts.body];
	}

	return theme.fonts.body.regular;
};

const BaseText = styled.Text<TypographyProps>`
    /* Cor */
    color: ${({ color, theme }) => {
			if (!color) return theme.colors.text;
			return color in theme.colors
				? theme.colors[color as keyof typeof theme.colors]
				: color;
		}};

	width: ${({ width }) => (width ? `${width}px` : "auto")};

    /* Tipografia */

    font-size: ${({ fontSize, isTitle, theme }) =>
			getFontSize(fontSize, isTitle, theme)};

    font-family: ${({ fontFamily, fontWeight, isTitle, theme }) =>
			getFontFamily(fontFamily, fontWeight, isTitle, theme)};

    /* font-weight: ${({ fontWeight }) => fontWeight || "regular"}; */ // Remover esta linha

    /* Extras */
    textAlign: ${({ textAlign }) => textAlign ?? "left"};

    text-transform: ${({ textTransform }) => textTransform ?? "none"};
    line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : "auto")};
    letter-spacing: ${({ letterSpacing }) => letterSpacing ?? 0};

    /* Espaçamento */
    padding: ${({ padding }) => (padding ? `${padding}px` : "0px")};
    padding-horizontal: ${({ paddingHorizontal }) =>
			paddingHorizontal ? `${paddingHorizontal}px` : "0px"};
    padding-vertical: ${({ paddingVertical }) =>
			paddingVertical ? `${paddingVertical}px` : "0px"};
	padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : "0px")};
	padding-bottom: ${({ paddingBottom }) =>
			paddingBottom ? `${paddingBottom}px` : "0px"};
    margin: ${({ margin }) => (margin ? `${margin}px` : "0px")};
    margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : "0px")};
    margin-bottom: ${({ marginBottom }) =>
			marginBottom ? `${marginBottom}px` : "0px"};
    margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : "0px")};
    margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : "0px")};
    margin-horizontal: ${({ marginHorizontal }) =>
			marginHorizontal ? `${marginHorizontal}px` : "0px"};
    margin-vertical: ${({ marginVertical }) =>
			marginVertical ? `${marginVertical}px` : "0px"};

    /* Borda */
    border-bottom-width: ${({ borderBottomWidth }) =>
			borderBottomWidth ? `${borderBottomWidth}px` : "0px"};
    border-width: ${({ borderWidth }) =>
			borderWidth ? `${borderWidth}px` : "0px"};
    border-radius: ${({ borderRadius, theme }) =>
			typeof borderRadius === "string" && borderRadius in theme.spacing
				? `${theme.spacing[borderRadius as keyof typeof theme.spacing]}px`
				: `${borderRadius ?? 0}px`};
    border-color: ${({ borderColor, theme }) =>
			borderColor && borderColor in theme.colors
				? theme.colors[borderColor as keyof typeof theme.colors]
				: (borderColor ?? "transparent")};
`;

export const Title = styled(BaseText).attrs({ isTitle: true })`
    line-height: ${({ lineHeight, fontSize = "md", theme }) => {
        if (lineHeight) return `${lineHeight}px`;
        // Defina os grupos de títulos
        const group120 = ["h1", "h2", "h3"];
        const group140 = ["h4", "h5", "h6"];
        let size = theme.fonts.sizes[fontSize as keyof typeof theme.fonts.sizes];
        if (!size) size = theme.fonts.sizes.md;
        if (group120.includes(fontSize as string)) {
            return `${size * 1.2}px`;
        }
        if (group140.includes(fontSize as string)) {
            return `${size * 1.4}px`;
        }
        return `${size * 1.5}px`; // fallback para outros casos
    }};
`;

export const Text = styled(BaseText).attrs({ isTitle: false })`
    line-height: ${({ lineHeight, fontSize = "md", theme }) => {
        if (lineHeight) return `${lineHeight}px`;
        let size = theme.fonts.sizes[fontSize as keyof typeof theme.fonts.sizes];
        if (!size) size = theme.fonts.sizes.md;
        return `${size * 1.5}px`;
    }};
`;