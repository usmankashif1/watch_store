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
import { useSelector } from "react-redux";

import Fonts from "../constants/fonts";
import { useAppDispatch } from "../store/hooks";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../store/slices/cartSlice";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

export default function Cart({ navigation }: any) {
  const dispatch = useAppDispatch();

  const cartItems = useSelector((state: any) =>
    Array.isArray(state?.cart?.items) ? state.cart.items : []
  );

  const subtotal = cartItems.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal > 0 ? 22 : 0;
  const total = subtotal + shipping + tax;

  if (cartItems?.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/BackArrow.png")}
              style={styles.back}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.smallTitle}>SHOPPING</Text>
            <Text style={styles.title}>MY CART</Text>
          </View>

          <View style={{ width: RS(28) }} />
        </View>

        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/icons/CartIcon.png")}
            style={styles.emptyIcon}
          />

          <Text style={styles.emptyTitle}>
            Your Cart is Empty
          </Text>

          <Text style={styles.emptySubtitle}>
            Looks like you haven't added{"\n"}
            any watches yet.
          </Text>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.checkoutText}>
              CONTINUE SHOPPING
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => dispatch(removeFromCart(item.id))}
      >
        {/* <Image
          source={require("../assets/icons/Delete.png")}
          style={styles.deleteIcon}
        /> */}
      </TouchableOpacity>

      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.watchImage}
      />

      <View style={styles.info}>
        <Text style={styles.brand}>
          {item.brand}
        </Text>

        <Text style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          ${item.price}
        </Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              dispatch(decreaseQuantity(item.id))
            }
          >
            <Text style={styles.qtySymbol}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() =>
              dispatch(increaseQuantity(item.id))
            }
          >
            <Text style={styles.qtySymbol}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/icons/BackArrow.png")}
            style={styles.back}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.smallTitle}>
            SHOPPING
          </Text>

          <Text style={styles.title}>
            MY CART
          </Text>
        </View>

        <View style={{ width: RS(28) }} />
      </View>

      {cartItems?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../assets/icons/CartIcon.png")}
            style={styles.emptyImage}
          />

          <Text style={styles.emptyTitle}>
            Your Cart is Empty
          </Text>

          <Text style={styles.emptySubtitle}>
            Looks like you haven't added any watches yet.
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.shopButtonText}>
              CONTINUE SHOPPING
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: RH(30) }}
          ListFooterComponent={
            <View style={styles.summary}>
              <SummaryRow
                label="Subtotal"
                value={`$${subtotal?.toFixed(2)}`}
              />

              <SummaryRow
                label="Shipping"
                value="Free"
              />

              <SummaryRow
                label="Tax"
                value={`$${tax?.toFixed(2)}`}
              />

              <View style={styles.divider} />

              <SummaryRow
                label="Total"
                value={`$${total?.toFixed(2)}`}
                bold
              />

              <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate("Checkout")}>
                <Text style={styles.checkoutText}>
                  PROCEED TO CHECKOUT
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}


    </SafeAreaView>
  );
}

function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text
        style={[
          styles.summaryLabel,
          bold && styles.totalLabel,
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.summaryValue,
          bold && styles.totalValue,
        ]}
      >
        {value}
      </Text>
    </View>
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
    marginBottom: RH(25),
  },

  back: {
    width: RS(30),
    height: RS(30),
    resizeMode: "contain",
  },

  smallTitle: {
    color: Colors.primary,
    fontSize: RF(11),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(3),
    textAlign: "center",
  },

  title: {
    color: Colors.white,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
    marginTop: RH(3),
  },

  /* Empty */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIcon: {
    width: RS(90),
    height: RS(90),
    tintColor: Colors.primary,
    resizeMode: "contain",
    marginBottom: RH(20),
  },

  emptyTitle: {
    color: Colors.white,
    fontSize: RF(26),
    fontFamily: Fonts.bold,
    marginBottom: RH(10),
  },

  emptySubtitle: {
    color: "#A8B7D8",
    textAlign: "center",
    fontSize: RF(15),
    lineHeight: RH(24),
    fontFamily: Fonts.regular,
    marginBottom: RH(35),
  },

  /* Card */

  card: {
    backgroundColor: "#132448",
    borderRadius: RS(24),
    flexDirection: "row",
    padding: RS(18),
    marginBottom: RH(18),
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  deleteBtn: {
    position: "absolute",
    top: RH(16),
    right: RW(16),
    zIndex: 5,
  },

  deleteIcon: {
    width: RS(22),
    height: RS(22),
    tintColor: "#FF6B6B",
    resizeMode: "contain",
  },

  watchImage: {
    width: RW(95),
    height: RH(130),
    marginRight: RW(18),
  },

  info: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: RH(4),
  },

  brand: {
    color: Colors.primary,
    fontSize: RF(10),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(2),
  },

  name: {
    color: Colors.white,
    fontSize: RF(20),
    fontFamily: Fonts.bold,
    marginTop: RH(4),
  },

  price: {
    color: Colors.primary,
    fontSize: RF(22),
    fontFamily: Fonts.bold,
    marginVertical: RH(8),
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },

  qtyBtn: {
    width: RS(34),
    height: RS(34),
    borderRadius: RS(17),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  qtySymbol: {
    color: Colors.secondary,
    fontSize: RF(22),
    fontFamily: Fonts.bold,
    marginTop: -2,
  },

  qty: {
    color: Colors.white,
    fontSize: RF(18),
    fontFamily: Fonts.bold,
    marginHorizontal: RW(18),
    minWidth: RW(22),
    textAlign: "center",
  },

  /* Summary */

  summary: {
    paddingTop: RH(18),
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RH(14),
  },

  summaryLabel: {
    color: "#A7B3CC",
    fontSize: RF(15),
    fontFamily: Fonts.regular,
  },

  summaryValue: {
    color: Colors.white,
    fontSize: RF(16),
    fontFamily: Fonts.medium,
  },

  totalLabel: {
    color: Colors.white,
    fontSize: RF(18),
    fontFamily: Fonts.bold,
  },

  totalValue: {
    color: Colors.primary,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: RH(14),
  },

  checkoutBtn: {
    marginTop: RH(24),
    height: RH(62),
    backgroundColor: Colors.primary,
    borderRadius: RS(18),
    justifyContent: "center",
    alignItems: "center",
  },

  checkoutText: {
    color: Colors.secondary,
    fontSize: RF(16),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },

  emptyImage: {
    width: RS(120),
    height: RS(120),
    resizeMode: "contain",
    opacity: 0.75,
    marginBottom: RH(24),
  },

  shopButton: {
    marginTop: RH(28),
    backgroundColor: Colors.primary,
    paddingHorizontal: RW(34),
    height: RH(52),
    borderRadius: RS(16),
    justifyContent: "center",
    alignItems: "center",
  },

  shopButtonText: {
    color: Colors.secondary,
    fontSize: RF(15),
    fontFamily: Fonts.bold,
    letterSpacing: RW(1.5),
  },
});