import * as React from "react";
import { Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput, Button } from "react-native-paper";


export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();

    const [code, setCode] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");


    const [isLoading, setIsLoading] = React.useState(false);
    const [errorVerifyingEmail, setErrorVerifyingEmail] = React.useState(null);
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [errorCreatingAccount, setErrorCreatingAccount] = React.useState(null);


    // start the sign up process.
    const onSignUpPress = async () => {
        setIsLoading(true);
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setErrorCreatingAccount("Please make sure your email is valid and password is at least 8 characters long.");
        } finally {
            setIsLoading(false);
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
        setIsLoading(true);
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setErrorVerifyingEmail("Invalid code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="w-2/3">
            {!pendingVerification && (
                <View className="gap-2">
                    <View className="mb-4">
                        <Text className="font-bold text-xl text-center my-1">
                            Create an Account
                        </Text>
                        <Text className="text-center text-zinc-500">
                            Enter your details to create your account
                        </Text>
                    </View>
                    {errorCreatingAccount && (
                        <View className="mb-2">
                            <Text className="text-center text-rose-500 font-semibold">{errorCreatingAccount}</Text>
                        </View>
                    )}
                    <View className="">
                        <TextInput
                            autoCapitalize="none"
                            value={firstName}
                            placeholder="First Name..."
                            onChangeText={setFirstName}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            error={errorCreatingAccount}
                            disabled={isLoading}
                            activeOutlineColor="#6366f1"
                        />
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={lastName}
                            placeholder="Last Name..."
                            onChangeText={setLastName}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            error={errorCreatingAccount}
                            disabled={isLoading}
                            activeOutlineColor="#6366f1"
                        />
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="Email..."
                            onChangeText={setEmailAddress}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            error={errorCreatingAccount}
                            disabled={isLoading}
                            activeOutlineColor="#6366f1"
                        />
                    </View>

                    <View>
                        <TextInput
                            value={password}
                            placeholder="Password..."
                            placeholderTextColor="#000"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            error={errorCreatingAccount}
                            disabled={isLoading}
                            activeOutlineColor="#6366f1"
                        />
                    </View>

                    <Button onPress={onSignUpPress} mode="contained" className="bg-indigo-500 rounded-sm" disabled={isLoading}>
                        <Text>{isLoaded ? "Create Account" : "Loading..."}</Text>
                    </Button>

                </View>
            )}
            {pendingVerification && (
                <View className="gap-2">
                     <View className="mb-4">
                        <Text className="font-bold text-xl text-center my-1">
                            Verify Your Email
                        </Text>
                        <Text className="text-center text-zinc-500">
                            Please enter the code sent to <Text className="text-indigo-500 font-normal">{emailAddress}</Text>
                        </Text>
                    </View>
                    {errorVerifyingEmail && (
                        <View className="mb-2">
                            <Text className="text-center text-rose-500 font-semibold">{errorVerifyingEmail}</Text>
                        </View>
                    )}
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            onChangeText={(code) => setCode(code)}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            error={errorVerifyingEmail}
                            disabled={isLoading}
                            activeOutlineColor="#6366f1"
                        />
                    </View>
                    <Button onPress={onPressVerify} mode="contained" className="rounded-sm" style={{
                        backgroundColor: isLoading ? "#C7D2FE" :
                            "#6366f1"
                    }} disabled={isLoading}>
                        <Text>{isLoading ? "Loading..." : "Verify Email"}</Text>
                    </Button>
                </View>
            )}
        </View>
    );
}