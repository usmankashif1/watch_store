import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'



type Props = {
    active: SharedValue<boolean>
}




const Overlay = ({ active }: Props) => {


    const animatedStyle = useAnimatedStyle(() => {
        return {
            display: active.value ? "flex" : "none"
        }
    })


    const AnimatedSafeAreaView = Animated.createAnimatedComponent(Pressable);


    return (
        <AnimatedSafeAreaView style={[styles.container, animatedStyle]} onPress={() => { active.value = !active.value }}>
            {/* <TouchableOpacity style={styles.container} onPress={() => { active.value = !active.value }} /> */}
        </AnimatedSafeAreaView>
    )
}

export default Overlay

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    }
})