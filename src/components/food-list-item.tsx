import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons';

type FoodListItem = {
    // item: {
    //     brand: string;
    //     foodId: string;
    //     label: string;
    //     nutrients: {
    //         CHOCDF: number;
    //         ENERC_KCAL: number;
    //         FAT: number;
    //         FIBTG: number;
    //         PROCNT: number;
    //     };
    //     text: string;
    //     servingSizes: ServingSizes[];
    // }
    item: {
        text: string;
        calories: number;
        brand: string;
        servingSize: number;
    }
}
export const FoodListItem = ({ item }: FoodListItem) => {
    const router = useRouter();

    return (
        <View className="flex-row justify-between items-center my-1 bg-gray-200 rounded-lg p-2" >
            <View className="flex-1">
                <Text className="font-bold" numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                <Text className="font-normal">{item.calories} cals {item.brand === null ? "Generic" : item.brand}</Text>
            </View>
            <AntDesign
                name="pluscircleo"
                size={24}
                color="blue"
                onPress={() =>
                    router.push(`/(forms)/log-food?brand=${item.brand}&text=${item.text}&calories=${item.calories}&servingSize=${item.servingSize}`)} />
        </View>
    )
}