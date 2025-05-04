import styled from "styled-components/native";
import { Title } from "./Typography";

interface HeaderDefaultProps {
	paddingTop?: number;
	marginBottom?: number;
}

export const HeaderDefault = styled.View<HeaderDefaultProps>`
  padding-top: ${({ paddingTop }) => paddingTop || 72}px;
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`}
`;

export const HeaderTitle = styled(Title).attrs({
	fontSize: "h4",
	isTitle: true,
})``;
