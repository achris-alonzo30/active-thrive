
import { View } from "react-native";
import { Card, Text, Divider, Button } from "react-native-paper";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { useRouter } from "expo-router";
import { Loader } from "../client-feedback/loader";

type FoodListLogs = {
    foods: {
        _id: Id<"foodLog">;
        _creationTime: number;
        servingSize?: string;
        text: string;
        brand: string;
        userId: string;
        calories: string;
        mealTime: string;
    }[]
};

export const FoodLogs = ({ foods }: FoodListLogs) => {
    const router = useRouter();
    
    
    const mealTime = ["breakfast", "meal 1", "lunch", "meal 2", "dinner"];

    if (!foods) {
        return <Loader />; // You can display a loading message or handle this scenario as needed
    }

    const groupedFoods = mealTime.map(time => ({
        mealTime: time,
        foods: foods.filter(item => item.mealTime === time),
        totalCalories: foods.filter(item => item.mealTime === time).reduce((total, item) => total + parseInt(item.calories), 0)
    }));
    return (
        <View className="flex-1">
            {groupedFoods.map(group => (
                <View key={group.mealTime} className="my-1">
                    <Card>
                        <Card.Title 
                            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                            title={group.mealTime} 
                            titleStyle={{ fontWeight: "bold", textTransform: "capitalize" }} 
                            right={(props) => 
                            <Button
                                mode="text"
                                icon="plus-circle-outline"
                                textColor="#6366f1"
                                onPress={() => router.push("/add-meal")}>
                                Add more
                            </Button>}/>
                        <Divider className="mb-2 -mt-2" />
                        {group.foods.map(item => (
                            <Card.Content key={item._id} className="flex-row justify-between items-center my-0.5">
                                <Text numberOfLines={1} ellipsizeMode="tail">{item.text}</Text>
                                <Text>{item.calories}</Text>
                            </Card.Content>
                        ))}
                        <Divider className="mt-2" />
                        <Card.Content className="flex-row justify-between items-center mt-2">
                            <Text className="font-semibold">Total Calories:</Text> 
                            <Text className="font-semibold">{group.totalCalories}</Text>
                        </Card.Content>
                    </Card>
                </View>
            ))}
        </View>
    )
}