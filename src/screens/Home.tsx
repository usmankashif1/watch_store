import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import Fonts from "../constants/fonts";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

export default function Home() {
    const products = [
        {
            id: "1",
            brand: "FOSSIL",
            name: "Thommen",
            image: require("../assets/images/watches/CAT_Watches.png"),
            liked: true,
        },
        {
            id: "2",
            brand: "TOMMY HILFIGER",
            name: "CAT",
            image: require("../assets/images/watches/Thommen_Watches.png"),
            liked: false,
        },
        {
            id: "3",
            brand: "BREMONT",
            name: "Bremont",
            image: require("../assets/images/watches/Tommy_Hilfiger.png"),
            liked: true,
        },
        {
            id: "4",
            brand: "FOSSIL",
            name: "Thommen",
            image: require("../assets/images/watches/Zurich_Mauriac.png"),
            liked: false,
        },
        {
            id: "5",
            brand: "TOMMY HILFIGER",
            name: "CAT",
            image: require("../assets/images/watches/CAT_Watches.png"),
            liked: true,
        }
    ];

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/icons/SideBarIcon.png")}
                            style={styles.headerIcon}
                        />
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/icons/SearchIcon.png")}
                                style={[styles.headerIcon, { width: RS(28), height: RS(28) }]}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Image
                                source={require("../assets/icons/CartIcon.png")}
                                style={[styles.headerIcon, { width: RS(30), height: RS(30) }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <SectionHeader smallTitle="FEATURED" title="PRODUCTS" />

                <View style={styles.featureCard}>
                    <View style={styles.featureTextBox}>
                        <Text style={styles.arrival}>New Arrival</Text>
                        <Text style={styles.featureTitle}>BREMONT</Text>

                        <Text style={styles.featureDesc}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        </Text>

                        <TouchableOpacity style={styles.buyButton}>
                            <Text style={styles.buyText}>BUY NOW</Text>
                            <Image
                                source={require("../assets/icons/NextButtonIcons.png")}
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    <Image
                        source={require("../assets/images/watches/Bremont.png")}
                        style={styles.featureWatch}
                        resizeMode="contain"
                    />
                </View>

                <SectionHeader smallTitle="TRENDING" title="PRODUCTS" />

                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.productsRow}
                    renderItem={({ item }) => (
                        <ProductCard
                            brand={item.brand}
                            name={item.name}
                            image={item.image}
                            liked={item.liked}
                        />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.secondary,
    },

    content: {
        paddingHorizontal: RW(20),
        paddingBottom: RH(40),
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: RH(34),
    },

    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: RW(22),
    },

    headerIcon: {
        width: RS(40),
        height: RS(26),
        tintColor: Colors.white,
        resizeMode: "contain",
    },

    smallTitle: {
        color: Colors.white,
        fontSize: RF(10),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(6),
        marginBottom: RH(4),
    },

    featureCard: {
        height: RH(190),
        backgroundColor: Colors.primary,
        borderRadius: RS(32),
        marginBottom: RH(34),
        overflow: "hidden",
        flexDirection: "row",
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
        fontSize: RF(12),
        fontFamily: Fonts.semiBold,
        letterSpacing: RW(2),
        marginBottom: RH(4),
    },

    featureTitle: {
        color: Colors.secondary,
        fontSize: RF(30),
        fontFamily: Fonts.bold,
        marginBottom: RH(4),
    },

    featureDesc: {
        color: Colors.secondary,
        fontSize: RF(8.5),
        fontFamily: Fonts.regular,
        lineHeight: RH(14),
        width: RW(135),
    },

    buyButton: {
        marginTop: RH(12),
        width: RW(90),
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
        fontSize: RF(10),
        fontFamily: Fonts.bold,
        letterSpacing: RW(1.2),
    },

    arrowIcon: {
        width: RS(15),
        height: RS(15),
        resizeMode: "contain",
        tintColor: Colors.black,
    },

    productsRow: {
        justifyContent: "space-between",
        marginBottom: RH(24),
    },
});