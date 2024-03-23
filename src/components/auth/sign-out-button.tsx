import { View } from 'react-native';
import { Button} from 'react-native-paper';
import { useAuth } from "@clerk/clerk-expo";
import { IconButton, MD3Colors } from 'react-native-paper';

export const SignOut = () => {
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
          icon="logout"
        >
          Sign Out
        </Button>
      </View>
    );
  };

