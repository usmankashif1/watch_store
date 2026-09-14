import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fonts from "../constants/fonts";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleFavorite } from "../store/slices/favoritesSlice";
import type { Product } from "../types/product";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.items.map((item) => item.id));
  const isFavorite = favoriteIds.includes(product.id);

  return (
    <TouchableOpacity onPress={onPress} style={styles.productWrapper}>
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.heartBox}
          onPress={(event) => {
            event.stopPropagation?.();
            dispatch(toggleFavorite(product));
          }}
        >
          <Image
            source={
              isFavorite
                ? require("../assets/icons/HeartFill.png")
                : require("../assets/icons/Heart.png")
            }
            style={styles.heartIcon}
          />
        </TouchableOpacity>

        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      </View>

      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productName}>{product.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productWrapper: {
    width: RW(180),
    marginBottom: RH(24),
  },
  productCard: {
    height: RH(241),
    backgroundColor: Colors.primary,
    borderRadius: RS(18),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heartBox: {
    position: "absolute",
    right: RW(10),
    top: RH(10),
    width: RS(28),
    height: RS(28),
    borderRadius: RS(10),
    backgroundColor: Colors.lightGold,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  heartIcon: {
    width: RS(18),
    height: RS(18),
    resizeMode: "contain",
  },
  productImage: {
    width: RW(122),
    height: RH(168),
  },
  productBrand: {
    color: Colors.white,
    fontSize: RF(12),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
    marginTop: RH(14),
  },
  productName: {
    color: Colors.white,
    fontSize: RF(22),
    fontFamily: Fonts.regular,
  },
});