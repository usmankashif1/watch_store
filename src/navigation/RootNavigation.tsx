import { useFonts } from "expo-font";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { useEffect, useState } from "react";
import { Asset } from "expo-asset";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Splash from "../screens/Splash";
import Home from "../screens/Home";
import ProductDetail from "../screens/ProductDetail";

const Stack = createStackNavigator();

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
                        </>
                    )}
                </Stack.Navigator>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
