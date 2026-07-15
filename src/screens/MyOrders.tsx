import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

const orders = [
    {
        id: "ORD-1001",
        watch: "Thommen Watches",
        brand: "REVUE THOMMEN",
        price: "$250",
        status: "Delivered",
        date: "12 Jul 2026",
        image: require("../assets/images/watches/CAT_Watches.png"),
    },
    {
        id: "ORD-1002",
        watch: "Bremont Classic",
        brand: "BREMONT",
        price: "$480",
        status: "Shipped",
        date: "18 Jul 2026",
        image: require("../assets/images/watches/Bremont.png"),
    },
    {
        id: "ORD-1003",
        watch: "Tommy Hilfiger",
        brand: "TOMMY HILFIGER",
        price: "$320",
        status: "Processing",
        date: "20 Jul 2026",
        image: require("../assets/images/watches/Tommy_Hilfiger.png"),
    },
];

export default function MyOrders({ navigation }: any) {
    const renderItem = ({ item }: any) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            <Image
                source={item.image}
                resizeMode="contain"
                style={styles.image}
            />

            <View style={styles.info}>

                <View style={styles.topRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.brand}>{item.brand}</Text>

                        <Text numberOfLines={1} style={styles.watch}>
                            {item.watch}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.status,
                            item.status === "Delivered"
                                ? styles.green
                                : item.status === "Shipped"
                                    ? styles.orange
                                    : styles.gray,
                        ]}
                    >
                        <Text style={styles.statusText}>
                            {item.status}
                        </Text>
                    </View>
                </View>

                <Text style={styles.orderId}>
                    #{item.id}
                </Text>

                <Text style={styles.date}>
                    Ordered on {item.date}
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.price}>
                        {item.price}
                    </Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>
                            Track Order →
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    );



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: RH(30),
                }}
            />
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
});