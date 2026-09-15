import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SharedValue } from 'react-native-reanimated'
import { DRAWER_LIST } from '../data/DrawerList'
import { defaultProfile } from '../services/profileService'
import { useAppSelector } from '../store/hooks'
import Colors from '../utlis/colors'
import { RF, RH, RW } from '../utlis/responsive'
import DrawerItem from './DrawerItem'

type Props = {
    active: SharedValue<boolean>
}

const Drawer = ({ active }: Props) => {
    const profile = useAppSelector((state) => state.profile)
    const userName = profile.fullName || defaultProfile.fullName

    return (
        <View style={styles.container}>
            <View style={styles.LogoUserContainer}>
                <Image style={styles.drawerLogo} source={require("../assets/icons/Logo.png")} />
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <View style={styles.menuContainer}>
                {DRAWER_LIST.map((item) => (
                    <DrawerItem
                        key={item.id}
                        item={item}
                        active={active}
                    />
                ))}
            </View>
        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#071531",
        // zIndex: -99
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
    },
    menuContainer: {
        marginTop: RH(10),
    },
})