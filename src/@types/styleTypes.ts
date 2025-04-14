import type { ThemeType } from "../theme";

export type ThemeColorKey = keyof ThemeType["colors"];
export type ThemeFontSizeKey = keyof ThemeType["fonts"]["sizes"];
type ThemeFontWeightKey = keyof ThemeType["fonts"]["weights"];
export type ThemeFontFamilyKey = keyof ThemeType["fonts"]["family"];
type ThemeSpacingKey = keyof ThemeType["spacing"];

/**
 * Tipos globais para propriedades de estilo reutilizáveis
 */
export interface StyleProps {
	// Layout
	flex?: number;
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
	gap?: number;

	// Dimensionamento
	width?: number | string;
	height?: number | string;
	minWidth?: number | string;
	minHeight?: number | string;
	maxWidth?: number | string;
	maxHeight?: number | string;
	aspectRatio?: number;

	// Margens
	margin?: number;
	marginTop?: number;
	marginBottom?: number;
	marginLeft?: number;
	marginRight?: number;
	marginHorizontal?: number;
	marginVertical?: number;

	// Paddings
	padding?: number;
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
	paddingHorizontal?: number;
	paddingVertical?: number;

	// Cores
	backgroundColor?: ThemeColorKey | string;
	color?: ThemeColorKey | string;
	opacity?: number;

	// Bordas
	borderColor?: ThemeColorKey | string;
	borderWidth?: number;
	borderRadius?: number | ThemeSpacingKey;
	borderTopLeftRadius?: number;
	borderTopRightRadius?: number;
	borderBottomLeftRadius?: number;
	borderBottomRightRadius?: number;

	// Tipografia
	fontFamily?: ThemeFontFamilyKey | string;
	fontSize?: ThemeFontSizeKey | number;
	fontWeight?: ThemeFontWeightKey | number | string;
	textAlign?: "auto" | "left" | "right" | "center" | "justify";
	lineHeight?: number;
	letterSpacing?: number;
	textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";

	// Posicionamento
	position?: "absolute" | "relative";
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
	zIndex?: number;

	// Sombras (Android/iOS)
	elevation?: number; // Android
	shadowColor?: string; // iOS
	shadowOffset?: { width: number; height: number };
	shadowOpacity?: number;
	shadowRadius?: number;
}

export type FontWeightValue =
	| number
	| "normal"
	| "bold"
	| "100"
	| "200"
	| "300"
	| "400"
	| "500"
	| "600"
	| "700"
	| "800"
	| "900";

export interface ThemeFontWeights {
	light: FontWeightValue;
	regular: FontWeightValue;
	medium: FontWeightValue;
	semiBold: FontWeightValue;
	bold: FontWeightValue;
	extraBold: FontWeightValue;
}

export interface ButtonTextProps extends StyleProps {
	fontWeight?: keyof ThemeFontWeights | FontWeightValue;
}

export interface ButtonSpecificProps {
	fullWidth?: boolean;
	disabled?: boolean;
	isTitle?: boolean;
	uppercase?: boolean;
}

// Extenda a StyleProps com os tipos específicos de botão
export interface ButtonProps extends StyleProps, ButtonSpecificProps {}
export interface ButtonTextProps extends StyleProps, ButtonSpecificProps {}
