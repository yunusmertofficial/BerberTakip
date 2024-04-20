import { SearchBar as SearchBarComponent } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export const SearchBar = ({
  searchData,
}: {
  searchData: (search: string) => Promise<void>;
}) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateSearch = (text: string) => setSearch(text);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.length === 0) return;
      setIsLoading(true);
      await searchData(search);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <SearchBarComponent
      placeholder="Ara..."
      onChangeText={updateSearch}
      value={search}
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      showLoading={isLoading}
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    paddingHorizontal: 10,
  },
  inputContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    height: 40,
  },
  input: {
    color: "black",
  },
});
