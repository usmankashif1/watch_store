import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

const favoriteWatches = [
  {
    id: "1",
    brand: "REVUE THOMMEN",
    name: "Heritage Automatic",
    price: "$520",
    rating: "★★★★★",
    stock: "In Stock",
    image: require("../assets/images/watches/Thommen_Watches.png"),
    liked: true,
  },
  {
    id: "2",
    brand: "BREMONT",
    name: "MB Savanna",
    price: "$690",
    rating: "★★★★☆",
    stock: "Limited Edition",
    image: require("../assets/images/watches/Bremont.png"),
    liked: true,
  },
  {
    id: "3",
    brand: "CAT",
    name: "Classic Black",
    price: "$340",
    rating: "★★★★★",
    stock: "In Stock",
    image: require("../assets/images/watches/CAT_Watches.png"),
    liked: true,
  },
  {
    id: "4",
    brand: "TOMMY HILFIGER",
    name: "Luxury Silver",
    price: "$410",
    rating: "★★★★☆",
    stock: "Only 2 Left",
    image: require("../assets/images/watches/Tommy_Hilfiger.png"),
    liked: true,
  },
];

export default function Favorites({ navigation }: any) {
  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        // onPress={() =>
        //   navigation.navigate("ProductDetail", {
        //     product: item,
        //   })
        // }
      >
        {/* Heart */}

        <TouchableOpacity style={styles.heartContainer}>
          <Image
            source={require("../assets/icons/HeartFill.png")}
            style={styles.heart}
          />
        </TouchableOpacity>

        {/* Image */}

        <Image
          source={item.image}
          resizeMode="contain"
          style={styles.watchImage}
        />

        {/* Brand */}

        <Text style={styles.brand}>
          {item.brand}
        </Text>

        {/* Name */}

        <Text style={styles.name}>
          {item.name}
        </Text>

        {/* Rating */}

        <Text style={styles.rating}>
          {item.rating}
        </Text>

        {/* Stock */}

        <View style={styles.stockBadge}>
          <Text style={styles.stock}>
            {item.stock}
          </Text>
        </View>

        {/* Divider */}

        <View style={styles.divider} />

        {/* Bottom */}

        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceLabel}>
              PRICE
            </Text>

            <Text style={styles.price}>
              {item.price}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            // onPress={() =>
            //   navigation.navigate("ProductDetail", {
            //     product: item,
            //   })
            // }
          >
            <Text style={styles.buttonText}>
              VIEW →
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/BackArrow.png")}
            style={styles.back}
          />
        </TouchableOpacity>

        <View>

          <Text style={styles.smallTitle}>
            YOUR COLLECTION
          </Text>

          <Text style={styles.title}>
            FAVORITES
          </Text>

        </View>

        <View style={{ width: RS(30) }} />

      </View>

      <FlatList
        data={favoriteWatches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: RW(20),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RH(28),
  },

  back: {
    width: RS(28),
    height: RS(28),
    resizeMode: "contain",
  },

  smallTitle: {
    color: Colors.primary,
    fontSize: RF(10),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(3),
    textAlign: "center",
  },

  title: {
    color: Colors.white,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
    letterSpacing: RW(3),
    marginTop: RH(3),
    textAlign: "center",
  },

  list: {
    paddingBottom: RH(40),
  },

  card: {
    backgroundColor: "#14264D",
    borderRadius: RS(24),
    paddingHorizontal: RW(18),
    paddingVertical: RH(18),
    marginBottom: RH(24),

    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 8,
  },

  heartContainer: {
    position: "absolute",
    top: RH(16),
    right: RW(16),

    width: RS(42),
    height: RS(42),
    borderRadius: RS(21),

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },

  heart: {
    width: RS(20),
    height: RS(20),
    resizeMode: "contain",
  },

  watchImage: {
    width: RW(180),
    height: RH(165),
    alignSelf: "center",
    marginTop: RH(8),
    marginBottom: RH(18),
  },

  brand: {
    color: Colors.primary,
    fontSize: RF(10),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(3),
    marginBottom: RH(6),
  },

  name: {
    color: Colors.white,
    fontSize: RF(22),
    fontFamily: Fonts.medium,
    marginBottom: RH(10),
  },

  rating: {
    color: "#FFD54F",
    fontSize: RF(15),
    letterSpacing: RW(1),
    marginBottom: RH(10),
  },

  stockBadge: {
    alignSelf: "flex-start",

    backgroundColor: "rgba(255,255,255,0.08)",

    paddingHorizontal: RW(12),
    paddingVertical: RH(6),

    borderRadius: RS(20),

    marginBottom: RH(18),
  },

  stock: {
    color: "#D6E2F0",
    fontSize: RF(11),
    fontFamily: Fonts.regular,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: RH(18),
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  priceLabel: {
    color: "#9BB1D1",
    fontSize: RF(10),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(2),
  },

  price: {
    color: Colors.primary,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
    marginTop: RH(4),
  },

  button: {
    backgroundColor: Colors.primary,

    paddingHorizontal: RW(22),
    height: RH(42),

    borderRadius: RS(12),

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: Colors.secondary,
    fontSize: RF(12),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },
});
