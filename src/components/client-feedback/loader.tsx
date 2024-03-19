import { ActivityIndicator, View } from "react-native"

export const Loader = () => {
    return (
        <View className="flex items-center justify-center">
            <ActivityIndicator size="large" color="blue" />
        </View>
    )
}