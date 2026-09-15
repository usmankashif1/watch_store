import React, { useMemo, useState } from "react";
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Fonts from "../constants/fonts";
import { makeOrderDraft } from "../services/orderService";
import type { RootState } from "../store";
import { useAppDispatch } from "../store/hooks";
import { clearCart } from "../store/slices/cartSlice";
import { addOrder } from "../store/slices/ordersSlice";
import Colors from "../utlis/colors";
import { RF, RH, RS, RW } from "../utlis/responsive";

export default function Checkout({ navigation }: any) {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cartItems]);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + tax + shipping;
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!customer.fullName.trim()) nextErrors.fullName = "Full name is required";
    if (!customer.email.trim()) nextErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(customer.email)) nextErrors.email = "Enter a valid email";
    if (!customer.phone.trim()) nextErrors.phone = "Phone number is required";
    if (!customer.address.trim()) nextErrors.address = "Address is required";
    if (!customer.city.trim()) nextErrors.city = "City is required";
    if (!customer.postalCode.trim()) nextErrors.postalCode = "Postal code is required";
    if (!customer.country.trim()) nextErrors.country = "Country is required";

    if (paymentMethod === "card") {
      if (!cardNumber.trim()) nextErrors.cardNumber = "Card number is required";
      if (!expiryDate.trim()) nextErrors.expiryDate = "Expiry date is required";
      if (!cvv.trim()) nextErrors.cvv = "CVV is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) {
      setCheckoutError("Please complete all checkout fields");
      return;
    }

    if (!cartItems.length) {
      setCheckoutError("Your cart is empty");
      return;
    }

    setCheckoutError(null);
    setSubmitting(true);

    try {
      const newOrder = makeOrderDraft(customer, cartItems, paymentMethod, {
        subtotal,
        tax,
        shipping,
        total,
      });

      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      navigation.navigate("OrderSuccess");
    } catch {
      setCheckoutError("Unable to place the order right now");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/icons/BackgroundTwo.png")}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/icons/BackArrow.png")}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <Text style={styles.title}>CHECKOUT</Text>

          <View style={styles.headerSpace} />
        </View>



        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >

            <Text style={styles.sectionTitle}>CONTACT INFO</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>FULL NAME</Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#7F8DA8"
                style={[styles.input, errors.fullName && styles.inputError]}
                value={customer.fullName}
                onChangeText={(value) => setCustomer({ ...customer, fullName: value })}
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#7F8DA8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email && styles.inputError]}
                value={customer.email}
                onChangeText={(value) => setCustomer({ ...customer, email: value })}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PHONE NUMBER</Text>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor="#7F8DA8"
                keyboardType="phone-pad"
                style={[styles.input, errors.phone && styles.inputError]}
                value={customer.phone}
                onChangeText={(value) => setCustomer({ ...customer, phone: value })}
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>ADDRESS</Text>
              <TextInput
                placeholder="House / Street / Area"
                placeholderTextColor="#7F8DA8"
                style={[styles.input, errors.address && styles.inputError]}
                value={customer.address}
                onChangeText={(value) => setCustomer({ ...customer, address: value })}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>CITY</Text>
                <TextInput
                  placeholder="City"
                  placeholderTextColor="#7F8DA8"
                  style={[styles.input, errors.city && styles.inputError]}
                  value={customer.city}
                  onChangeText={(value) => setCustomer({ ...customer, city: value })}
                />
                {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.label}>POSTAL CODE</Text>
                <TextInput
                  placeholder="Postal code"
                  placeholderTextColor="#7F8DA8"
                  keyboardType="number-pad"
                  style={[styles.input, errors.postalCode && styles.inputError]}
                  value={customer.postalCode}
                  onChangeText={(value) => setCustomer({ ...customer, postalCode: value })}
                />
                {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>COUNTRY</Text>
              <TextInput
                placeholder="Country"
                placeholderTextColor="#7F8DA8"
                style={[styles.input, errors.country && styles.inputError]}
                value={customer.country}
                onChangeText={(value) => setCustomer({ ...customer, country: value })}
              />
              {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}
            </View>

            <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>

            <TouchableOpacity
              style={[
                styles.paymentCard,
                paymentMethod === "cash" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("cash")}
            >
              <View style={styles.radio}>
                {paymentMethod === "cash" && <View style={styles.radioInner} />}
              </View>

              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>CASH ON DELIVERY</Text>
                <Text style={styles.paymentDescription}>Pay when your order arrives</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentCard,
                paymentMethod === "card" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <View style={styles.radio}>
                {paymentMethod === "card" && <View style={styles.radioInner} />}
              </View>

              <View style={styles.paymentInfo}>
                <Text style={styles.paymentTitle}>PAY WITH CARD</Text>
                <Text style={styles.paymentDescription}>Pay securely using your debit or credit card</Text>
              </View>
            </TouchableOpacity>

            {checkoutError ? <Text style={styles.checkoutError}>{checkoutError}</Text> : null}

            {paymentMethod === "card" && (
              <View style={styles.cardSection}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CARD NUMBER</Text>
                  <TextInput
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor="#7F8DA8"
                    keyboardType="number-pad"
                    maxLength={19}
                    style={[styles.input, errors.cardNumber && styles.inputError]}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                  />
                  {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
                </View>

                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <Text style={styles.label}>EXPIRY DATE</Text>
                    <TextInput
                      placeholder="MM / YY"
                      placeholderTextColor="#7F8DA8"
                      style={[styles.input, errors.expiryDate && styles.inputError]}
                      value={expiryDate}
                      onChangeText={setExpiryDate}
                    />
                    {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
                  </View>

                  <View style={styles.halfInput}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                      placeholder="CVV"
                      placeholderTextColor="#7F8DA8"
                      keyboardType="number-pad"
                      maxLength={4}
                      secureTextEntry
                      style={[styles.input, errors.cvv && styles.inputError]}
                      value={cvv}
                      onChangeText={setCvv}
                    />
                    {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                  </View>
                </View>
              </View>
            )}

<TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder} disabled={submitting}>
                <Text style={styles.placeOrderText}>{submitting ? "PROCESSING..." : "PLACE ORDER"}</Text>
            </TouchableOpacity>

            <Text style={styles.secureText}>Your information is safe and secure</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: RW(20),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RH(22),
  },

  backIcon: {
    width: RS(30),
    height: RS(30),
    resizeMode: "contain",
  },

  title: {
    color: Colors.white,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
    letterSpacing: RW(3),
  },

  headerSpace: {
    width: RS(30),
  },

  content: {
    paddingBottom: RH(40),
  },

  sectionTitle: {
    color: Colors.primary,
    fontSize: RF(18),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(2.5),
    marginTop: RH(8),
    marginBottom: RH(16),
  },

  inputGroup: {
    marginBottom: RH(18),
  },

  label: {
    color: Colors.white,
    fontSize: RF(14),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(2),
    marginBottom: RH(7),
  },

  input: {
    height: RH(52),
    backgroundColor: "#14264D",
    borderRadius: RS(13),
    paddingHorizontal: RW(15),
    color: Colors.white,
    fontSize: RF(14),
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: RW(12),
    marginBottom: RH(2),
  },

  halfInput: {
    flex: 1,
  },

  paymentCard: {
    minHeight: RH(72),
    backgroundColor: "#14264D",
    borderRadius: RS(16),
    paddingHorizontal: RW(15),
    paddingVertical: RH(13),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RH(12),
    borderWidth: 1,
    borderColor: "transparent",
  },

  selectedPayment: {
    borderColor: Colors.primary,
  },

  radio: {
    width: RS(22),
    height: RS(22),
    borderRadius: RS(11),
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: RS(11),
    height: RS(11),
    borderRadius: RS(6),
    backgroundColor: Colors.primary,
  },

  paymentInfo: {
    flex: 1,
    marginLeft: RW(13),
  },

  paymentTitle: {
    color: Colors.white,
    fontSize: RF(13),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(1),
    marginBottom: RH(4),
  },

  paymentDescription: {
    color: "#8E9DB9",
    fontSize: RF(11),
    fontFamily: Fonts.regular,
  },

  cardSection: {
    marginTop: RH(5),
  },

  placeOrderButton: {
    height: RH(60),
    backgroundColor: Colors.primary,
    borderRadius: RS(16),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RH(18),
  },

  placeOrderText: {
    color: Colors.secondary,
    fontSize: RF(17),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2.5),
  },

  secureText: {
    color: "#7F8DA8",
    fontSize: RF(14),
    fontFamily: Fonts.regular,
    textAlign: "center",
    marginTop: RH(12),
  },
  checkoutError: {
    color: "#FFB4B4",
    fontSize: RF(14),
    fontFamily: Fonts.regular,
    marginBottom: RH(8),
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FFB4B4",
    fontSize: RF(14),
    fontFamily: Fonts.regular,
    marginTop: RH(4),
  },
});