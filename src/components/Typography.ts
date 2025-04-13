import styled from "styled-components/native";
import type ThemeType from "../theme";

interface TypographyProps {
	color?: keyof (typeof ThemeType)["colors"] | string;
	fontSize?: keyof (typeof ThemeType)["fonts"]["sizes"];
	weight?: keyof (typeof ThemeType)["fonts"]["weights"];
	fontFamily?: keyof (typeof ThemeType)["fonts"]["family"];
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	margin?: number;
	borderBottomWidth?: number;
	borderColor?: keyof (typeof ThemeType)["colors"];
	borderWidth?: number;
	textAlign?: "auto" | "center" | "left" | "right" | "justify";
	lineHeight?: number;
	letterSpacing?: number;
}

export const Title = styled.Text<TypographyProps>`
  color: ${({ color, theme }) =>
		color && theme.colors[color as keyof typeof theme.colors]
			? theme.colors[color as keyof typeof theme.colors]
			: color || theme.colors.text};
  
  font-size: ${({ fontSize = "medium", theme }) => theme.fonts.sizes[fontSize]}px;
  
  font-weight: ${({ weight = "normal", theme }) => theme.fonts.weights[weight]};
  
  font-family: ${({ fontFamily, weight = "normal", theme }) =>
		fontFamily
			? theme.fonts.family[fontFamily]
			: weight === "bold"
				? theme.fonts.family.bold
				: theme.fonts.family.regular};
  
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
`;

export const Text = styled(Title)<TypographyProps>`
  /* Herda todos os estilos do Title e pode adicionar sobrescritas específicas */
`;
