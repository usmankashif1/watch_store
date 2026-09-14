import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewToken,
} from "react-native";

import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

type FeatureProduct = {
    id: string;
    label: string;
    title: string;
    description: string;
    image: any;
    product?: any;
};

type Props = {
    products: FeatureProduct[];
    onBuyPress?: (product: FeatureProduct) => void;
};

export default function FeatureProductCarousel({
    products,
    onBuyPress,
}: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const flatListRef = useRef<FlatList>(null);
    const activeIndexRef = useRef(0);

    useEffect(() => {
        if (products.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex =
                activeIndexRef.current >= products.length - 1
                    ? 0
                    : activeIndexRef.current + 1;

            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [products.length]);

    const handleScrollEnd = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
        );

        activeIndexRef.current = index;
        setActiveIndex(index);
    };

    if (!products.length) {
        return null;
    }

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={products}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={handleScrollEnd}
                renderItem={({ item }) => (
                    <View style={styles.featureCard}>
                        <View style={styles.featureTextBox}>
                            <Text style={styles.arrival}>{item.label}</Text>

                            <Text style={styles.featureTitle}>
                                {item.title}
                            </Text>

                            <Text style={styles.featureDesc}>
                                {item.description}
                            </Text>

                            <TouchableOpacity
                                style={styles.buyButton}
                                onPress={() => onBuyPress?.(item)}
                            >
                                <Text style={styles.buyText}>BUY NOW</Text>

                                <Image
                                    source={require("../assets/icons/NextButtonIcons.png")}
                                    style={styles.arrowIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <Image
                            source={item.image}
                            style={styles.featureWatch}
                            resizeMode="contain"
                        />
                    </View>
                )}
            />

            {products.length > 1 && (
                <View style={styles.dotsContainer}>
                    {products.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                styles.dot,
                                index === activeIndex && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    featureCard: {
        width: RW(350),
        height: RH(190),
        backgroundColor: Colors.primary,
        borderRadius: RS(32),
        marginBottom: RH(12),
        overflow: "hidden",
        flexDirection: "row",
        marginHorizontal: RW(8)
    },

    featureTextBox: {
        width: "55%",
        paddingLeft: RW(18),
        paddingTop: RH(28),
        zIndex: 2,
    },

    featureWatch: {
        position: "absolute",
        right: RW(-12),
        bottom: RH(-10),
        width: RW(205),
        height: RH(190),
    },

    arrival: {
        color: Colors.secondary,
        fontSize: RF(14),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(2),
        // marginBottom: RH(4),
    },

    featureTitle: {
        color: Colors.secondary,
        fontSize: RF(30),
        fontFamily: Fonts.bold,
        // marginBottom: RH(4),
    },

    featureDesc: {
        color: Colors.secondary,
        fontSize: RF(12),
        fontFamily: Fonts.regular,
        lineHeight: RH(14),
        // width: RW(135),
    },

    buyButton: {
        marginTop: RH(12),
        width: RW(100),
        height: RH(30),
        borderRadius: RS(20),
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: RW(4),
    },

    buyText: {
        color: Colors.black,
        fontSize: RF(12),
        fontFamily: Fonts.bold,
        letterSpacing: RW(1.2),
    },

    arrowIcon: {
        width: RS(15),
        height: RS(15),
        resizeMode: "contain",
        tintColor: Colors.black,
    },

    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: RW(6),
        marginBottom: RH(22),
    },

    dot: {
        width: RS(6),
        height: RS(6),
        borderRadius: RS(3),
        backgroundColor: "rgba(255,255,255,0.35)",
    },

    activeDot: {
        width: RS(18),
        backgroundColor: Colors.primary,
    },
});