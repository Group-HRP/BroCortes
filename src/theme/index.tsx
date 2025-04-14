export interface ThemeColors {
	background: string;
	background200: string;
	background300: string;
	primary: string;
	primary200: string;
	primary300: string;
	accent: string;
	accent200: string;
	accent300: string;
	text: string;
	// Adicione outras cores conforme necessário
}

export interface FontWeights {
	light: number;
	regular: number;
	medium: number;
	semiBold: number;
	bold: number;
	black: number;
}

export interface FontSizes {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
}

export interface Spacing {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
}

export interface Borders {
	radius: {
		sm: number;
		md: number;
		lg: number;
		full: number;
	};
	width: {
		thin: number;
		regular: number;
		thick: number;
	};
}

export interface ThemeType {
	colors: ThemeColors;
	fonts: {
		family: {
			primary: string;
			secondary: string;
		};
		weights: FontWeights;
		sizes: FontSizes;
	};
	spacing: Spacing;
	borders: Borders;
}

const theme = {
	colors: {
		background: "#1A1A1A",
		background200: "#292929",
		background300: "#404040",
		primary: "#B8860B",
		primary200: "#986B00",
		primary300: "#543000",
		accent: "#8B4513",
		accent200: "#FFD299",
		accent300: "#E0E0E0",
		text: "#FFFFFF",
	},
	fonts: {
		body: {
			light: "OpenSans-Light",
			regular: "OpenSans-Regular",
			medium: "OpenSans-Medium",
			semiBold: "OpenSans-SemiBold",
			bold: "OpenSans-Bold",
			extraBold: "OpenSans-ExtraBold",
		},
		heading: {
			bold: "Satoshi-Bold",
		},
		sizesHeading: {
			base: 18,
			tiny: 20,
			small: 24,
			regular: 32,
			medium: 36,
			large: 40,
		},
		sizesBody: {
			tiny: 12,
			small: 14,
			regular: 16,
			medium: 18,
		},
		weights: {
			light: 300,
			normal: 400,
			medium: 500,
			semiBold: 600,
			bold: 700,
			extraBold: 800,
		},
		lineHeight: "150%",
	},
	spacing: {
		small: 8,
		medium: 16,
		large: 24,
	},
};

export default theme;
