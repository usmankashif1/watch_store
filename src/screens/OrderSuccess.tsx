import React from "react";
import {
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

export default function OrderSuccess({ navigation }: any) {
  const orderId = "#" + Math.floor(100000 + Math.random() * 900000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/icons/Success.png")}
            style={styles.successIcon}
          />
        </View>

        <Text style={styles.title}>
          ORDER PLACED!
        </Text>

        <Text style={styles.subtitle}>
          Thank you for your purchase.
          {"\n"}
          Your luxury watch is on its way.
        </Text>

        <View style={styles.card}>

          <InfoRow
            label="Order ID"
            value={orderId}
          />

          <InfoRow
            label="Payment"
            value="Cash On Delivery"
          />

          <InfoRow
            label="Shipping"
            value="Free"
          />

          <InfoRow
            label="Estimated Delivery"
            value="2 - 4 Business Days"
          />

        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryText}>
            CONTINUE SHOPPING
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("MyOrders")}
        >
          <Text style={styles.secondaryText}>
            VIEW MY ORDERS
          </Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
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
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: RW(25),
  },

  iconContainer: {
    alignSelf: "center",
    width: RS(120),
    height: RS(120),
    borderRadius: RS(60),
    backgroundColor: "#17305F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RH(30),
  },

  successIcon: {
    width: RS(70),
    height: RS(70),
    resizeMode: "contain",
  },

  title: {
    color: Colors.white,
    fontSize: RF(30),
    fontFamily: Fonts.bold,
    textAlign: "center",
    letterSpacing: RW(2),
  },

  subtitle: {
    color: "#A7B3CC",
    fontSize: RF(15),
    fontFamily: Fonts.regular,
    textAlign: "center",
    lineHeight: RH(24),
    marginTop: RH(14),
    marginBottom: RH(35),
  },

  card: {
    backgroundColor: "#14264D",
    borderRadius: RS(22),
    padding: RS(20),
    marginBottom: RH(40),
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RH(18),
  },

  infoLabel: {
    color: "#A7B3CC",
    fontSize: RF(15),
    fontFamily: Fonts.regular,
  },

  infoValue: {
    color: Colors.white,
    fontSize: RF(15),
    fontFamily: Fonts.medium,
  },

  primaryButton: {
    height: RH(60),
    backgroundColor: Colors.primary,
    borderRadius: RS(18),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: RH(18),
  },

  primaryText: {
    color: Colors.secondary,
    fontSize: RF(16),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },

  secondaryButton: {
    height: RH(60),
    borderRadius: RS(18),
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    color: Colors.primary,
    fontSize: RF(16),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },
});