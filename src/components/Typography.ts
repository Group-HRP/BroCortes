import styled from "styled-components/native";

// First, define your theme types separately
interface ThemeColors {
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
}

interface FontWeights {
	light: number;
	normal: number;
	medium: number;
	semiBold: number;
	bold: number;
	extraBold: number;
}

interface FontSizesBody {
	tiny: number;
	small: number;
	regular: number;
	medium: number;
}

interface FontSizesHeading {
	base: number;
	tiny: number;
	small: number;
	regular: number;
	medium: number;
	large: number;
}

interface FontFamilyBody {
	light: string;
	regular: string;
	medium: string;
	semiBold: string;
	bold: string;
	extraBold: string;
}

// Make heading properties optional
interface FontFamilyHeading {
	regular?: string;
	bold: string;
	black?: string;
}

interface ThemeFonts {
	body: FontFamilyBody;
	heading: FontFamilyHeading;
	sizesBody: FontSizesBody;
	sizesHeading: FontSizesHeading;
	weights: FontWeights;
	lineHeight: string;
}

interface ThemeSpacing {
	small: number;
	medium: number;
	large: number;
}

interface FullTheme {
	colors: ThemeColors;
	fonts: ThemeFonts;
	spacing: ThemeSpacing;
}

// Now define your component props using these interfaces
interface TypographyProps {
	color?: keyof ThemeColors | string;
	fontSize?: keyof FontSizesBody | keyof FontSizesHeading;
	weight?: keyof FontWeights;
	fontFamily?: keyof FontFamilyBody | keyof FontFamilyHeading;
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	borderBottomWidth?: number;
	borderColor?: keyof ThemeColors;
	borderWidth?: number;
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
	lineHeight?: number;
	letterSpacing?: number;
	isTitle?: boolean;
	margin?: number;
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;
	marginHorizontal?: number;
	marginVertical?: number;
}

// Helper functions
const getFontFamily = (
	fontFamily: TypographyProps["fontFamily"],
	weight: TypographyProps["weight"],
	isTitle: TypographyProps["isTitle"],
	theme: { fonts: { body: FontFamilyBody; heading: FontFamilyHeading } },
) => {
	if (fontFamily) {
		return isTitle
			? theme.fonts.heading[fontFamily as keyof FontFamilyHeading] ||
					theme.fonts.heading.bold
			: theme.fonts.body[fontFamily as keyof FontFamilyBody] ||
					theme.fonts.body.regular;
	}

	if (isTitle) {
		return weight === "bold"
			? theme.fonts.heading.bold
			: theme.fonts.heading.regular || theme.fonts.heading.bold;
	}

	return weight === "bold" ? theme.fonts.body.bold : theme.fonts.body.regular;
};

const getFontSize = (
	fontSize: TypographyProps["fontSize"],
	isTitle: TypographyProps["isTitle"],
	theme: {
		fonts: { sizesBody: FontSizesBody; sizesHeading: FontSizesHeading };
	},
) => {
	const size = fontSize || (isTitle ? "regular" : "regular");
	return isTitle
		? theme.fonts.sizesHeading[size as keyof FontSizesHeading] || 16
		: theme.fonts.sizesBody[size as keyof FontSizesBody] || 16;
};

const BaseText = styled.Text<TypographyProps>`
  color: ${({ color, theme }) =>
		color && theme.colors[color as keyof ThemeColors]
			? theme.colors[color as keyof ThemeColors]
			: color || theme.colors.text};
  
  font-size: ${({ fontSize, isTitle, theme }) =>
		getFontSize(fontSize, isTitle, theme)}px;
  
  font-weight: ${({ weight = "normal", theme }) => theme.fonts.weights[weight]};
  
  font-family: ${({ fontFamily, weight = "normal", isTitle, theme }) =>
		getFontFamily(fontFamily, weight, isTitle, theme)};
  
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ borderBottomWidth }) => borderBottomWidth !== undefined && `border-bottom-width: ${borderBottomWidth}px;`}
  ${({ borderColor, theme }) => borderColor !== undefined && `border-color: ${theme.colors[borderColor]};`}
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  ${({ textAlign }) => textAlign !== undefined && `text-align: ${textAlign};`}
  ${({ lineHeight }) => lineHeight !== undefined && `line-height: ${lineHeight}px;`}
  ${({ letterSpacing }) => letterSpacing !== undefined && `letter-spacing: ${letterSpacing}px;`}
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginTop }) => marginTop !== undefined && `margin-top: ${marginTop}px;`}
  ${({ marginBottom }) => marginBottom !== undefined && `margin-bottom: ${marginBottom}px;`}
  ${({ marginLeft }) => marginLeft !== undefined && `margin-left: ${marginLeft}px;`}
  ${({ marginRight }) => marginRight !== undefined && `margin-right: ${marginRight}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
`;

export const Title = styled(BaseText).attrs({
	isTitle: true,
})``;

export const Text = styled(BaseText).attrs({
	isTitle: false,
})``;
