import styled from "styled-components/native";
import { Title } from "./Typography";

interface HeaderDefaultProps {
  paddingTop?: number;
  display?: "flex" | "none";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  flexDirection?: "column" | "row";
  marginBottom?: number;
}

export const HeaderDefault = styled.View<HeaderDefaultProps>`
  padding-top: ${({ paddingTop }) => paddingTop || 72}px;
  display: ${({ display }) => display || "flex"};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection };
`;

export const HeaderTitle = styled(Title).attrs({
  fontSize: "h4",
  isTitle: true,
})<HeaderDefaultProps>`
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}px`};
`;
