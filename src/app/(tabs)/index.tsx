import { useState } from 'react';
import { Button} from 'react-native-paper';
import { SafeAreaView, Text, View } from 'react-native';
import SignInScreen from '../../components/auth/sign-in-screen';
import SignUpScreen from '../../components/auth/sign-up-screen';
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import SignInWithOAuth from '../../components/auth/sign-in-with-oauth';

export default function App() {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleToggleForm = () => {
    setShowSignIn(!showSignIn);
  };


  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();

    if (!isLoaded) {
      return null;
    }
    
    return (
      <View>
        <Button
          onPress={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <SignedIn>
        <Text>You are Signed in</Text>
        <SignOut />
      </SignedIn>
      <SignedOut>
        {showSignIn ? (
          <>
            <SignInScreen />
            <Button onPress={handleToggleForm} className="my-2">
              <Text className="text-center text-zinc-500">Don't have an account? Sign Up</Text>
            </Button>
          </>
        ) : (
          <>
            <SignUpScreen />
            <Text onPress={handleToggleForm} className="my-2 text-center text-zinc-500">
              Already have an account? Sign In
            </Text>
          </>
        )}
        <View className="text-center my-4">
          <Text className="text-zinc-500">OR CONTINUE WITH </Text>
        </View>
        <SignInWithOAuth />
      </SignedOut>
    </SafeAreaView>
  );
}

