import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { FONT_WEIGHT } from "../styles/GlobalStyles";
// DO NOT use text directly imported from "react-native" like import { Text } from "react-native",
// unless you dont want to use new downloaded from google fonts "Poppins" font family  ;
import CustomText from "../components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";

const Favourites = ({ navigation }) => {
    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <CustomText customStyle={styles.info}>Use CustomText Tag Everywhere, to use "Poppins" font family</CustomText>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    info: {
        textAlign: "center",
        fontSize: 20,
        // Apply font weight like this
        fontWeight: FONT_WEIGHT.bold,
    },
});

export default Favourites;
