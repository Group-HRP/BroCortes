import styled from "styled-components/native";
import type{ ButtonProps, ButtonTextProps } from "../@types/styleTypes";

// Função helper para acesso seguro ao theme.colors
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const getThemeColor = (
	color: string | undefined,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	theme: any,
	defaultColor: string,
) => {
	if (!color) return defaultColor;
	return theme.colors[color as keyof typeof theme.colors] || color;
};

export const Button = styled.TouchableOpacity<ButtonProps>`
  /* Layout */
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ width }) => width !== undefined && `width: ${typeof width === "number" ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === "number" ? `${height}px` : height};`}
  
  /* Appearance */
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor as keyof typeof theme.colors] : theme.colors.background};
  
  /* Spacing */
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  
  /* Margin */
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
  
  /* Borders */
  ${({ borderRadius, theme }) => {
		if (borderRadius === undefined) return "border-radius: 4px;";
		if (typeof borderRadius === "number")
			return `border-radius: ${borderRadius}px;`;
	}}
  
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  ${({ borderColor, theme }) =>
		borderColor !== undefined &&
		`border-color: ${getThemeColor(borderColor, theme, "transparent")};`}
  
  /* States */
  ${({ disabled }) => disabled && "opacity: 0.6;"}
  
  /* Flex */
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<ButtonTextProps>`
  /* Typography */
  color: ${({ color, theme }) => getThemeColor(color, theme, theme.colors.text)};
  
  font-size: ${({ fontSize = "md", theme }) => 
    typeof fontSize === 'number' 
      ? `${fontSize}px` 
      : `${theme.fonts.sizesBody[fontSize as keyof typeof theme.fonts.sizesBody]}px`};
  
  font-weight: ${({ fontWeight = "semiBold", theme }) => {
    if (typeof fontWeight === 'number') return fontWeight;
    // biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
    if (typeof fontWeight === 'string' && !isNaN(Number(fontWeight))) return Number(fontWeight);
    return theme.fonts.weights[fontWeight as keyof typeof theme.fonts.weights];
  }};
  
  font-family: ${({ fontFamily = "primary", theme }) => 
    theme.fonts.body[fontFamily as keyof typeof theme.fonts.body] || fontFamily};
  
  /* Text Transformation */
  ${({ uppercase }) => uppercase && "text-transform: uppercase;"}
  
  /* Layout */
  text-align: center;
`;
