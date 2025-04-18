import "styled-components/native";

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
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
    };
    fonts: {
      body: {
        light: string;
        regular: string;
        medium: string;
        semiBold: string;
        bold: string;
        extraBold: string;
      };
      heading: {
        bold: string;
      };
      sizes: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        h6: number;
        h5: number;
        h4: number;
        h3: number;
        h2: number;
        h1: number;
      };
      weights: {
        light: number;
        regular: number;
        medium: number;
        semiBold: number;
        bold: number;
        black: number;
      };
      lineHeight: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
    borders: {
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
    };
  }
}
