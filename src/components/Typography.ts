import styled from "styled-components/native";
import type { 
  StyleProps, 
  ButtonTextProps,
  ThemeColorKey,
  ThemeFontSizeKey,
  ThemeFontWeights,
  ThemeFontFamilyKey
} from "../@types/styleTypes";
import type { ThemeType } from "../theme";

// Helper functions
const getThemeColor = (color: string | undefined, theme: ThemeType, defaultColor: string): string => {
  if (!color) return defaultColor;
  return theme.colors[color as ThemeColorKey] || color;
};

const getFontSize = (fontSize: string | number | undefined, theme: ThemeType): number => {
	if (typeof fontSize === 'number') return fontSize;
	if (typeof fontSize === 'string' && fontSize in theme.fonts.sizes) {
	  return theme.fonts.sizes[fontSize as keyof typeof theme.fonts.sizes];
	}
	return theme.fonts.sizes.md;
  };
  
  const getFontWeight = (
	weight: keyof ThemeType['fonts']['weights'] | string | number | undefined,
	theme: ThemeType
  ): string | number => {
	if (typeof weight === 'number') return weight;
	// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
	if (typeof weight === 'string' && !isNaN(Number(weight))) return Number(weight);
	if (typeof weight === 'string' && weight in theme.fonts.weights) {
	  return theme.fonts.weights[weight as keyof typeof theme.fonts.weights];
	}
	return theme.fonts.weights.regular;
  };
  
  const getFontFamily = (
	fontFamily: string | undefined,
	theme: ThemeType
  ): string => {
	if (!fontFamily) return theme.fonts.family.primary;
	return theme.fonts.family[fontFamily as keyof typeof theme.fonts.family] || fontFamily;
  };

// Base Text Component
const BaseText = styled.Text<StyleProps>`
  /* Layout */
  ${({ flex }) => flex !== undefined && `flex: ${flex};`}
  
  /* Spacing */
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  
  /* Margin */
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginTop }) => marginTop !== undefined && `margin-top: ${marginTop}px;`}
  ${({ marginBottom }) => marginBottom !== undefined && `margin-bottom: ${marginBottom}px;`}
  ${({ marginLeft }) => marginLeft !== undefined && `margin-left: ${marginLeft}px;`}
  ${({ marginRight }) => marginRight !== undefined && `margin-right: ${marginRight}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}

  /* Typography */
  color: ${({ color, theme }) => {
    if (!color) return theme.colors.text;
    return theme.colors[color as keyof typeof theme.colors] || color;
  }};
  
  font-size: ${({ fontSize, theme }) => `${getFontSize(fontSize, theme)}px`};
  
  font-weight: ${({ fontWeight, theme }) => {
    const weight = getFontWeight(fontWeight, theme);
    return typeof weight === 'number' ? weight.toString() : weight;
  }};
  
  font-family: ${({ fontFamily, theme }) => getFontFamily(fontFamily, theme)};
  
  ${({ textAlign }) => textAlign !== undefined && `text-align: ${textAlign};`}
  ${({ lineHeight }) => lineHeight !== undefined && `line-height: ${lineHeight}px;`}
  ${({ letterSpacing }) => letterSpacing !== undefined && `letter-spacing: ${letterSpacing}px;`}
  ${({ textTransform }) => textTransform !== undefined && `text-transform: ${textTransform};`}

  /* Borders */
  ${({ borderColor, theme }) => borderColor !== undefined && 
    `border-color: ${theme.colors[borderColor as keyof typeof theme.colors] || borderColor};`}
  
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  
  ${({ borderRadius }) => borderRadius !== undefined && 
    `border-radius: ${typeof borderRadius === 'number' ? borderRadius : theme.spacing[borderRadius as keyof typeof theme.spacing]}px;`}
`;

// Title Component
export const Title = styled(BaseText).attrs({
  fontWeight: 'bold',
  fontSize: 'lg'
})`
  /* Additional title-specific styles can go here */
`;

// Regular Text Component
export const Text = styled(BaseText).attrs({
  fontWeight: 'regular',
  fontSize: 'md'
})`
  /* Additional text-specific styles can go here */
`;

// ButtonText Component
export const ButtonText = styled(BaseText).attrs({
  fontWeight: 'semiBold'
})<ButtonTextProps>`
  text-align: center;
  ${({ uppercase }) => uppercase && 'text-transform: uppercase;'}
`;