import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { ComponentType } from 'react';


export type IconType = ComponentType<{
    name: string;
    size?: number;
    color?: string;
}>;

export interface DrawerItemType {
    id: number;
    title: string;
    icon: string;
    iconType: IconType;
    screen: string;
}


export const DRAWER_LIST: DrawerItemType[] = [
    {
        id: 1,
        title: "My Profile",
        icon: "circle-user",
        iconType: FontAwesome6,
        screen: "Profile",
    },
    {
        id: 2,
        title: "My Orders",
        icon: "shopping-bag",
        iconType: Feather,
        screen: "MyOrders",
    },
    {
        id: 3,
        title: "Favorites",
        icon: "favorite-border",
        iconType: MaterialIcons,
        screen: "Favorites",
    },
    // {
    //     id: 4,
    //     title: "Saved Messages",
    //     icon: "bookmark-outline",
    //     // iconType: Ionicons,
    //     screen: "SavedMessagesScreen",
    // },
    // {
    //     id: 5,
    //     title: "Settings",
    //     icon: "settings-outline",
    //     // iconType: Ionicons,
    //     screen: "SettingsScreen",
    // },
];