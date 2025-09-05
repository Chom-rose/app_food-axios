import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import SearchBox from "../components/SearchBox";
import RecipCard from "../components/RecipCard";

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  // โหลด Favorites ทุกครั้งที่เข้าหน้านี้
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoriteMeals = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favoriteMeals);
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBox
        placeholder="ค้นหาสูตรอาหารโปรด..."
        value={search}
        onChangeText={(value) => setSearch(value)}
      />
      {favorites.length > 0 ? (
        <FlashList
          data={favorites.filter((item) =>
            item.strMeal.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => <RecipCard item={item} />}
          estimatedItemSize={120} 
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.empty}>ไม่มีสูตรอาหารโปรด</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  empty: { textAlign: "center", marginTop: 20, fontSize: 18, color: "#999" },
  listContainer: { paddingBottom: 20 },
});

export default FavoritesScreen;
