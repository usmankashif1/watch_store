import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

import { useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";

export default function Checkout({ navigation }: any) {
  const dispatch = useAppDispatch();

  const cartItems = useSelector((state: any) => state.cart.items);

  const [name, setName] = useState("Muhammad Usman");
  const [phone, setPhone] = useState("+92 300 1234567");
  const [city, setCity] = useState("Islamabad");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shipping = 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const placeOrder = () => {
    dispatch(clearCart());

    navigation.replace("OrderSuccess");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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
              COMPLETE YOUR
            </Text>

            <Text style={styles.title}>
              CHECKOUT
            </Text>
          </View>

          <View style={{ width: RS(30) }} />
        </View>

        {/* Customer */}

        <Text style={styles.sectionTitle}>
          CUSTOMER INFORMATION
        </Text>

        <View style={styles.inputCard}>
          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="#8091B2"
            style={styles.input}
          />

          <Text style={styles.label}>
            Phone Number
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
            keyboardType="phone-pad"
            placeholderTextColor="#8091B2"
            style={styles.input}
          />
        </View>

        {/* Address */}

        <Text style={styles.sectionTitle}>
          DELIVERY ADDRESS
        </Text>

        <View style={styles.inputCard}>
          <Text style={styles.label}>
            City
          </Text>

          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#8091B2"
          />

          <Text style={styles.label}>
            Street Address
          </Text>

          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            placeholder="House / Street"
            placeholderTextColor="#8091B2"
          />

          <Text style={styles.label}>
            Postal Code
          </Text>

          <TextInput
            value={postalCode}
            onChangeText={setPostalCode}
            style={styles.input}
            placeholder="44000"
            keyboardType="number-pad"
            placeholderTextColor="#8091B2"
          />
        </View>

        {/* Payment */}

        <Text style={styles.sectionTitle}>
          PAYMENT METHOD
        </Text>

        <View style={styles.paymentCard}>
          <Image
            source={require("../assets/icons/Cash.png")}
            style={styles.paymentIcon}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.paymentTitle}>
              Cash On Delivery
            </Text>

            <Text style={styles.paymentSubtitle}>
              Pay after receiving your order.
            </Text>
          </View>

          <Image
            source={require("../assets/icons/CheckCircle.png")}
            style={styles.checkIcon}
          />
        </View>

        {/* Summary */}

        <Text style={styles.sectionTitle}>
          ORDER SUMMARY
        </Text>

        <View style={styles.summaryCard}>
          <SummaryRow
            label="Subtotal"
            value={`$${subtotal.toFixed(2)}`}
          />

          <SummaryRow
            label="Shipping"
            value="Free"
          />

          <SummaryRow
            label="Tax"
            value={`$${tax.toFixed(2)}`}
          />

          <View style={styles.divider} />

          <SummaryRow
            label="Total"
            value={`$${total.toFixed(2)}`}
            bold
          />
        </View>

        <TouchableOpacity
          style={styles.orderButton}
          onPress={placeOrder}
        >
          <Text style={styles.orderText}>
            PLACE ORDER
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  },

  content: {
    paddingHorizontal: RW(20),
    paddingBottom: RH(40),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RH(30),
  },

  back: {
    width: RS(30),
    height: RS(30),
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
    letterSpacing: RW(2),
    marginTop: RH(2),
  },

  sectionTitle: {
    color: Colors.primary,
    fontSize: RF(12),
    fontFamily: Fonts.bold,
    letterSpacing: RW(3),
    marginBottom: RH(12),
    marginTop: RH(18),
  },

  inputCard: {
    backgroundColor: "#14264D",
    borderRadius: RS(22),
    padding: RS(18),
  },

  label: {
    color: "#A7B3CC",
    fontSize: RF(13),
    fontFamily: Fonts.medium,
    marginBottom: RH(8),
  },

  input: {
    height: RH(54),
    backgroundColor: "#1C325F",
    borderRadius: RS(14),
    color: Colors.white,
    fontSize: RF(15),
    fontFamily: Fonts.regular,
    paddingHorizontal: RW(16),
    marginBottom: RH(16),
  },

  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#14264D",
    borderRadius: RS(22),
    padding: RS(18),
  },

  paymentIcon: {
    width: RS(48),
    height: RS(48),
    resizeMode: "contain",
    marginRight: RW(16),
  },

  paymentTitle: {
    color: Colors.white,
    fontSize: RF(17),
    fontFamily: Fonts.bold,
  },

  paymentSubtitle: {
    color: "#A7B3CC",
    fontSize: RF(13),
    fontFamily: Fonts.regular,
    marginTop: RH(4),
  },

  checkIcon: {
    width: RS(24),
    height: RS(24),
    tintColor: Colors.primary,
    resizeMode: "contain",
  },

  summaryCard: {
    backgroundColor: "#14264D",
    borderRadius: RS(22),
    padding: RS(20),
    marginTop: RH(5),
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: RH(15),
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
    marginVertical: RH(12),
  },

  orderButton: {
    height: RH(62),
    borderRadius: RS(18),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RH(30),
    marginBottom: RH(40),
  },

  orderText: {
    color: Colors.secondary,
    fontSize: RF(17),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },
});
