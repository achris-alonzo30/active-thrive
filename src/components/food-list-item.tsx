import { View, Text } from "react-native"
import { AntDesign } from '@expo/vector-icons';

export const FoodListItem = ({item}) => {
    return (
        <View className="flex-row justify-between items-center my-1 bg-gray-200 rounded-lg p-2" >
            <View className="flex-1">
                <Text className="font-bold" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                <Text className="font-normal">{item.calories.toFixed(0)} cals {item.source === null ? "Generic" : item.source}</Text>
            </View>
            <AntDesign name="pluscircleo" size={24} color="blue" />
        </View>
    )
}