import styled from "styled-components/native";
import { Title } from "./Typography";

interface HeaderDefaultProps {
	paddingTop?: number;
}

export const HeaderDefault = styled.View<HeaderDefaultProps>`
  padding-top: ${({ paddingTop }) => paddingTop || 72}px;
`;

export const HeaderTitle = styled(Title).attrs({
	fontSize: "h4",
	isTitle: true,
})``;
