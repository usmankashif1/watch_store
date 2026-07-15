import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerItemType } from "../data/DrawerList";
import useTypeSafeNavigation from "../hooks/useTypeSafeNavigation";
import { RF, RH, RW } from "../utlis/responsive";
import Colors from "../utlis/colors";
import { RootStackParamList } from "../navigation/RootNavigation";
import { SharedValue } from "react-native-reanimated";

type Props = {
    item: DrawerItemType;
    active: SharedValue<boolean>;
};

const DrawerItem = ({ item, active }: Props) => {
    const navigation = useTypeSafeNavigation();

    const Icon = item.iconType;

    return (
        <Pressable
            onPress={() => { navigation.navigate(item.screen as keyof RootStackParamList); active.value = !active.value }}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.iconContainer}>
                <Icon
                    name={item.icon}
                    size={RF(22)}
                    color="#A8B0C3"
                />
            </View>

            <Text style={styles.title}>{item.title}</Text>
        </Pressable >
    );
};

export default DrawerItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: RH(10),
        paddingHorizontal: RW(20),
        borderRadius: 12,
        marginHorizontal: RW(18),
        marginVertical: RH(2),
    },

    pressed: {
        backgroundColor: "rgba(255,255,255,0.08)",
    },

    iconContainer: {
        width: RW(34),
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: Colors.white,
        fontSize: RF(18),
        fontWeight: "600",
        marginLeft: RW(18),
    },
});