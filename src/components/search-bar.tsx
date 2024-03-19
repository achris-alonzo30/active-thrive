import { TextInput } from 'react-native-paper';

export const SearchBar = () => {
  return (
    <TextInput
      label="Search Food"
      value={""}
      onChangeText={() => {}}
      className="bg-gray-200 mb-1"
      mode="outlined"
      outlineColor="white"
      activeOutlineColor='blue'
      right={<TextInput.Icon icon="magnify" />}
    />
  );
};
