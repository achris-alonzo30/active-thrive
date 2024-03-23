import * as z from "zod";
import * as React from 'react';
import { Text, View } from 'react-native';
import { useMutation } from "convex/react";
import { useAuth } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { api } from "../../../convex/_generated/api";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { useLocalSearchParams, useRouter } from "expo-router";

const formSchema = z.object({
    text: z.string().min(1, "Required").max(100, "Must be 100 characters or less"),
    brand: z.string().min(1, "Required").max(100, "Must be 100 characters or less"),
    calories: z.string().min(1, "Required").max(100, "Must be 100 characters or less"),
    mealTime: z.string().min(1, "Required").max(100, "Must be 100 characters or less"),
    servingSize: z.string().min(1, "Required").max(100, "Must be 100 characters or less"),
})

export default function LogoFood() {
    const [isResetting, setIsResetting] = React.useState(false);

    const params = useLocalSearchParams();
    const { text, brand, servingSize, calories } = params;

    const router = useRouter();
    const { userId } = useAuth();
    const addFood = useMutation(api.foodLog.logFood);

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mealTime: "",
            text: Array.isArray(text) ? text[0] || '' : text || '',
            brand: Array.isArray(brand) ? brand[0] || '' : brand || '',
            calories: Array.isArray(calories) ? calories[0] || "" : calories || "",
            servingSize: Array.isArray(servingSize) ? servingSize[0] || "" : servingSize || "",
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await addFood({
                userId,
                text: data.text || "",
                brand: data.brand || "",
                mealTime: data.mealTime || "",
                calories: data.calories || "",
                servingSize: data.servingSize || ""
            })
        } catch (error) {
            console.error('Error adding food:', error);
            Toast.show({
                type: "error",
                text1: "Oops,Something Went Wrong!",
                text2: "Please Try Again",
            })
        } finally {
            router.push("/");
            Toast.show({
                type: "success",
                text1: "Food Added",
                text2: "Your food has been added to your food log",
            })
        }
    };

    const resetFields = () => {
        reset({
            mealTime: "",
            text: Array.isArray(text) ? text[0] || '' : text || '',
            brand: Array.isArray(brand) ? brand[0] || '' : brand || '',
            calories: Array.isArray(calories) ? calories[0] || "" : calories || "",
            servingSize: Array.isArray(servingSize) ? servingSize[0] || "" : servingSize || "",
        })
    }

    return (
        <View className="flex-1 items-center justify-center my-2 bg-white">
            <View className="w-2/3 space-y-4">
                <Text className="font-semibold text-base">Select a Meal Time of the Day</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            style={{
                                inputIOS: {
                                    fontSize: 16,
                                    paddingVertical: 16,
                                    paddingHorizontal: 10,
                                    color: 'black',
                                    borderWidth: 1,
                                    borderColor: '#e5e7eb',
                                    borderRadius: 5,
                                    backgroundColor: '#e5e7eb',
                                }
                            }}
                            value={value}
                            onValueChange={(value) => onChange(value)}
                            items={[
                                { label: 'Breakfast', value: 'breakfast' },
                                { label: 'Meal 1', value: 'meal 1' },
                                { label: 'Lunch', value: 'lunch' },
                                { label: 'Meal 2', value: 'meal 2' },
                                { label: 'Dinner', value: 'dinner' },
                            ]}
                        />
                    )}
                    name="mealTime"
                    rules={{ required: true }}
                />
                <Text className="font-semibold text-base">Food Name</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            activeOutlineColor="#6366f1"
                        />
                    )}
                    name="text"
                    rules={{ required: true }}
                />
                <Text className="font-semibold text-base">Brand Name</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput

                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            activeOutlineColor="#6366f1"
                        />
                    )}
                    name="brand"
                    rules={{ required: true }}
                />

                <Text className="font-semibold text-base">Serving Size (g)</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            activeOutlineColor="#6366f1"
                        />
                    )}
                    name="servingSize"
                    rules={{ required: true }}
                />
                <Text className="font-semibold text-base">Calories</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput

                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            className="bg-gray-200"
                            mode="outlined"
                            outlineColor="#e5e7eb"
                            activeOutlineColor="#6366f1"
                        />
                    )}
                    name="calories"
                    rules={{ required: true }}
                />
            </View>
            <View className="w-2/3 my-4">
                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="contained" className=" rounded-sm" style={{
                        backgroundColor: isSubmitting ? "#C7D2FE" :
                            "#6366f1"
                    }} disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Submit"}
                </Button>
            </View>
            <View className="">
                <Button
                    onPress={() => resetFields()}
                >
                    Reset
                </Button>
            </View>
        </View>
    );
};