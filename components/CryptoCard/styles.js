import { StyleSheet } from "react-native";
import { FONT_WEIGHT } from "../../styles/GlobalStyles";

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        padding: 16,
        borderRadius: 16,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontFamily: FONT_WEIGHT.black,
        color: "white",
    },
    symbol: {
        fontSize: 16,
        fontFamily: FONT_WEIGHT.bold,
        color: "#aaa",
    },
    price: {
        fontSize: 24,
        fontFamily: FONT_WEIGHT.bold,
        color: "white",
        marginBottom: 10,
    },
    priceChangeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    priceChange: {
        fontSize: 14,
        fontWeight: "600",
    },
    rankBadge: {
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "gold",
        marginRight: 10,
    },
    rankText: {
        color: "gold",
        fontWeight: "bold",
        fontSize: 14,
    },
    favoriteButton: {
        padding: 5,
    },
});

export default styles;