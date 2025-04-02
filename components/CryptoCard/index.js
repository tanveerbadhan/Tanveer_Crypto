import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const CryptoCard = ({ data }) => {
    const { id, name, symbol, rank, price_usd, percent_change_1h, percent_change_24h, percent_change_7d } = data ?? {};
    const navigation = useNavigation();

    const getChangeColor = (change) => {
        return parseFloat(change) >= 0 ? "#4CAF50" : "#F44336";
    };

    const formatNumber = (num) => {
        return parseFloat(num).toLocaleString("en-US", {
            maximumFractionDigits: 2,
        });
    };

    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Details", { id: id })}>
            <View style={styles.itemHeader}>
                <View>
                    <CustomText customStyle={styles.title}>{name}</CustomText>
                    <CustomText customStyle={styles.symbol}>{symbol}</CustomText>
                </View>
                <View style={styles.rankBadge}>
                    <CustomText customStyle={styles.rankText}>#{rank}</CustomText>
                </View>
            </View>

            <CustomText customStyle={styles.price}>${formatNumber(price_usd)}</CustomText>

            <View style={styles.priceChangeContainer}>
                <CustomText customStyle={[styles.priceChange, { color: getChangeColor(percent_change_1h) }]}>1h: {percent_change_1h}%</CustomText>
                <CustomText customStyle={[styles.priceChange, { color: getChangeColor(percent_change_24h) }]}>24h: {percent_change_24h}%</CustomText>
                <CustomText customStyle={[styles.priceChange, { color: getChangeColor(percent_change_7d) }]}>7d: {percent_change_7d}%</CustomText>
            </View>
        </TouchableOpacity>
    );
};

export default CryptoCard;
