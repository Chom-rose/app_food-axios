import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import SearchBox from "../components/SearchBox";
import RecipCard from "../components/RecipCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";


const HomeScreens = () => {
    const [search, setSearch] = useState("");
    const [recipes, setRecipes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(
                "https://www.themealdb.com/api/json/v1/1/search.php?s="
            );
            setRecipes(response.data.meals);
        } catch (error) {
            console.error("ไม่สามารถดึงข้อมูลได้!!!", error);
        }
    };

    return (
        <View style={styles.container}>
            <SearchBox
                placeholder="ค้นหาสูตรอาหาร..."
                value={search}
                onChangeText={(value) => setSearch(value)}
            />
            <TouchableOpacity style={styles.favoritesButton} onPress={() => navigation.navigate('FavoritesScreen')}>
                <Text style={styles.favoritesButtonText}>ดูรายการโปรด</Text>
            </TouchableOpacity>
            <FlatList
                data={recipes.filter((item) =>
                    item.strMeal.toLowerCase().includes(search.toLowerCase())
                )}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => <RecipCard item={item} />}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    favoritesButton: {
        backgroundColor: '#ff6f61',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    favoritesButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreens;