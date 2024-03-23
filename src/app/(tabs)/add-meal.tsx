
import { useState } from 'react';
import { useAction } from "convex/react";
import { useAuth } from '@clerk/clerk-expo';
import { StatusBar } from 'expo-status-bar';
import { Foods, Hint } from '../../lib/types';
import { FlatList, Text, View } from 'react-native';
import { api } from '../../../convex/_generated/api';
import { SearchBar } from '../../components/search-bar';
import { FoodListItem } from '../../components/food-list-item';
import { NavigationButtons } from '../../components/navigation-buttons';
import { MustBeSignedIn } from '../../components/client-feedback/must-signed-in';
import { items } from '../../lib/test';

export default function MealPage() {
  const [foods, setFoods] = useState<Foods>({ hints: [], text: '' });
  const [search, setSearch] = useState("");
  const { isSignedIn, userId } = useAuth();

  if (!isSignedIn) return <MustBeSignedIn />

  const fetchFoods = useAction(api.edamam.getFoods);

  const runSearch = async () => {
    try {
      const res = await fetchFoods({ ingr: search });

      setFoods(res);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const { hints, text } = foods;

  const data = hints.map((hint: Hint) => {
    const { brand, foodId, label, nutrients, servingSizes } = hint.food;
    return { brand, foodId, label, nutrients, text, servingSizes };
  });


  return (
    <View className="flex flex-col p-2 h-full bg-white">
      <SearchBar search={search} setSearch={setSearch} runSearch={runSearch} />
      <NavigationButtons />
      <FlatList data={items} renderItem={({ item }) => <FoodListItem item={item} />} ListEmptyComponent={() => <Text className="text-xl font-bold flex mt-64 text-center">No Results Found</Text>} contentContainerStyle={{ gap: 5 }} />
      <StatusBar style="auto" />
    </View>
  );
}

