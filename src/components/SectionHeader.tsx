import { View, Text, Image, StyleSheet } from "react-native";
import { RF, RH, RS, RW } from "../utlis/responsive";
import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";

export default function SectionHeader({
    smallTitle,
    title,
}: {
    smallTitle: string;
    title: string;
}) {
    return (
        <View style={styles.sectionHeader}>
            <View>
                <Text style={styles.smallTitle}>{smallTitle}</Text>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>

            <View style={styles.arrowBox}>
                <Image
                    source={require("../assets/icons/NextButtonIcons.png")}
                    style={styles.chevronIcon}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: RH(20),
    },
    smallTitle: {
        color: Colors.white,
        fontSize: RF(15),
        fontFamily: Fonts.medium,
        letterSpacing: RW(6),
        marginBottom: RH(4),
    },


    sectionTitle: {
        color: Colors.white,
        fontSize: RF(30),
        fontFamily: Fonts.medium,
        letterSpacing: RW(3),
    },
    arrowBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: RH(6),
    },

    chevronIcon: {
        width: RS(48),
        height: RS(29),
        tintColor: Colors.white,
        resizeMode: "contain",
    },
})