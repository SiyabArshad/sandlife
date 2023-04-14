import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';

export default function Onboard({navigation}) {
  return (
    <View style={styles.mnonb}>
      <Image resizeMode='contain' style={{height:rp(35) ,width:"90%"}} source={require("../../assets/images/icons.png")}/>
        {/* <Text style={styles.headtext}>JUSTGOLF!</Text> */}
        <Text style={styles.desc}>
        Connect with local golfers, increase your skills, and enjoy your experience with the JustGolf community!
        </Text>
        <Pressable onPress={()=>navigation.navigate("login")} style={[styles.centertext,styles.btn]}>
        <IonicIcon name="arrow-forward" size={30} color={colors.white} />
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
    backgroundColor:colors.white
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
    marginTop:rp(1),
    textAlign:"center",
    color:colors.green,
    fontFamily:fonts.Nlight,
    fontSize:rp(2.3)
},
btn:{
    backgroundColor:colors.green,
    marginTop:rp(3),
    height:60,
    width:60,
    borderRadius:30
}
})