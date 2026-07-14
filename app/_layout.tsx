// import { useFonts } from "expo-font";
// // import { createNativeStackNavigator,  } from "@react-navigation/native-stack";
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
// import Splash from "@/src/screens/Splash";
// import Home from "@/src/screens/Home";
// import { useEffect, useState } from "react";
// import ProductDetail from "@/src/screens/ProductDetail";
// import { Asset } from "expo-asset";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { GestureHandlerRootView } from 'react-native-gesture-handler'

// const Stack = createStackNavigator();

// export default function RootLayout() {
//   const [showSplash, setShowSplash] = useState(true);

//   const [fontsLoaded] = useFonts({
//     KanitRegular: require("../src/assets/fonts/Kanit-Regular.ttf"),
//     KanitMedium: require("../src/assets/fonts/Kanit-Medium.ttf"),
//     KanitSemiBold: require("../src/assets/fonts/Kanit-SemiBold.ttf"),
//     KanitBold: require("../src/assets/fonts/Kanit-Bold.ttf"),
//   });

//   useEffect(() => {
//     Asset.loadAsync([
//       require("../src/assets/icons/BackgroundSplash.png"),
//       require("../src/assets/icons/BackgroundTwo.png"),
//       require("../src/assets/images/watches/Bremont.png"),
//       require("../src/assets/images/watches/CAT_Watches.png"),
//       require("../src/assets/images/watches/Thommen_Watches.png"),
//       require("../src/assets/images/watches/Zurich_Mauriac.png"),
//     ]);
//   }, []);



//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);


//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaProvider>
//         <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, detachPreviousScreen: false }}>
//           {showSplash ? (
//             <Stack.Screen name="Splash" component={Splash} />
//           ) : (
//             <>
//               <Stack.Screen name="Home" component={Home} />
//               <Stack.Screen name="ProductDetail" component={ProductDetail} />
//             </>
//           )}
//         </Stack.Navigator>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }

import RootNavigation from '@/src/navigation/RootNavigation'
import React from 'react'

const _layout = () => {
  return (
    <RootNavigation />
  )
}

export default _layout