import styled from "styled-components/native";
import type theme from "../theme";

interface InputProps {
	padding?: number;
	width?: number;
	color?: keyof typeof theme.colors;
	fontFamily?: keyof typeof theme.fonts.family;
	backgroundColor?: keyof typeof theme.colors;
	borderRadius?: number;
	borderColor?: keyof typeof theme.colors;
	borderSize?: number;
	marginTop?: number;
	marginBottom?: number;
}

export const Input = styled.TextInput<InputProps>`
    color: ${({ color, theme }) => color || theme.colors.text};
    background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.background300};
    width: ${({ width }) => width || [100]}%;
    font-family: ${({ fontFamily, theme }) => fontFamily || theme.fonts.family.default};
    border-radius: ${({ borderRadius }) => [borderRadius]}px;
    border-width: ${({ borderSize }) => [borderSize]}px;
    border-color: ${({ borderColor, theme }) => borderColor || theme.colors.background};
    margin-top: ${({ marginTop }) => [marginTop]}px;
    margin-bottom: ${({ marginBottom }) => [marginBottom]}px;
`;
