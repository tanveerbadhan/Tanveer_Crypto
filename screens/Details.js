import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SERVICES } from "../services";
import { CustomText } from "../components";

const Details = ({ route }) => {
    const { id } = route?.params ?? {};
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bitcoinData, setBitcoinData] = useState(null);

    useEffect(() => {
        fetchCrypto();
    }, []);

    const fetchCrypto = async () => {
        const data = await SERVICES.fetchCrypto(id);
        setBitcoinData(data);
        setIsLoading(false);
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
    };

    if (isLoading) {
        return (
            <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
                <SafeAreaView style={[styles.flex1, styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <CustomText customStyle={styles.loadingText}>Loading Crypto data...</CustomText>
                </SafeAreaView>
            </LinearGradient>
        );
    } else if (!bitcoinData) {
        return (
            <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
                <SafeAreaView style={[styles.flex1, styles.errorContainer]}>
                    <Ionicons name="warning-outline" size={50} color="#F44336" />
                    <CustomText customStyle={styles.errorText}>Error loading data</CustomText>
                    <TouchableOpacity style={styles.retryButton}>
                        <CustomText customStyle={styles.retryButtonText}>Try Again</CustomText>
                    </TouchableOpacity>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
            <SafeAreaView style={styles.flex1} edges={["top"]}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerTopRow}>
                            <View style={styles.titleContainer}>
                                <CustomText customStyle={styles.coinName}>{bitcoinData?.name}</CustomText>
                                <CustomText customStyle={styles.coinSymbol}>{bitcoinData?.symbol}</CustomText>
                            </View>
                            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={40} color={isFavorite ? "#FF4081" : "#aaa"} />
                            </TouchableOpacity>
                        </View>

                        <CustomText customStyle={styles.coinPrice}>${formatNumber(bitcoinData?.price_usd)}</CustomText>

                        <View style={styles.priceChangeContainer}>
                            <CustomText customStyle={[styles.priceChange, { color: getChangeColor(bitcoinData?.percent_change_1h) }]}>1h: {bitcoinData?.percent_change_1h}%</CustomText>
                            <CustomText customStyle={[styles.priceChange, { color: getChangeColor(bitcoinData?.percent_change_24h) }]}>24h: {bitcoinData?.percent_change_24h}%</CustomText>
                            <CustomText customStyle={[styles.priceChange, { color: getChangeColor(bitcoinData?.percent_change_7d) }]}>7d: {bitcoinData?.percent_change_7d}%</CustomText>
                        </View>
                    </View>

                    <View style={styles.detailsSection}>
                        <CustomText customStyle={styles.sectionTitle}>Market Data</CustomText>

                        <View style={styles.detailRow}>
                            <CustomText customStyle={styles.detailLabel}>Market Cap</CustomText>
                            <CustomText customStyle={styles.detailValue}>{formatLargeNumber(bitcoinData?.market_cap_usd)}</CustomText>
                        </View>

                        <View style={styles.detailRow}>
                            <CustomText customStyle={styles.detailLabel}>24h Trading Volume</CustomText>
                            <CustomText customStyle={styles.detailValue}>{formatLargeNumber(bitcoinData?.volume24)}</CustomText>
                        </View>

                        <View style={styles.detailRow}>
                            <CustomText customStyle={styles.detailLabel}>Circulating Supply</CustomText>
                            <CustomText customStyle={styles.detailValue}>
                                {formatNumber(bitcoinData?.csupply)} {bitcoinData?.symbol}
                            </CustomText>
                        </View>

                        <View style={styles.detailRow}>
                            <CustomText customStyle={styles.detailLabel}>Total Supply</CustomText>
                            <CustomText customStyle={styles.detailValue}>
                                {formatNumber(bitcoinData?.tsupply)} {bitcoinData?.symbol}
                            </CustomText>
                        </View>

                        <View style={styles.detailRow}>
                            <CustomText customStyle={styles.detailLabel}>Max Supply</CustomText>
                            <CustomText customStyle={styles.detailValue}>
                                {formatNumber(bitcoinData?.msupply)} {bitcoinData?.symbol}
                            </CustomText>
                        </View>
                    </View>

                    <View style={styles.rankBadge}>
                        <CustomText customStyle={styles.rankText}>Rank #{bitcoinData?.rank}</CustomText>
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
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        color: "white",
        marginTop: 20,
        fontSize: 16,
    },
    errorContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
    errorSubText: {
        color: "#ccc",
        fontSize: 16,
        marginTop: 10,
        textAlign: "center",
    },
    retryButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#4CAF50",
        borderRadius: 5,
    },
    retryButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default Details;
