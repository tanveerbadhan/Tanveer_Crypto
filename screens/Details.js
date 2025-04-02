import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Details = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const bitcoinData = {
        id: "90",
        symbol: "BTC",
        name: "Bitcoin",
        nameid: "bitcoin",
        rank: 1,
        price_usd: "85991.58",
        percent_change_24h: "1.21",
        percent_change_1h: "-0.43",
        percent_change_7d: "-2.35",
        price_btc: "1.00",
        market_cap_usd: "1706284683642.80",
        volume24: 31919257596.6664,
        volume24a: 25202512215.0486,
        csupply: "19842462.00",
        tsupply: "19842462",
        msupply: "21000000",
    };

    const formatNumber = (num) => {
        return parseFloat(num).toLocaleString("en-US", {
            maximumFractionDigits: 2,
        });
    };

    const formatLargeNumber = (num) => {
        if (num >= 1000000000000) {
            return `$${(num / 1000000000000).toFixed(2)}T`;
        }
        if (num >= 1000000000) {
            return `$${(num / 1000000000).toFixed(2)}B`;
        }
        if (num >= 1000000) {
            return `$${(num / 1000000).toFixed(2)}M`;
        }
        return `$${formatNumber(num)}`;
    };

    const getChangeColor = (change) => {
        return parseFloat(change) >= 0 ? "#4CAF50" : "#F44336";
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // Here you would typically also update your global state or database
    };

    return (
        <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
            <SafeAreaView style={styles.flex1} edges={["top"]}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerTopRow}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.coinName}>{bitcoinData.name}</Text>
                                <Text style={styles.coinSymbol}>{bitcoinData.symbol}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={40} color={isFavorite ? "#FF4081" : "#aaa"} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.coinPrice}>${formatNumber(bitcoinData.price_usd)}</Text>

                        <View style={styles.priceChangeContainer}>
                            <Text style={[styles.priceChange, { color: getChangeColor(bitcoinData.percent_change_1h) }]}>1h: {bitcoinData.percent_change_1h}%</Text>
                            <Text style={[styles.priceChange, { color: getChangeColor(bitcoinData.percent_change_24h) }]}>24h: {bitcoinData.percent_change_24h}%</Text>
                            <Text style={[styles.priceChange, { color: getChangeColor(bitcoinData.percent_change_7d) }]}>7d: {bitcoinData.percent_change_7d}%</Text>
                        </View>
                    </View>

                    <View style={styles.detailsSection}>
                        <Text style={styles.sectionTitle}>Market Data</Text>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Market Cap</Text>
                            <Text style={styles.detailValue}>{formatLargeNumber(bitcoinData.market_cap_usd)}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>24h Trading Volume</Text>
                            <Text style={styles.detailValue}>{formatLargeNumber(bitcoinData.volume24)}</Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Circulating Supply</Text>
                            <Text style={styles.detailValue}>
                                {formatNumber(bitcoinData.csupply)} {bitcoinData.symbol}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Total Supply</Text>
                            <Text style={styles.detailValue}>
                                {formatNumber(bitcoinData.tsupply)} {bitcoinData.symbol}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Max Supply</Text>
                            <Text style={styles.detailValue}>
                                {formatNumber(bitcoinData.msupply)} {bitcoinData.symbol}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rankBadge}>
                        <Text style={styles.rankText}>Rank #{bitcoinData.rank}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        paddingTop: 20,
    },
    headerTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    titleContainer: {
        alignItems: "center",
        flex: 1,
    },
    coinName: {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 5,
    },
    coinSymbol: {
        color: "#aaa",
        fontSize: 18,
        marginBottom: 0,
    },
    coinPrice: {
        color: "white",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 15,
    },
    priceChangeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    priceChange: {
        fontSize: 16,
        fontWeight: "600",
    },
    detailsSection: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.2)",
        paddingBottom: 10,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    detailLabel: {
        color: "#ccc",
        fontSize: 16,
    },
    detailValue: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
    rankBadge: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "rgba(255, 215, 0, 0.2)",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "gold",
    },
    rankText: {
        color: "gold",
        fontWeight: "bold",
    },
    favoriteButton: {
        position: "absolute",
        right: 0,
        padding: 10,
    },
});

export default Details;
