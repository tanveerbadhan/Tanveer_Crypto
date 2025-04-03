import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "../CustomText";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SERVICES } from "../../services";

import styles from "./styles";

const CryptoCard = ({ data, showFav = true, initialIsFavorite = false, onHeartClickCB = () => {} }) => {
    const { id, name, symbol, rank, price_usd, percent_change_1h, percent_change_24h, percent_change_7d } = data ?? {};
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

    const getChangeColor = (change) => {
        return parseFloat(change) >= 0 ? "#4CAF50" : "#F44336";
    };

    const formatNumber = (num) => {
        return parseFloat(num).toLocaleString("en-US", {
            maximumFractionDigits: 2,
        });
    };

    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);

    const handleFavouritePress = async () => {
        if (!isFavorite) {
            const addToFavourites = await SERVICES.addToFavourites(data);
            if (addToFavourites) {
                onHeartClickCB(true);
                setIsFavorite(true);
            }
        } else {
            const removeFromFavourites = await SERVICES.removeFromFavourites(id);
            if (removeFromFavourites) {
                onHeartClickCB(false);
                setIsFavorite(false);
            }
        }
    };

    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Details", { id: id })}>
            <View style={styles.itemHeader}>
                <View>
                    <CustomText customStyle={styles.title}>{name}</CustomText>
                    <CustomText customStyle={styles.symbol}>{symbol}</CustomText>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.rankBadge}>
                        <CustomText customStyle={styles.rankText}>#{rank}</CustomText>
                    </View>
                    {showFav && (
                        <TouchableOpacity onPress={handleFavouritePress} style={styles.favoriteButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color={isFavorite ? "#FF4081" : "#aaa"} />
                        </TouchableOpacity>
                    )}
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
