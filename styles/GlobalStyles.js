import { StyleSheet } from "react-native";

export const COLORS = {
    primary: "#4CAF50",
    secondary: "#FFC107",
    background: "#F5F5F5",
    text: "#333333",
    white: "#FFFFFF",
    black: "#000000",
    gray: "#808080",
    lightGray: "#D8D8D8",
};

export const FONT_WEIGHT = {
    light: "Poppins-Light",
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    bold: "Poppins-Bold",
    black: "Poppins-Black",
};

const GlobalStyles = StyleSheet.create({
    // any styles which are used again and again should be written here
});

export default GlobalStyles;
