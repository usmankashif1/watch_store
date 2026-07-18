import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RH, RS, RW } from '../utlis/responsive'
import Colors from '../utlis/colors'
import { SharedValue } from 'react-native-reanimated'
import { useNavigation } from 'expo-router'

type Props = {
    active: SharedValue<boolean>
}

const Header = ({ active }: Props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { active.value = !active.value }}>
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

                <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                    <Image
                        source={require("../assets/icons/CartIcon.png")}
                        style={[styles.headerIcon, { width: RS(30), height: RS(30) }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
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
})