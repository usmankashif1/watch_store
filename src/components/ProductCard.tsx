import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { RF, RH, RS, RW } from "../utlis/responsive";
import React from "react";
import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";

export default function ProductCard({
    brand,
    name,
    image,
    liked,
}: {
    brand: string;
    name: string;
    image: any;
    liked?: boolean;
}) {
    return (
        <View style={styles.productWrapper}>
            <View style={styles.productCard}>
                <TouchableOpacity style={styles.heartBox}>
                    <Image
                        source={
                            liked
                                ? require("../assets/icons/HeartFill.png")
                                : require("../assets/icons/Heart.png")
                        }
                        style={styles.heartIcon}
                    />
                </TouchableOpacity>

                <Image source={image} style={styles.productImage} resizeMode="contain" />
            </View>

            <Text style={styles.productBrand}>{brand}</Text>
            <Text style={styles.productName}>{name}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    productWrapper: {
        width: RW(180),
    },

    productCard: {
        height: RH(241),
        backgroundColor: Colors.primary,
        borderRadius: RS(18),
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    heartBox: {
        position: "absolute",
        right: RW(10),
        top: RH(10),
        width: RS(28),
        height: RS(28),
        borderRadius: RS(10),
        backgroundColor: Colors.lightGold,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
    },
    heartIcon: {
        width: RS(18),
        height: RS(18),
        resizeMode: "contain",
    },

    productBrand: {
        color: Colors.white,
        fontSize: RF(12),
        fontFamily: Fonts.bold,
        letterSpacing: RW(2),
        marginTop: RH(14),
    },

    productName: {
        color: Colors.white,
        fontSize: RF(22),
        fontFamily: Fonts.regular,
    },
    productImage: {
        width: RW(122),
        height: RH(168),
    },

})