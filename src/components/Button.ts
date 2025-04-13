import styled from "styled-components/native";
import type ThemeType from "../theme";

interface ButtonProps {
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: keyof (typeof ThemeType)["fonts"]["sizesBody"] | keyof (typeof ThemeType)["fonts"]["sizesHeading"];
  backgroundColor?: keyof (typeof ThemeType)["colors"];
  color?: keyof (typeof ThemeType)["colors"];
  fontFamily?: keyof (typeof ThemeType)["fonts"]["body"] | keyof (typeof ThemeType)["fonts"]["heading"];
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  borderRadius?: number | keyof (typeof ThemeType)["fonts"]["sizesBody"] | keyof (typeof ThemeType)["fonts"]["sizesHeading"];
  fullWidth?: boolean;
  disabled?: boolean;
  alignSelf?: "flex-start" | "center" | "flex-end";
  width?: number | string;
  height?: number | string;
  borderWidth?: number;
  borderColor?: keyof (typeof ThemeType)["colors"];
  isTitle?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  ${({ fullWidth }) => fullWidth && "width: 100%;"}
  ${({ width }) => width !== undefined && `width: ${typeof width === "number" ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === "number" ? `${height}px` : height};`}
  
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? theme.colors[backgroundColor] : theme.colors.background};
  
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
  
  ${({ borderRadius, theme }) => {
    if (borderRadius === undefined) return "border-radius: 4px;";
    if (typeof borderRadius === "number") return `border-radius: ${borderRadius}px;`;
    return `border-radius: ${theme.fonts.sizesBody[borderRadius as keyof typeof theme.fonts.sizesBody] || 
            theme.fonts.sizesHeading[borderRadius as keyof typeof theme.fonts.sizesHeading] || 4}px;`;
  }}
  
  ${({ borderWidth }) => borderWidth !== undefined && `border-width: ${borderWidth}px;`}
  ${({ borderColor, theme }) => borderColor !== undefined && `border-color: ${theme.colors[borderColor]};`}
  
  ${({ alignSelf }) => alignSelf !== undefined && `align-self: ${alignSelf};`}
  
  ${({ disabled }) => disabled && "opacity: 0.6;"}
  
  justify-content: center;
  align-items: center;
`;

interface ButtonTextProps {
  color?: keyof (typeof ThemeType)["colors"];
  fontSize?: keyof (typeof ThemeType)["fonts"]["sizesBody"] | keyof (typeof ThemeType)["fonts"]["sizesHeading"];
  fontFamily?: keyof (typeof ThemeType)["fonts"]["body"] | keyof (typeof ThemeType)["fonts"]["heading"];
  weight?: keyof (typeof ThemeType)["fonts"]["weights"];
  uppercase?: boolean;
  isTitle?: boolean;
}

export const ButtonText = styled.Text<ButtonTextProps>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.text)};
  font-size: ${({ fontSize = "medium", theme }) => 
    theme.fonts.sizesBody[fontSize as keyof typeof theme.fonts.sizesBody] || 
    theme.fonts.sizesHeading[fontSize as keyof typeof theme.fonts.sizesHeading]}px;
  font-weight: ${({ weight = "semiBold", theme }) => theme.fonts.weights[weight]};
  font-family: ${({ fontFamily, weight = "regular", isTitle, theme }) => {
    if (fontFamily) {
      return isTitle
        ? theme.fonts.heading[fontFamily as keyof typeof theme.fonts.heading]
        : theme.fonts.body[fontFamily as keyof typeof theme.fonts.body];
    }
    return isTitle
      ? theme.fonts.heading.bold
      : weight === "bold"
        ? theme.fonts.body.bold
        : theme.fonts.body.regular;
  }};
  ${({ uppercase }) => uppercase && "text-transform: uppercase;"}
`;