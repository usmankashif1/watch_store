import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "@/src/screens/Splash";
import Home from "@/src/screens/Home";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator()
export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    KanitRegular: require("../src/assets/fonts/Kanit-Regular.ttf"),
    KanitMedium: require("../src/assets/fonts/Kanit-Medium.ttf"),
    KanitSemiBold: require("../src/assets/fonts/Kanit-SemiBold.ttf"),
    KanitBold: require("../src/assets/fonts/Kanit-Bold.ttf"),
  });


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showSplash ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : (
        <Stack.Screen name="Home" component={Home} />
      )}
    </Stack.Navigator>
  );
}
