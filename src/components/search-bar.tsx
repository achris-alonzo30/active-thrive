import { TextInput } from 'react-native-paper';

type SearchBarProps = {
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  runSearch: () => void
}

export const SearchBar = ({ search, setSearch, runSearch }: SearchBarProps) => {
  return (
    <TextInput
      label="Search Food"
      value={search}
      onChangeText={setSearch}
      className="bg-gray-200 mb-1"
      mode="outlined"
      outlineColor="#e5e7eb"
      activeOutlineColor="#6366f1"
      right={<TextInput.Icon onPress={runSearch} icon="magnify" />}
    />
  );
};
