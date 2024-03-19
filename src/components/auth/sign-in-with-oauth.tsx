import React from "react";
import { View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { Button, Text } from 'react-native-paper';
import { useWarmUpBrowser } from "../../lib/use-warmup-browser";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <View className="w-2/3 my-2">
            <Button
                onPress={onPress}
                icon="google"
                mode="contained-tonal"
                className="rounded-sm bg-indigo-200"
                textColor={isLoading ? "#C7D2FE" : "#6366f1"}
                disabled={isLoading}
            >
                <Text className="text-indigo-500 font-bold" >{isLoading ? "Redirecting..." : "Sign In With Google"}</Text>
            </Button>
        </View>
    );

}
export default SignInWithOAuth;