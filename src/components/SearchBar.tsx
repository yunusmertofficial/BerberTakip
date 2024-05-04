import { SearchBar as SearchBarComponent } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../utils";

export const SearchBar = ({
  searchData,
  placeholder,
  initialSearch = "",
}: {
  searchData: (search: string) => Promise<void>;
  placeholder?: string;
  initialSearch?: string;
}) => {
  console.log("SearchBar rendered");
  const [search, setSearch] = useState(initialSearch || "");
  const [isLoading, setIsLoading] = useState(false);

  const updateSearch = (text: string) => setSearch(text);

  const handleSearch = useCallback(async () => {
    if (search.length === 0) return;
    setIsLoading(true);
    await searchData(search);
    setIsLoading(false);
  }, [search, searchData]); // Burada searchData'yı bağımlılıklara ekledik.

  useEffect(() => {
    const timeout = setTimeout(async () => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <SearchBarComponent
      placeholder={placeholder || "Ara"}
      onChangeText={updateSearch}
      value={search}
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      showLoading={isLoading}
      round
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: "white",
  },
  input: {
    fontSize: 16,
  },
});
