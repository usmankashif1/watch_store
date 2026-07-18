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

const cartItems = [
  {
    id: "1",
    brand: "REVUE THOMMEN",
    name: "Heritage Automatic",
    image: require("../assets/images/watches/Thommen_Watches.png"),
    price: 520,
    quantity: 1,
  },
  {
    id: "2",
    brand: "BREMONT",
    name: "MB Savanna",
    image: require("../assets/images/watches/Bremont.png"),
    price: 690,
    quantity: 2,
  },
  {
    id: "3",
    brand: "CAT",
    name: "Classic Black",
    image: require("../assets/images/watches/CAT_Watches.png"),
    price: 340,
    quantity: 1,
  },
];

export default function Cart({ navigation }: any) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const tax = 22;
  const total = subtotal + tax;

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.deleteBtn}>
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
        <Text style={styles.brand}>{item.brand}</Text>

        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity style={styles.qtyBtn}>
            <Text style={styles.qtySymbol}>−</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.quantity}</Text>

          <TouchableOpacity style={styles.qtyBtn}>
            <Text style={styles.qtySymbol}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );

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

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={`$${subtotal}`} />
            <SummaryRow label="Shipping" value="Free" />
            <SummaryRow label="Tax" value={`$${tax}`} />

            <View style={styles.divider} />

            <SummaryRow
              label="Total"
              value={`$${total}`}
              bold
            />

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutText}>
                PROCEED TO CHECKOUT
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
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
          bold && { color: Colors.white },
        ]}
      >
        {label}
      </Text>

      <Text
        style={[
          styles.summaryValue,
          bold && { color: Colors.primary },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:Colors.secondary,
paddingHorizontal:RW(20),
},

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:RH(25),
},

back:{
width:RS(30),
height:RS(30),
resizeMode:"contain",
},

smallTitle:{
color:Colors.primary,
fontSize:RF(10),
fontFamily:Fonts.semiBold,
letterSpacing:RW(3),
textAlign:"center",
},

title:{
color:Colors.white,
fontSize:RF(24),
fontFamily:Fonts.bold,
letterSpacing:RW(2),
},

card:{
backgroundColor:"#14264D",
borderRadius:RS(22),
padding:RS(18),
marginBottom:RH(20),
flexDirection:"row",
},

deleteBtn:{
position:"absolute",
right:RW(15),
top:RH(15),
zIndex:2,
},

deleteIcon:{
width:RS(22),
height:RS(22),
resizeMode:"contain",
tintColor:"#FF6B6B",
},

watchImage:{
width:RW(95),
height:RH(120),
},

info:{
flex:1,
marginLeft:RW(16),
justifyContent:"space-between",
},

brand:{
color:Colors.primary,
fontSize:RF(10),
fontFamily:Fonts.semiBold,
letterSpacing:RW(2),
},

name:{
color:Colors.white,
fontSize:RF(18),
fontFamily:Fonts.medium,
marginTop:RH(4),
},

quantityRow:{
flexDirection:"row",
alignItems:"center",
marginTop:RH(12),
},

qtyBtn:{
width:RS(28),
height:RS(28),
borderRadius:RS(14),
backgroundColor:Colors.primary,
justifyContent:"center",
alignItems:"center",
},

qtySymbol:{
color:Colors.secondary,
fontSize:RF(18),
fontFamily:Fonts.bold,
},

qty:{
color:Colors.white,
fontSize:RF(16),
marginHorizontal:RW(15),
fontFamily:Fonts.medium,
},

price:{
color:Colors.primary,
fontSize:RF(22),
fontFamily:Fonts.bold,
marginTop:RH(12),
},

summary:{
backgroundColor:"#14264D",
borderRadius:RS(22),
padding:RS(20),
marginBottom:RH(30),
},

summaryRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:RH(14),
},

summaryLabel:{
color:"#AEBBD6",
fontSize:RF(15),
fontFamily:Fonts.regular,
},

summaryValue:{
color:Colors.white,
fontSize:RF(16),
fontFamily:Fonts.medium,
},

divider:{
height:1,
backgroundColor:"rgba(255,255,255,0.08)",
marginVertical:RH(12),
},

checkoutBtn:{
height:RH(60),
borderRadius:RS(16),
backgroundColor:Colors.primary,
justifyContent:"center",
alignItems:"center",
marginTop:RH(22),
},

checkoutText:{
color:Colors.secondary,
fontSize:RF(16),
fontFamily:Fonts.bold,
letterSpacing:RW(2),
},
});

