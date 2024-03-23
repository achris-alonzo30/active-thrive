import { View } from "react-native";
import { ActivityIndicator } from 'react-native-paper';


export const Loader = () => {
    return (
        <View className="flex items-center justify-center">
            <ActivityIndicator animating={true} color={"blue"} />
        </View>
    )
}