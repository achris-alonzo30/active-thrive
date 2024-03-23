import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-expo";

import { FoodLogs } from "./food-logs";
import { Loader } from "../client-feedback/loader";
import { api } from "../../../convex/_generated/api";
import { FlatList, Image, View, Text } from "react-native";

export const Dashboard = () => {
    const { user, isLoaded } = useUser();

    const foodLogs = useQuery(api.foodLog.fetchLogs, { userId: user?.id });

    if (!isLoaded) return <Loader />;

    return (
        <View className="flex-1 p-10 mx-2 w-full">
            <View className="flex-row justify-between items-center mb-6">
                <View className="flex-row items-center gap-2">
                    <Image source={{ uri: user?.imageUrl }} className="w-10 h-10 rounded-full" />
                    <View>
                        <Text className="text-base font-normal">Great to see you again,</Text>
                        <Text className="text-base font-semibold text-[#6366f1]">{user.fullName}!</Text>
                    </View>
                </View>
            </View>
            <FoodLogs foods={foodLogs} />
        </View>
    )
}