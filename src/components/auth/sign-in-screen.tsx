import React from "react";
import { Text, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { TextInput, Button } from 'react-native-paper';

export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [errors, setErrors] = React.useState(null);
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailAddress, setEmailAddress] = React.useState("");

    const onSignInPress = async () => {
        setIsLoading(true);
        if (!isLoaded) {
            return;
        }
        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            await setActive({ session: completeSignIn.createdSessionId });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setErrors("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="w-2/3">
            <View className="mb-4">
                <Text className="font-bold text-xl text-center my-1">
                    Login to Your Account
                </Text>
                <Text className="text-center text-zinc-500">
                    Enter your email and password to login to your account
                </Text>
            </View>
            {errors && (
                <View className="mb-2">
                    <Text className="text-center text-rose-500 font-semibold">{errors}</Text>
                </View>
            )}
            <View className="">
                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email..."
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                    className="bg-gray-200"
                    mode="outlined"
                    outlineColor="#e5e7eb"
                    activeOutlineColor="#6366f1"
                    disabled={isLoading}
                    error={errors}
                />
            </View>

            <View className="my-2">
                <TextInput
                    value={password}
                    placeholder="Password..."
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                    className="bg-gray-200"
                    mode="outlined"
                    outlineColor="#e5e7eb"
                    activeOutlineColor="#6366f1"
                    disabled={isLoading}
                    error={errors}
                />
            </View>

            <Button onPress={onSignInPress} mode="contained" className=" rounded-sm" style={{
                backgroundColor: isLoading ? "#C7D2FE" :
                    "#6366f1"
            }} disabled={isLoading}>
                <Text>{isLoading ? "Loading..." : "Login"}</Text>
            </Button>
        </View>
    );
}