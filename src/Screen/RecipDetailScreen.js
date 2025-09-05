import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const RecipDetailScreen = ({ route }) => {
    const { recipe } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIsFavorite();
    }, []);

    const checkIsFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);
            setIsFavorite(isFav);
        } catch (error) {
            console.error("Error Loading favorites", error);
        }
    };

    const renderIngredient = ({ item }) => (
        <View style={styles.ingredientItem}>
            <MaterialIcons name="check-circle" size={18} color="#ff6f61" />
            <Text style={styles.ingredientText}>{item}</Text>
        </View>
    );


    const toggleFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (isFavorite) {
                // Remove from favorites
                favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
            } else {
                // Add to favorites
                favorites.push(recipe);
            }

            await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error Saving Favorite", error);
        }
    };

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }

    return (
        <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderIngredient}
            ListHeaderComponent={
                <>
                    <View>
                        <Image style={styles.image} source={{ uri: recipe.strMealThumb }} />
                        <TouchableOpacity 
                            style={styles.favoriteButton}
                            onPress={toggleFavorite}
                        > 
                            <MaterialIcons 
                                name={isFavorite ? "favorite" : "favorite-border"} 
                                size={28} 
                                color={isFavorite ? "#ff6f61" : "#333"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{recipe.strMeal}</Text>
                        <Text style={styles.category}>
                            {recipe.strCategory} | {recipe.strArea} Cuisine
                        </Text>
                        <Text style={styles.sectionTitle}>Ingredients:</Text>
                    </View>
                </>
            }
            ListFooterComponent={null}
        />
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    image: { width: "100%", height: 250, borderRadius: 12 },
    favoriteButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderRadius: 20,
        padding: 5,
    },
    title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
    category: { fontSize: 18, color: "#555" },
    sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
    ingredientItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
    ingredientText: { fontSize: 16, marginLeft: 8, color: "#333" },
});

export default RecipDetailScreen;