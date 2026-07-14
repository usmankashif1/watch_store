import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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
        title: "Contacts",
        icon: "people-outline",
        iconType: FontAwesome6,
        screen: "ContactsScreen",
    },
    // {
    //     id: 3,
    //     title: "Calls",
    //     icon: "call-outline",
    //     // iconType: Ionicons,
    //     screen: "CallsScreen",
    // },
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