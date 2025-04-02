import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, RefreshControl, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FONT_WEIGHT } from "../styles/GlobalStyles";
import CustomText from "../components/CustomText";
import { SERVICES } from "../services";
import { CryptoCard } from "../components";

const Favourites = ({ navigation }) => {
    const [favourites, setFavourites] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchFavourites = async () => {
        setLoading(true);
        const data = await SERVICES.fetchCryptoList();
        setFavourites(data);
        setLoading(false);
        setRefreshing(false);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchFavourites();
    };

    return (
        <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
            <SafeAreaView style={styles.flex1} edges={["top"]}>
                <CustomText customStyle={styles.heading}>Favourites</CustomText>
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
                            return <CryptoCard data={item} />;
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
    heading: {
        fontSize: 30,
        color: "#4CAF50",
        fontFamily: FONT_WEIGHT.black,
        marginBottom: 16,
        marginHorizontal: 16,
        marginTop: 16,
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
