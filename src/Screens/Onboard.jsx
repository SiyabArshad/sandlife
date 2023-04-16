import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function Onboard({navigation}) {
  return (
    <View style={styles.mnonb}>
      <Image resizeMode='contain' style={{height:rp(35) ,width:"90%"}} source={require("../../assets/logo.png")}/>
        <Text style={styles.desc}>
        Save Lifes with us Keep Supporting us.
        </Text>
        <Pressable 
        onPress={()=>navigation.navigate("signup")} 
        style={[styles.centertext,styles.btn]}>
        <IonicIcon name="arrow-forward" size={30} color={colors.primary} />
        </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
mnonb:{
    flex:1,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:colors.primary
},
centertext:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
},
headtext:{
    fontSize:rp(6),
    fontFamily:fonts.Nextrabold
    ,color:colors.white
},
desc:{
    width:"70%",
    marginTop:rp(3),
    textAlign:"center",
    color:colors.white,
    fontFamily:fonts.Nlight,
    fontSize:rp(3)
},
btn:{
    backgroundColor:colors.white,
    marginTop:rp(3),
    height:60,
    width:60,
    borderRadius:30
}
})