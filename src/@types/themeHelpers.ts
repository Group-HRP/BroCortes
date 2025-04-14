import type { ThemeType } from "../theme";
import type { FontWeightValue, ThemeFontWeights } from "./styleTypes";

export const getThemeValue = <
	T extends keyof ThemeType,
	K extends keyof ThemeType[T],
>(
	theme: ThemeType,
	category: T,
	key: K | string | number,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	defaultValue: any,
) => {
	if (typeof key === "string" && key in theme[category]) {
		return theme[category][key as K];
	}
	return defaultValue;
};

export const getThemeColor = (
	theme: ThemeType,
	colorKey: string | undefined,
	defaultColor: string,
) => {
	if (!colorKey) return defaultColor;
	return getThemeValue(theme, "colors", colorKey, colorKey) || defaultColor;
};

// Em themeHelpers.ts
export const getFontWeight = (
	weight: keyof ThemeFontWeights | FontWeightValue | undefined,
	theme: ThemeType,
	defaultValue: FontWeightValue = 600, // semiBold como padrão
): FontWeightValue => {
	if (!weight) return defaultValue;

	if (typeof weight === "number") return weight;

	// biome-ignore lint/suspicious/noGlobalIsNan: <explanation>
	if (!isNaN(Number(weight))) return Number(weight);

	return (
		theme.fonts.weights[weight as keyof typeof theme.fonts.weights] ||
		defaultValue
	);
};
