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
    body: {
      light: string;
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
      extraBold: string;
    };
    heading: {
      bold: string;
    };
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    weights: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
      black: number;
    };
    lineHeight: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  borders: {
    radius: {
      sm: number;
      md: number;
      lg: number;
      full: number;
    };
    width: {
      thin: number;
      regular: number;
      thick: number;
    };
  };
};

// Props do componente
interface TypographyProps {
  color?: keyof AppTheme['colors'] | string;
  fontSize?: keyof AppTheme['fonts']['sizes'];
  fontWeight?: keyof AppTheme['fonts']['weights'];
  fontFamily?: keyof FontBody | keyof AppTheme['fonts']['heading'];
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
  borderColor?: keyof AppTheme['colors'];
  borderWidth?: number;
  borderRadius?: number | keyof AppTheme['spacing'];
  textAlign?: "auto" | "center" | "left" | "right" | "justify";
  lineHeight?: number;
  letterSpacing?: number;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  isTitle?: boolean;
}

// Funções auxiliares
const getFontSize = (
  fontSize: keyof AppTheme['fonts']['sizes'] | undefined,
  isTitle: boolean | undefined,
  theme: AppTheme
): number => {
  if (!fontSize) {
    return isTitle
      ? theme.fonts.sizes.md
      : theme.fonts.sizes.lg;
  }

  return theme.fonts.sizes[fontSize];
};

const getFontFamily = (
  fontFamily: keyof FontBody | keyof AppTheme['fonts']['heading'] | undefined,
  fontWeight: keyof AppTheme['fonts']['weights'] | undefined,
  isTitle: boolean | undefined,
  theme: AppTheme
): string => {
  if (fontFamily) {
    return isTitle
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      ? theme.fonts.heading['bold'] || theme.fonts.heading.bold
      : theme.fonts.body[fontFamily as keyof FontBody] || theme.fonts.body.regular;
  }

  const weight = fontWeight || "normal";
  return isTitle
    ? theme.fonts.heading.bold
    : theme.fonts.body[weight as keyof FontBody] || theme.fonts.body.regular;
};

// Componente base
const BaseText = styled.Text<TypographyProps>`
  /* Cores */
  color: ${({ color, theme }) => {
    if (!color) return theme.colors.text;
    return theme.colors[color as keyof AppTheme['colors']] || color;
  }};

  /* Tipografia */
  font-size: ${({ fontSize, isTitle, theme }) =>
    `${getFontSize(fontSize, isTitle, theme)}px`};
  
  font-weight: ${({ fontWeight = "normal", theme }) =>
    theme.fonts.weights};
  
  font-family: ${({ fontFamily, fontWeight, isTitle, theme }) =>
    getFontFamily(fontFamily, fontWeight, isTitle, theme)};
  
  ${({ textAlign }) => textAlign && `text-align: ${textAlign};`}
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}px;`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing}px;`}
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}

  /* Espaçamento */
  ${({ padding }) => padding && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical && `padding-vertical: ${paddingVertical}px;`}
  
  /* Margens */
  ${({ margin }) => margin && `margin: ${margin}px;`}
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px;`}
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px;`}
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight}px;`}
  ${({ marginHorizontal }) => marginHorizontal && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical && `margin-vertical: ${marginVertical}px;`}

  /* Bordas */
  ${({ borderColor, theme }) => borderColor &&
    `border-color: ${theme.colors[borderColor as keyof AppTheme['colors']] || borderColor};`}
  
  ${({ borderWidth }) => borderWidth && `border-width: ${borderWidth}px;`}
  
  ${({ borderRadius, theme }) => borderRadius &&
    `border-radius: ${typeof borderRadius === 'number'
      ? borderRadius
      : theme.spacing[borderRadius as keyof AppTheme['spacing']]}px;`}
`;

// Componentes exportados
export const Title = styled(BaseText).attrs({
  isTitle: true
})``;

export const Text = styled(BaseText).attrs({
  isTitle: false
})``;

// Extensão do DefaultTheme para incluir seu AppTheme
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}