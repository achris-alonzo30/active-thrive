import { useRouter } from "expo-router"
import { View, Text } from "react-native"
import { Button } from "react-native-paper";

export const MustBeSignedIn = () => {
    const router = useRouter();
    return (
        <View className="flex-1 items-center justify-center my-2">
            <Text className="text-center text-zinc-500">
                You must be signed in to use this feature
            </Text>
            <Button onPress={() => router.back()}>
                <Text>Go Back</Text>
            </Button>
        </View>
    )
}