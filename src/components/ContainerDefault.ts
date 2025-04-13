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
	flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
	flex?: number;
	width?: number | string;
	height?: number | string;
	padding?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;
	margin?: number;
	marginHorizontal?: number;
	marginVertical?: number;
	backgroundColor?: string;
	borderRadius?: number;
	borderWidth?: number;
	borderColor?: string;
}

export const Containerdefault = styled.View<ContainerdefaultProps>`
  background-color: ${({ theme }) => theme.colors.background};
  color: #ffffff;
  padding: 20px;
  height: 100%;
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
`;
