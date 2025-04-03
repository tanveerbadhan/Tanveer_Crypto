import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, RefreshControl, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_WEIGHT } from "../styles/GlobalStyles";
import CustomText from "../components/CustomText";
import { SERVICES } from "../services";
import { CryptoCard } from "../components";
import { useFocusEffect } from "@react-navigation/native";

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            fetchFavourites();
        }, [])
    );

    const fetchFavourites = async () => {
        setLoading(true);
        const data = await SERVICES.fetchMyFavourites();
        setFavourites(data);
        setLoading(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchFavourites();
    };

    const onHeartClickCB = async (isFavorite) => {
        const favourites = await SERVICES.fetchMyFavourites();
        setFavourites(favourites);
    };

    const handleClearAll = async () => {
        Alert.alert("Clear All Favourites", "Are you sure you want to remove all favourites?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: () => {
                    SERVICES.removeFavourites();
                    setFavourites([]);
                },
            },
        ]);
    };

    return (
        <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
            <SafeAreaView style={styles.flex1} edges={["top"]}>
                <View style={styles.headerContainer}>
                    <CustomText customStyle={styles.heading}>Favourites</CustomText>
                    {favourites?.length > 0 && (
                        <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                            <CustomText customStyle={styles.clearButtonText}>Clear All</CustomText>
                        </TouchableOpacity>
                    )}
                </View>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                    </View>
                ) : (
                    <FlatList
                        data={favourites}
                        style={styles.flex1}
                        contentContainerStyle={styles.contentContainerStyle}
                        keyExtractor={(item) => item?.id?.toString()}
                        renderItem={({ item }) => {
                            return <CryptoCard data={item} initialIsFavorite onHeartClickCB={onHeartClickCB} />;
                        }}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor={"#4CAF50"} />}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <CustomText customStyle={styles.emptyText}>No favourites yet</CustomText>
                            </View>
                        }
                    />
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 16,
    },
    heading: {
        fontSize: 30,
        color: "#4CAF50",
        fontFamily: FONT_WEIGHT.black,
    },
    clearButton: {
        backgroundColor: "rgba(255, 59, 48, 0.2)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255, 59, 48, 0.5)",
    },
    clearButtonText: {
        color: "#FF3B30",
        fontSize: 14,
        fontFamily: FONT_WEIGHT.semiBold,
    },
    itemSeparator: {
        height: 12,
    },
    contentContainerStyle: {
        padding: 16,
        paddingTop: 0,
        paddingBottom: 90,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: "#FFFFFF",
        textAlign: "center",
    },
});

export default Favourites;
