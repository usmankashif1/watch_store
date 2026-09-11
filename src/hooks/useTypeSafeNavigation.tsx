import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../navigation/RootNavigation'

type NavigationProp = StackNavigationProp<RootStackParamList>

const useTypeSafeNavigation = () => {
    return useNavigation<NavigationProp>();
}

export default useTypeSafeNavigation