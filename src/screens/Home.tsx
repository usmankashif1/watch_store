import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import Fonts from "../constants/fonts";
import { products } from "../data/products";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";
import Overlay from "../components/Overlay";
import Drawer from "../components/Drawer";


export default function Home({ navigation }: any) {
    const active = useSharedValue(false)

    const progress = useDerivedValue(() => {
        return withTiming(active.value ? 1 : 0)
    })

    const animatedStyle = useAnimatedStyle(() => {

        const rotateY = interpolate(
            progress.value,
            [0, 1],
            [0, -20],
            Extrapolation.CLAMP
        )

        return {
            overflow: "hidden",
            borderRadius: withTiming(active.value ? 28 : 0),
            transform: [
                { perspective: 3000 }
                ,
                {
                    translateX: withSpring(active.value ? 240 : 0),
                },
                {
                    scale: withTiming(active.value ? 0.82 : 1),
                },
                // {
                //     rotateY: `${rotateY}deg`
                // }
            ]
        }
    })

    const AnimatedSafeAreaView = Animated.createAnimatedComponent(View);

    return (
        <View style={{ flex: 1 }}>

            <Drawer />
            <AnimatedSafeAreaView style={[styles.screen, animatedStyle]}>
                <SafeAreaView style={{ flex: 1 }}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.content}
                    >
                        <Header active={active} />

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
                                    product={item}
                                    onPress={() =>
                                        navigation.navigate("ProductDetail", {
                                            product: item,
                                        })
                                    }
                                />
                            )}
                        />

                    </ScrollView>
                </SafeAreaView>

                <Overlay active={active} />
            </AnimatedSafeAreaView>
        </View >
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.secondary,
        overflow: "hidden",

    },

    content: {
        paddingHorizontal: RW(20),
        paddingBottom: RH(40),
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