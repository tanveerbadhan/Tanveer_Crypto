import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Button, FlatList, Touchable, TouchableOpacity, View, RefreshControl } from "react-native";
import CustomText from "../components/CustomText";
import { COLORS, FONT_WEIGHT } from "../styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { SERVICES } from "../services/services";
import { debounce } from "../utils";
import { ActivityIndicator } from "react-native";

const List = ({ navigation }) => {
    const [list, setList] = useState([]);
    const page = useRef(0);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchList();
    }, []);

    const handleLoadMore = () => {
        fetchList();
    };
    const fetchList = debounce(async () => {
        const data = await SERVICES.fetchCryptoList(page.current);
        if (page.current === 0) {
            setList(data);
        } else {
            setList((prevList) => [...prevList, ...data]);
            if (data?.length < 10) {
                setLoading(false);
            }
        }
        page.current = page.current + 1;
        setRefreshing(false);
    });

    const onRefresh = () => {
        setRefreshing(true);
        page.current = 0;
        fetchList();
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Details", { id: item?.id })}>
                <CustomText customStyle={styles.title}>{item?.name}</CustomText>
                <CustomText customStyle={styles.symbol}>{item?.symbol}</CustomText>
                <CustomText customStyle={styles.price}>{item?.price_usd}</CustomText>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.flex1} edges={["top"]}>
            <CustomText customStyle={styles.heading}>Crypto List</CustomText>
            <FlatList
                data={list}
                style={styles.flatList}
                contentContainerStyle={styles.contentContainerStyle}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} tintColor={COLORS.primary} />}
                ListFooterComponent={() => {
                    return loading ? (
                        <View style={styles.listFooterComp}>
                            <ActivityIndicator size="large" color={COLORS.primary} />
                        </View>
                    ) : (
                        <></>
                    );
                }}
                onEndReached={handleLoadMore}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: FONT_WEIGHT.black,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    flex1: {
        flex: 1,
    },
    listItem: {
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        padding: 16,
        borderRadius: 16,
    },
    title: {
        fontSize: 30,
        fontFamily: FONT_WEIGHT.black,
    },
    symbol: {
        fontSize: 20,
        fontFamily: FONT_WEIGHT.bold,
    },
    price: {
        fontSize: 15,
        fontFamily: FONT_WEIGHT.light,
    },
    itemSeparator: {
        height: 12,
    },
    contentContainerStyle: {
        padding: 16,
        paddingTop: 0,
    },
    listFooterComp: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default List;
