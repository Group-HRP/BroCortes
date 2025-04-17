import styled from "styled-components/native";

interface ContainerdefaultProps {
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
}

export const Containerdefault = styled.View<ContainerdefaultProps>`
  background-color: ${({ theme }) => theme.colors.background};
  color: #ffffff;
  padding: 20px;
  height: 100%;
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
`;

interface CustomContainerProps {
	flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";
	flex?: number;
	width?: number | string;
	height?: number | string;
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	margin?: number;
	marginTop?: number;
	marginLeft?: number;
	marginRight?: number;
	marginBottom?: number;
	marginHorizontal?: number;
	marginVertical?: number;
	backgroundColor?: string;
	borderRadius?: number;
	borderWidth?: number;
	borderColor?: string;
	gap?: number;
}

export const CustomContainer = styled.View<CustomContainerProps>`
	/* Flexbox */
	${({ flex }) => flex !== undefined && `flex: ${flex};`}
	${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
	${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
	${({ gap }) => gap && `gap: ${gap}px;`}
	${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
	${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  
	/* Dimensions */
	${({ width }) => width && `width: ${typeof width === "number" ? `${width}px` : width};`}
	${({ height }) => height && `height: ${typeof height === "number" ? `${height}px` : height};`}
  
	/* Spacing */
	${({ padding }) => padding && `padding: ${padding}px;`}
	${({ paddingHorizontal }) => paddingHorizontal && `padding-horizontal: ${paddingHorizontal}px;`}
	${({ paddingVertical }) => paddingVertical && `padding-vertical: ${paddingVertical}px;`}
	${({ margin }) => margin && `margin: ${margin}px;`}
	${({ marginTop }) => marginTop && `margin-top: ${marginTop}px;`}
	${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}px;`}
	${({ marginRight }) => marginRight && `margin-right: ${marginRight}px;`}
	${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px;`}
	${({ marginHorizontal }) => marginHorizontal && `margin-horizontal: ${marginHorizontal}px;`}
	${({ marginVertical }) => marginVertical && `margin-vertical: ${marginVertical}px;`}
  
	/* Appearance */
	${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
	${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}px;`}
	${({ borderWidth }) => borderWidth && `border-width: ${borderWidth}px;`}
	${({ borderColor }) => borderColor && `border-color: ${borderColor};`}
  `;
