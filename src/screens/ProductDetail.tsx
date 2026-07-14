import { useRef } from "react";
import {
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../constants/fonts";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

const HERO_HEIGHT = RH(445);
export default function ProductDetail({ navigation }: any) {
    const { product } = useRoute().params;

    const specsScrollRef = useRef<ScrollView>(null);
    const descriptionScrollRef = useRef<ScrollView>(null);


    const scrollUp = () => {
        specsScrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    };

    const scrollDown = () => {
        specsScrollRef.current?.scrollTo({
            y: RH(180),
            animated: true,
        });
    };

    return (
        <ImageBackground
            source={require("../assets/icons/BackgroundTwo.png")}
            style={styles.screen}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image resizeMode="contain" style={styles.backIcon} source={require("../assets/icons/BackArrow.png")} />
                        </TouchableOpacity>

                        <View style={styles.headerRight}>
                            <Image
                                source={require("../assets/icons/SearchIcon.png")}
                                style={styles.headerIcon}
                            />
                            <Image
                                source={require("../assets/icons/CartIcon.png")}
                                style={[styles.headerIcon, { height: RS(30), width: RS(30) }]}
                            />
                        </View>
                    </View>


                    <View style={styles.hero}>
                        <Text style={styles.verticalBrand}>{product.brand}</Text>
                        <View style={styles.watchBox}>
                            <Image source={product.image} style={styles.watchImage} resizeMode="contain" />
                        </View>

                        <View style={styles.leftDetails}>
                            <TouchableOpacity onPress={scrollUp}>
                                <Image style={styles.scrollArrow} source={require("../assets/icons/UpArrow.png")} />
                            </TouchableOpacity>

                            <ScrollView
                                ref={specsScrollRef}
                                showsVerticalScrollIndicator={false}
                                style={styles.detailsScrollBox}
                            >
                                {product.specs.map((item: any, index: number) => (
                                    <InfoItem key={index} label={item.label} value={item.value} />
                                ))}
                            </ScrollView>

                            <TouchableOpacity onPress={scrollDown}>
                                <Image style={[styles.scrollArrow, { marginTop: RH(18) }]} source={require("../assets/icons/DownArrow.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ScrollView
                        ref={descriptionScrollRef}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.content}
                    >
                        <View style={styles.productHeader}>
                            <View>
                                <Text style={styles.category}>TRENDING PRODUCTS</Text>
                                <Text style={styles.productName}>{product.name}</Text>
                            </View>

                            <View>
                                <Text style={styles.priceLabel}>PRICE</Text>
                                <Text style={styles.price}>{product.price}</Text>
                            </View>
                        </View>

                        <Text style={styles.description}>{product.description}</Text>

                        <View style={styles.detailList}>
                            {product.details.map((detail: any, index: number) => (
                                <Text key={index} style={styles.detailText}>
                                    • {detail}
                                </Text>
                            ))}
                        </View>

                        <View style={styles.bottomRow}>
                            <TouchableOpacity style={styles.cartButton}>
                                <Text style={styles.cartText}>ADD TO CART</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.heartButton}>
                                <Image
                                    source={require("../assets/icons/HeartFill.png")}
                                    style={styles.heartIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: RW(18),
    },


    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    backIcon: {
        width: RS(30),
        height: RF(30),
    },

    headerRight: {
        flexDirection: "row",
        gap: RW(20),
    },

    headerIcon: {
        width: RS(28),
        height: RS(28),
        tintColor: Colors.white,
        resizeMode: "contain",
    },

    verticalBrand: {
        // position: "absolute",
        right: RW(-200),
        top: RH(200),
        transform: [{ rotate: "90deg" }],
        color: "rgba(37, 60, 102, 0.28)",
        fontSize: RF(34),
        fontFamily: Fonts.medium,
        letterSpacing: RW(6),
        zIndex: 2,
    },

    watchBox: {
        position: "absolute",
        right: RW(8),
        top: RH(30),
        width: "65%",
        aspectRatio: 0.7,
        height: RH(343),
        zIndex: 1,
    },

    watchImage: {
        width: "100%",
        height: "100%",
    },

    leftDetails: {
        left: RW(10),
        top: RH(-25),
        maxWidth: RW(150),
        zIndex: 5,
    },

    scrollArrow: {
        marginBottom: RH(18),
        width: RS(20),
        height: RS(20),
        alignSelf: "center",
    },

    infoItem: {
        marginBottom: RH(18),
    },

    infoLabel: {
        color: Colors.primary,
        fontSize: RF(15),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(4),
        marginBottom: RH(3),
    },

    infoValue: {
        color: Colors.white,
        fontSize: RF(20),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(5),
        textTransform: "uppercase",
    },

    content: {
        paddingBottom: RH(5),
    },

    productHeader: {
        marginVertical: Platform.OS === "ios" ? null : RH(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: RH(18)
    },

    category: {
        color: Colors.primary,
        fontSize: RF(15),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(3),
        marginBottom: RH(6),
    },

    productName: {
        color: Colors.white,
        fontSize: RF(30),
        fontFamily: Fonts.medium,
    },

    priceLabel: {
        color: Colors.primary,
        fontSize: RF(15),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(4),
        textAlign: "right",
    },

    price: {
        color: Colors.primary,
        fontSize: RF(32),
        fontFamily: Fonts.medium,
        textAlign: "right",
    },

    description: {
        color: Colors.textSecondary,
        fontSize: RF(20),
        fontFamily: Fonts.regular,
        lineHeight: RH(32),
        marginBottom: RH(18),
    },

    detailList: {
        marginBottom: RH(28),
    },

    detailText: {
        color: Colors.textSecondary,
        fontSize: RF(14),
        fontFamily: Fonts.regular,
        lineHeight: RH(24),
    },

    bottomRow: {
        flexDirection: "row",
        gap: RW(16),
        alignItems: "center",
    },

    cartButton: {
        flex: 1,
        height: RH(68),
        borderRadius: RS(17),
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    cartText: {
        color: Colors.secondary,
        fontSize: RF(30),
        fontFamily: Fonts.medium,
        letterSpacing: RW(3),
    },

    heartButton: {
        width: RS(68),
        height: RS(68),
        borderRadius: RS(17),
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    heartIcon: {
        width: RS(40),
        height: RS(40),
        resizeMode: "contain",
    },
    detailsScrollBox: {
        height: RH(270)
    },
    hero: {
        height: HERO_HEIGHT,
    }

});