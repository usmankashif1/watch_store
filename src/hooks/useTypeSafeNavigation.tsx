import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/RootNavigation'


type NavigationProp = StackNavigationProp<RootStackParamList>

const useTypeSafeNavigation = () => {
    const navigation = useNavigation<NavigationProp>()
    return navigation;
}

export default useTypeSafeNavigation

const styles = StyleSheet.create({})