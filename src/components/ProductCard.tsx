import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

type Product = {
  id: string;
  brand: string;
  name: string;
  image: any;
  liked?: boolean;
  price: string;
  strap: string;
  color: string;
  warranty: string;
  description: string;
  details: string[];
};

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.productWrapper}>
      <View style={styles.productCard}>
        <TouchableOpacity style={styles.heartBox}>
          <Image
            source={
              product.liked
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