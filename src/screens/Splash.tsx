import { ImageBackground, StyleSheet, Image } from "react-native";
import { RH, RW } from "../utlis/responsive";

export default function Splash() {
    return (
        <ImageBackground
            source={require("../assets/icons/BackgroundSplash.png")}
            style={styles.container}
            resizeMode="cover"
        >
            <Image
                source={require("../assets/icons/Logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: RW(200),
        height: RH(200),
    },
});