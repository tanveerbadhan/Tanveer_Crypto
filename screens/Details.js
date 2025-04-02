import React from "react";
import { Button, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT_WEIGHT } from "../styles/GlobalStyles";

const Details = ({ navigation }) => {
    return (
        <SafeAreaView>
            <CustomText customStyle={styles.title}>Details Screen</CustomText>
            <Button title="Go Back" onPress={() => navigation.pop()} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: FONT_WEIGHT.bold,
    },
});

export default Details;
