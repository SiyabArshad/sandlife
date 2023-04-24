import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import BloodGroup from '../Components/BloodGroup';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, serverTimestamp} from "firebase/firestore"
import app from '../configs/firebase';


export default function Signup({navigation}) {
    const db=getFirestore(app)
    const auth=getAuth(app)
    const[email,setemail]=React.useState("")
    const[password,setpassword]=React.useState("")
    const[name,setname]=React.useState("")
    const[id,setid]=React.useState("")
    const[address,setaddress]=React.useState("")
    const[age,setage]=React.useState("")  
    const[phone,setphone]=React.useState("")
    const[bloodgroup,setbloodgroup]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const handleform=async()=>{
        setisload(true)
        try{
            if(email.length>5&&password.length>5){
                const newuser = await createUserWithEmailAndPassword(auth, email, password);
                const newdoc = await setDoc(doc(db, "users", newuser.user.uid), {
                  userid: newuser.user.uid,
                  name: name,
                  email: email,
                  phone: phone,
                  address: address,
                  age: age,
                    personid:id,
                    bloodgroup:bloodgroup
                });
                setError("Registered Successfully")
                settype(true)
            }
            else
            {
                setError("Incomplete Credentials")
                settype(false)
           
            }
        }
        catch{
            setError("Try again later")
            settype(false)
           
        }
        finally{
            setisload(false)
            setissubmit(true)
           
        }
    }
    const callbacksubmit=()=>{
        setissubmit(false)
    }
    const callblodgroup=(state)=>{
        setbloodgroup(state)
    }

  return (
    <ScrollView style={styles.mnonb} showsVerticalScrollIndicator={false}>
     <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
     <View style={{display:"flex",flexDirection:"row",marginTop:rp(5),marginHorizontal:rp(2)}}>
        
     <Pressable onPress={()=>navigation.pop()} style={styles.btn}>
     <IonicIcon name="arrow-back" size={24} color={colors.white} />
     </Pressable>
     </View>
     <View style={{marginVertical:rp(5),marginHorizontal:rp(2)}}>
     <Text style={styles.text1}>
       {" "}Create {"\n"} Account :)
     </Text>
     </View>
     <View style={{marginTop:rp(1),marginHorizontal:rp(2)}}>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        maxLength={40} 
        placeholder='Full Name'
        value={name} onChangeText={(e)=>setname(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        placeholder='Email'
        value={email} onChangeText={(e)=>setemail(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        maxLength={15}
        keyboardType='number-pad'
        placeholder='Phone'
        value={phone} onChangeText={(e)=>setphone(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        placeholder='Age'
        keyboardType='number-pad'
        maxLength={2}
        value={age} onChangeText={(e)=>setage(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        placeholder='Address'
        value={address} onChangeText={(e)=>setaddress(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        maxLength={50}
        placeholder='Your ID'
        value={id} onChangeText={(e)=>setid(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
        <TextInput
        secureTextEntry
        placeholder='Password'
        value={password} onChangeText={(e)=>setpassword(e)}
        style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
     </View>
     <View style={{marginBottom:rp(1)}}>
       <Text style={{marginVertical:rp(1),fontFamily:fonts.Nsemibold,color:colors.black,fontSize:rp(2.5)}}>Blood Groups</Text>
       <BloodGroup bg={callblodgroup}/>
        </View>
     </View>
     <View style={[{marginVertical:rp(5),zIndex:999},styles.centertext]}>
                <Pressable 
                disabled={issubmit} 
                onPress={handleform} style={{backgroundColor:colors.primary,paddingHorizontal:rp(8),paddingVertical:rp(1),borderRadius:rp(3)}}>
                   {
                        isload?
                        <ActivityIndicator size={30} color={colors.white}/>
                        :
                        <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(3),textTransform:"uppercase"}}>Register</Text>
                    }
                </Pressable>
                <Pressable onPress={()=>navigation.navigate("login")} style={{marginTop:rp(3)}}>
                    <Text style={{fontFamily:fonts.Nregular,fontSize:rp(2.5),color:colors.textgrey}}>
                    Already Have an Account?
                    </Text>
                </Pressable>
     </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    mnonb:{
        flex:1,
        backgroundColor:colors.white
    },
    centertext:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
    btn:{
        backgroundColor:colors.primary,
        paddingHorizontal:5,
        paddingVertical:4,
        borderRadius:5
    },
    text1:{
        color:colors.primary,
        fontFamily:fonts.Nextrabold,
        fontSize:rp(5)
    },
    text2:{
        color:colors.textgrey,
        fontFamily:fonts.Nmedium,
        fontSize:rp(2.5)
    },
    lable:{
        fontFamily:fonts.Nregular,
        fontSize:rp(3.5),
        color:colors.textgrey
    }
})