import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';

export default function Aboutus() {
  return (
    <View style={styles.mnonb}>
     <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:rp(5)}}>
        <Pressable style={styles.btn}>
        <IonicIcon name="arrow-back" size={24} color={colors.white} />
        </Pressable>
        <Text style={{fontSize:rp(2.8),fontFamily:fonts.Nbold}}>About us</Text>
        <Text></Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>    
    <View style={{marginVertical:rp(3)}}>
        <Text style={{fontSize:rp(3),color:colors.black,fontFamily:fonts.Nextrabold}}>Information</Text>
        <Text style={{marginTop:rp(2),fontFamily:fonts.Nregular,textAlign:"justify",fontSize:rp(2.1)}}>
            {
                "JustGolf is a mobile application that provides a platform for golf enthusiasts to interact with each other and improve their golf skills. The app is designed to create a community of golfers who can connect with each other and learn from professionals by taking various golf courses offered within the app."
            }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
                "With JustGolf, users have access to a wide range of courses covering all aspects of golf, from basic techniques to advanced strategies. These courses are developed by professional golfers and trainers and are designed to help users improve their skills. Users can take these courses at their own pace and track their progress through the app."
            }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
                "The app also allows users to interact with each other through a chat feature, enabling them to discuss golf techniques and share tips and advice. Users can also participate in forums and online groups where they can connect with other golfers who share similar interests and goals."
            }
            {
                "\n"
            }
                        {
                "\n"
            }
            {
                "Overall, JustGolf is an interactive and engaging app that provides a unique experience for golf enthusiasts. Whether you are a beginner or an experienced player, the app is designed to help you improve your skills and connect with other golfers, making it the perfect platform for anyone looking to take their golf game to the next level."
            }

        </Text>
    </View>
    </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white,
       paddingHorizontal:rp(3)
    },
    centertext:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        backgroundColor:colors.black,
        paddingHorizontal:5,
        paddingVertical:4,
        borderRadius:5
    },
})