import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipCard = ({ item }) => {
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);

    // โหลดรายการโปรดทุกครั้งที่ผู้ใช้กลับมาหน้านี้
    useFocusEffect(
        useCallback(() => {
            checkIsFavorite();
        }, [])
    );

    const checkIsFavorite = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem("favorites");
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
            setIsFavorite(favorites.some(fav => fav.idMeal === item.idMeal));
        } catch (error) {
            console.error("Error loading favorites", error);
        }
    };

    return (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
        >
            <Image style={styles.image} source={{ uri: item.strMealThumb }} />
            <View style={styles.textContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.strMeal} </Text>
                    <MaterialIcons 
                        name={isFavorite ? "favorite" : "favorite-border"} 
                        size={24} 
                        color={isFavorite ? "#ff6f61" : "#aaa"} 
                    />
                </View>
                <Text style={styles.category}>{item.strCategory}</Text>
                <View style={styles.footer}>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    image: { width: 100, height: 100, borderRadius: 10 },
    textContainer: { flex: 1, paddingLeft: 12, justifyContent: "center" },
    header: {
        flexDirection: "row", // ทำให้ title และ heart อยู่ข้างๆ กัน
        //justifyContent: "space-between", // ทำให้ title อยู่ซ้ายและ heart อยู่ขวา
        alignItems: "center", // ทำให้ทั้งสองอยู่กลาง
    },
    title: { fontSize: 18, fontWeight: "bold", color: "#333" },
    category: { fontSize: 14, color: "#777", marginTop: 4 },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-end", // ชิดขวา
        alignItems: "center",
        marginTop: 8,
    },
});

export default RecipCard;
