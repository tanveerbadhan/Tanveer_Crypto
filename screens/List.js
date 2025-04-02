import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, FlatList, View, RefreshControl, ActivityIndicator } from "react-native";
import CustomText from "../components/CustomText";
import { FONT_WEIGHT } from "../styles/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { SERVICES } from "../services/services";
import { debounce } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { CryptoCard } from "../components";

const List = ({ navigation }) => {
    const [list, setList] = useState([]);
    const page = useRef(0);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchList();
    }, []);

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

    return (
        <LinearGradient colors={["#1a1a2e", "#16213e"]} style={styles.flex1}>
            <SafeAreaView style={styles.flex1} edges={["top"]}>
                <CustomText customStyle={styles.heading}>Crypto List</CustomText>
                <FlatList
                    data={list}
                    style={styles.flex1}
                    contentContainerStyle={styles.contentContainerStyle}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item }) => {
                        return <CryptoCard data={item} />;
                    }}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#4CAF50"]} tintColor={"#4CAF50"} />}
                    ListFooterComponent={() => {
                        return loading ? (
                            <View style={styles.listFooterComp}>
                                <ActivityIndicator size="large" color="#4CAF50" />
                            </View>
                        ) : (
                            <></>
                        );
                    }}
                    onEndReached={fetchList}
                />
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
    listFooterComp: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default List;
