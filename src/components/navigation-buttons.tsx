import * as React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export const NavigationButtons = () => (
    <View className="flex-row justify-between items-center gap-1 w-full my-1">
        <Button icon="barcode-scan" mode="contained-tonal" onPress={() => console.log('Pressed')} className="w-1/2 bg-indigo-200" >
            Scan Barcode
        </Button>
        <Button icon="plus-box-outline" mode="contained-tonal" onPress={() => console.log('Pressed')} className="w-1/2 bg-indigo-200" >
            Manual Input
        </Button>
    </View>
);

