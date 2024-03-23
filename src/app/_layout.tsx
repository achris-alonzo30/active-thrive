import { Stack } from 'expo-router';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import ConvexClientProvider from '../providers/convex-client-provider';
import { ClerkClientProvider } from '../providers/clerk-client-provider';

export default function MainLayout() {
  return (
    <ClerkClientProvider>
      <ConvexClientProvider>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <Stack >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ConvexClientProvider>
    </ClerkClientProvider>

  )
}