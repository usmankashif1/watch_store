import React, { useCallback, useEffect } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import Fonts from "../constants/fonts";
import type { RootState } from "../store";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

export default function MyOrders({ navigation }: any) {
    const orders = useSelector((state: RootState) => state.orders.items);

    const goHome = useCallback(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (event: any) => {
            if (event.data?.action?.type === "GO_BACK") {
                event.preventDefault();
                goHome();
            }
        });

        return unsubscribe;
    }, [goHome, navigation]);

    const renderItem = ({ item }: any) => {
        const firstItem = item.items?.[0];
        const status = item.status || "Processing";
        const date = new Date(item.createdAt).toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        return (
            <TouchableOpacity activeOpacity={0.9} style={styles.card}>
                <Image
                    source={firstItem?.image || require("../assets/images/watches/Bremont.png")}
                    resizeMode="contain"
                    style={styles.image}
                />

                <View style={styles.info}>
                    <View style={styles.topRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.brand}>{firstItem?.brand || "WATCH STORE"}</Text>
                            <Text numberOfLines={1} style={styles.watch}>
                                {firstItem?.name || "Luxury Watch"}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.status,
                                status === "Delivered"
                                    ? styles.green
                                    : status === "Shipped"
                                        ? styles.orange
                                        : styles.gray,
                            ]}
                        >
                            <Text style={styles.statusText}>{status}</Text>
                        </View>
                    </View>

                    <Text style={styles.orderId}>#{item.id}</Text>
                    <Text style={styles.date}>Ordered on {date}</Text>

                    <View style={styles.bottomRow}>
                        <Text style={styles.price}>${Number(item.total || 0).toFixed(2)}</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Track Order →</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goHome}>
                    <Image
                        source={require("../assets/icons/BackArrow.png")}
                        style={styles.back}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>
                    MY ORDERS
                </Text>

                <View style={{ width: RS(28) }} />
            </View>

            {orders.length > 0 ?

                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: RH(30),
                    }}
                />
                :
                <View style={styles.emptyRow}>
                    <Text style={styles.emptyTitle}>No orders placed yet</Text>
                </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingHorizontal: RW(20),
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: RH(25),
    },

    back: {
        width: RS(30),
        height: RS(30),
        resizeMode: "contain",
    },

    title: {
        color: Colors.white,
        fontSize: RF(24),
        fontFamily: Fonts.bold,
        letterSpacing: RW(3),
    },

    card: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#11254A",

        borderRadius: RS(24),

        padding: RS(18),

        marginBottom: RH(18),

        borderWidth: 1,
        borderColor: "rgba(232,190,104,0.15)",

        elevation: 6,
    },

    image: {
        width: RW(110),
        height: RH(160),
    },

    info: {
        flex: 1,
        marginLeft: RW(18),
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    brand: {
        color: Colors.primary,
        fontSize: RF(10),
        fontFamily: Fonts.bold,
        letterSpacing: RW(2.5),
    },

    watch: {
        color: Colors.white,
        fontSize: RF(20),
        fontFamily: Fonts.bold,
        marginTop: RH(6),
    },

    orderId: {
        color: "#B7C2D9",
        marginTop: RH(12),
        fontSize: RF(13),
        fontFamily: Fonts.regular,
    },

    date: {
        color: "#94A4C6",
        marginTop: RH(4),
        fontSize: RF(12),
        fontFamily: Fonts.regular,
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: RH(18),
    },

    price: {
        color: Colors.primary,
        fontSize: RF(24),
        fontFamily: Fonts.bold,
    },

    status: {
        paddingHorizontal: RW(12),
        paddingVertical: RH(5),
        borderRadius: RS(20),
    },

    green: {
        backgroundColor: "#27AE60",
    },

    orange: {
        backgroundColor: "#F39C12",
    },

    gray: {
        backgroundColor: "#7F8C8D",
    },

    statusText: {
        color: Colors.white,
        fontSize: RF(10),
        fontFamily: Fonts.bold,
    },

    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: RW(18),
        paddingVertical: RH(9),
        borderRadius: RS(30),
    },

    buttonText: {
        color: Colors.secondary,
        fontSize: RF(11),
        fontFamily: Fonts.bold,
        letterSpacing: RW(1),
    },

    emptyRow: {
        // paddingTop: RH(80),
        flex:1,
        alignItems: "center",
        justifyContent:"center"
    },

    emptyTitle: {
        color: Colors.white,
        fontSize: RF(20),
        fontFamily: Fonts.regular,
    },
});