import { Stack } from 'expo-router'
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ClerkClientProvider } from '../providers/clerk-client-provider';

export default function MainLayout() {
  return (
    <ClerkClientProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Stack >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </TouchableWithoutFeedback>
    </ClerkClientProvider>

  )
}