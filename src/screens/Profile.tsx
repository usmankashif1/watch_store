import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../utlis/colors";
import Fonts from "../constants/fonts";
import { RF, RH, RS, RW } from "../utlis/responsive";

export default function Profile({ navigation }: any) {
  const [name, setName] = useState("Usman Kashif");
  const [email, setEmail] = useState("usman@gmail.com");
  const [phone, setPhone] = useState("+92 300 1234567");

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/icons/BackArrow.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          PROFILE
        </Text>

        <View style={{ width: RS(28) }} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>FULL NAME</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Full Name"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
        />
      </View>



      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter Email"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
        />
      </View>



      <View style={styles.inputContainer}>
        <Text style={styles.label}>PHONE NUMBER</Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Enter Phone Number"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingHorizontal: RW(20),
  },

  smallTitle: {
    color: Colors.primary,
    fontSize: RF(11),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(4),
    marginTop: RH(10),
  },


  title: {
    color: Colors.white,
    fontSize: RF(24),
    fontFamily: Fonts.bold,
    letterSpacing: RW(3),
  },

  inputContainer: {
    marginBottom: RH(24),
  },

  label: {
    color: Colors.primary,
    fontSize: RF(12),
    fontFamily: Fonts.semiBold,
    letterSpacing: RW(3),
    marginBottom: RH(10),
  },

  input: {
    height: RH(58),
    backgroundColor: "#263B63",
    borderRadius: RS(18),
    paddingHorizontal: RW(18),
    color: Colors.white,
    fontSize: RF(16),
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  saveButton: {
    marginTop: RH(30),
    height: RH(58),
    backgroundColor: Colors.primary,
    borderRadius: RS(18),
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: Colors.secondary,
    fontSize: RF(18),
    fontFamily: Fonts.bold,
    letterSpacing: RW(2),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RH(50),
  },

  backIcon: {
    width: RS(30),
    height: RF(30),
    resizeMode: "contain"
  },
});