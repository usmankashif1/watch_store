import { useFonts } from "expo-font";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Splash from "../screens/Splash";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail";
import Profile from "../screens/Profile";
import MyOrders from "../screens/MyOrders";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";

const Stack = createStackNavigator();


export type RootStackParamList = {
    Splash: undefined;
    Home: undefined;
    ProductDetail: undefined;
    Profile: undefined;
    MyOrders: undefined;
    Favorites: undefined;
    Cart: undefined;
}


export default function RootNavigation() {
    const [showSplash, setShowSplash] = useState(true);

    const [fontsLoaded] = useFonts({
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
            require("../assets/images/watches/CAT_Watches.png"),
            require("../assets/images/watches/Thommen_Watches.png"),
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
                        </>
                    )}
                </Stack.Navigator>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
