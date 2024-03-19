

import { StatusBar } from 'expo-status-bar';


import { FlatList, Text, View } from 'react-native';
import { SearchBar } from '../../components/search-bar';
import { FoodListItem } from '../../components/food-list-item';
import { NavigationButtons } from '../../components/navigation-buttons';
import { useAuth } from '@clerk/clerk-expo';
import { MustBeSignedIn } from '../../components/client-feedback/must-signed-in';


const items = [
  { name: "Poolish Pizza", calories: 165, source: "Pizzareia" },
  { name: "Trattoni Pizza", calories: 220, source: "Pizzareia" },
  { name: "Margeritta Pizza", calories: 260, source: "Pizzareia" },
]

export default function App() {
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) return <MustBeSignedIn />

  return (
    <View className="flex flex-col p-2 h-full">
      <SearchBar/>
      <NavigationButtons />
      <FlatList data={items} renderItem={({ item }) => <FoodListItem item={item} />} ListEmptyComponent={() => <Text className="text-xl font-bold flex mt-64 text-center">No Results Found</Text>} contentContainerStyle={{ gap: 5 }} />
      <StatusBar style="auto" />
    </View>
  );
}
 
