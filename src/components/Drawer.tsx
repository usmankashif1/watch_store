import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Colors from '../utlis/colors'
import { RF, RH, RW } from '../utlis/responsive'

type Props = {}

const Drawer = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.LogoUserContainer}>
                <Image style={styles.drawerLogo} source={require("../assets/icons/Logo.png")} />
                <Text style={styles.userName}>Usman Kashif</Text>
            </View>

        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#071531",
        zIndex: -99
    },
    drawerLogo: {
        height: RH(200),
        width: RW(200),
        resizeMode: "contain",
        marginTop: RH(100),
        // marginLeft: RW(50)
    },
    userName: {
        color: Colors.white,
        fontSize: RF(20)
    },
    LogoUserContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.white,
        marginHorizontal: RW(40),
        width: RW(200),
        paddingBottom: RH(14)
    }
})