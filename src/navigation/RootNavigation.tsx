import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Cart from "../screens/Cart";
import Checkout from '../screens/Checkout';
import Favorites from "../screens/Favorites";
import Home from "../screens/Home";
import MyOrders from "../screens/MyOrders";
import OrderSuccess from '../screens/OrderSuccess';
import ProductDetail from "../screens/ProductDetail";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Splash from "../screens/Splash";
import type { Product } from "../types/product";

const Stack = createStackNavigator();


export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    ProductDetail: { product: Product };
    Profile: undefined;
    MyOrders: undefined;
    Favorites: undefined;
    Cart: undefined;
    Search: undefined;
    Checkout: undefined;
    OrderSuccess: undefined;
}


export default function RootNavigation() {
    const [showSplash, setShowSplash] = useState(true);

    useFonts({
        KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
        KanitMedium: require("../assets/fonts/Kanit-Medium.ttf"),
        KanitSemiBold: require("../assets/fonts/Kanit-SemiBold.ttf"),
        KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
    });

    useEffect(() => {
        Asset.loadAsync([
            require("../assets/icons/BackgroundSplash.png"),
            require("../assets/icons/BackgroundTwo.png"),
            require("../assets/images/watches/Bremont.png"),
            require("../assets/images/watches/CAT.png"),
            require("../assets/images/watches/Thommen.png"),
            require("../assets/images/watches/Zurich_Mauriac.png"),
        ]);
    }, []);



    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        
            <SafeAreaProvider>
                <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, detachPreviousScreen: false }}>
                    {showSplash ? (
                        <Stack.Screen name="Splash" component={Splash} />
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="ProductDetail" component={ProductDetail} />
                            <Stack.Screen name="Profile" component={Profile} />
                            <Stack.Screen name="MyOrders" component={MyOrders} />
                            <Stack.Screen name="Favorites" component={Favorites} />
                            <Stack.Screen name="Cart" component={Cart} />
                            <Stack.Screen name="Search" component={Search} />
                            <Stack.Screen name="Checkout" component={Checkout} />
                            <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
                        </>
                    )}
                </Stack.Navigator>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
