import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProductCard from "../components/ProductCard";
import Fonts from "../constants/fonts";
import { productService } from "../services/productService";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

const Search = () => {
    const navigation = useNavigation<any>();

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filteredProducts, setFilteredProducts] = useState(productService.getAllProducts());

    const handleSearch = (text: string) => {
        setSearch(text);
        setLoading(true);
        setError(null);

        try {
            const result = productService.searchProducts(text);
            setFilteredProducts(result);
        } catch {
            setError("Unable to search watches right now");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require("../assets/icons/BackArrow.png")}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.title}>SEARCH WATCHES</Text>

                <View style={styles.placeholder} />
            </View>


            <View style={styles.searchContainer}>
                <Image
                    source={require("../assets/icons/SearchIcon.png")}
                    style={styles.searchIcon}
                />

                <TextInput
                    placeholder="Search watches..."
                    placeholderTextColor="#8E9DB9"
                    value={search}
                    onChangeText={handleSearch}
                    style={styles.input}
                />
            </View>

            {error ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Search Error</Text>
                    <Text style={styles.emptySubtitle}>{error}</Text>
                </View>
            ) : loading ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>Searching...</Text>
                </View>
            ) : filteredProducts.length > 0 ? (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => navigation.navigate("ProductDetail", { product: item })}
                        />
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Image
                        source={require("../assets/icons/SearchIcon.png")}
                        style={styles.emptyIcon}
                    />

                    <Text style={styles.emptyTitle}>
                        No Watch Found
                    </Text>

                    <Text style={styles.emptySubtitle}>
                        Try searching another brand
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        paddingHorizontal: RW(20),
    },

  

    searchContainer: {
        height: RH(58),
        backgroundColor: "#14264D",
        borderRadius: RS(18),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: RW(18),
        marginBottom: RH(28),
    },

    searchIcon: {
        width: RS(22),
        height: RS(22),
        tintColor: Colors.primary,
        resizeMode: "contain",
        marginRight: RW(12),
    },

    input: {
        flex: 1,
        color: Colors.white,
        fontSize: RF(16),
        fontFamily: Fonts.regular,
    },

    list: {
        paddingBottom: RH(40),
    },

    row: {
        justifyContent: "space-between",
        marginBottom: RH(22),
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyIcon: {
        width: RS(70),
        height: RS(70),
        tintColor: Colors.primary,
        resizeMode: "contain",
        marginBottom: RH(20),
    },

    emptyTitle: {
        color: Colors.white,
        fontSize: RF(22),
        fontFamily: Fonts.bold,
        marginBottom: RH(8),
    },

    emptySubtitle: {
        color: "#A7B3CC",
        fontSize: RF(14),
        fontFamily: Fonts.regular,
        textAlign: "center",
    },
    header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: RH(25),
},

backIcon: {
  width: RS(30),
  height: RS(30),
},

placeholder: {
  width: RS(30),
},

title: {
  color: Colors.white,
  fontSize: RF(24),
  fontFamily: Fonts.bold,
  letterSpacing: RW(2),
},
});