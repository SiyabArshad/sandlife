import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList,SafeAreaView } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import MIcon from 'react-native-vector-icons/MaterialIcons';

import MessageCard from '../Components/MessageCard';
import BloodGroup from '../Components/BloodGroup';
import { useAuth } from '../context/Authentication';
import {doc,setDoc,getFirestore, addDoc, serverTimestamp,query,where,collection, getDocs, getDoc} from "firebase/firestore"
import app from '../configs/firebase';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
export default function Home() {
  // Set up a notification handler for background notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Add a listener for foreground notifications
Notifications.addNotificationReceivedListener(notification => {
  // Handle the notification in the foreground
});

  const db=getFirestore(app)
  const isFocused = useIsFocused();  
  const {logout,user}=useAuth()
  const[name,setname]=React.useState(user&&user?.name||"")
    const[address,setaddress]=React.useState(user&&user?.address||"") 
    const[phone,setphone]=React.useState(user&&user?.phone||"")
    const[bloodgroup,setbloodgroup]=React.useState(user&&user?.bloodgroup||"")
    const [isload,setisload]=React.useState(false)
    const [isload2,setisload2]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const [loading,setloading]=React.useState(false)
    const [requests,setrequests]=React.useState([])
  const[tab,settab]=React.useState("request")
  const handleform=async()=>{
    setisload(true)
    try{
            const token=await getcurrentuser()
            console.log(token)
            await addDoc(collection(db,"requests"),{
              name,phone,address,bloodgroup,userid:user?.userid,token
            })
            setError("Request Craeted Successfully")
            settype(true)

        }
    catch(e){
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


//notifications
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
if(token)
{
  await setDoc(doc(db, "users", user?.userid), {
    token
  },{merge:true});
  
}
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
const getdatarequests=async()=>{
  setloading(true)
  try{
    const q = query(collection(db, "requests"), where("userid", "!=", user?.userid));
    const querySnapshot = await getDocs(q);
    const availablereqs = [];
    querySnapshot.forEach(async(doc) => {
      const req = doc.data();
      req.id = doc.id;
      availablereqs.push(req);
    });
    setrequests(availablereqs);
  }
  catch(e){
    console.log(e)
  }
  finally{
    setloading(false)
  }
}
//ends notifications

//donate blood functions
const donateblood=async(id,token)=>{
  setisload(true)
  try{
    // const reqDocRef = doc(db, "requests", id);
    // await addDoc(collection(db,"donars"),{
    //     donorid:user?.userid,
    //     request:reqDocRef,
    // })
    let stringnotify=user?.name+" "+"Donates you Blood"
    await sendPushNotification(token,stringnotify)
  }
  catch(e){
    console.log(e)
  }
  finally{
      setisload(false)
  }
}
//end donate blood functions
const rejectdoanteblood=async(id,token)=>{
  setisload(true)
  try{
    const reqDocRef = doc(db, "requests", id);
    await addDoc(collection(db,"declineddonars"),{
        declineid:user?.userid,
        request:reqDocRef,
    })
    let stringnotify=user?.name+" "+"Decline Blood donation"
    await sendPushNotification(token,stringnotify)
    
  }
  catch(e){
    console.log(e)
  }
  finally{
      setisload(false)
  }
}
//reject donation

//end reject donation
const getcurrentuser = async () => {
  try {
    const user = await getDoc(doc(db, "users", user.userid));
    const info = user.data();
    return info?.token;
  } catch (error) {
    return "";
  }
};
React.useEffect(()=>{
  (()=>registerForPushNotificationsAsync())()
},[])
React.useEffect(()=>{
getdatarequests()
},[isFocused,tab])     
if(loading)
{
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={24} color={colors.primary}/>
        </View>
    )
}
  return (
    <SafeAreaView style={{flex:1}}>
           <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
           <View style={{paddingHorizontal:rp(2),display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
           <Text style={styles.text1}>
       {" "}Sang life
     </Text>
     <TouchableOpacity onPress={logout}>
     <MIcon name="logout" size={30} color={colors.primary} />
     </TouchableOpacity>
           </View>
     <View style={{paddingHorizontal:rp(3),paddingVertical:rp(2)}}>
      <View style={{marginBottom:rp(2),display:"flex",flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={()=>settab("request")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==="request"?2:0,borderRadius:tab==="request"?5:0,borderBottomColor:tab==="request"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>settab("createrequest")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==="createrequest"?2:0,borderBoRadius:tab==="createrequest"?5:0,borderBottomColor:tab==="createrequest"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>Create Request</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{height:"80%"}} showsVerticalScrollIndicator={false}>
       {
        tab==="request"?
        <>
        {
          requests&&requests?.length===0?<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>No Request Found</Text>
          </View>:
          requests&&requests.map((item,i)=>(
            <View key={i} style={{borderWidth:1,borderColor:colors.primary,borderRadius:5,paddingHorizontal:15,paddingVertical:10,marginBottom:10}}>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Name</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.name}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Address</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.address}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Phone</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.phone}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:17,marginRight:10,color:colors.textgrey2}}>Blood Group</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>{item?.bloodgroup}</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:rp(2)}}>
                  <TouchableOpacity onPress={()=>donateblood(item?.id)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                   {
                    isload?<ActivityIndicator size={24} color={colors.white}/>:  <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Donate</Text>
                   }
                  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>rejectdoanteblood(item?.id)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {
                    isload2?<ActivityIndicator size={24} color={colors.white}/>:  <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Decline</Text>
                   }
                  
                  </TouchableOpacity>
              </View>
        </View>
          ))
}
          </>
          :
          <>
         <View style={{marginTop:rp(1),marginHorizontal:rp(2)}}>
          <View style={{marginBottom:rp(1)}}>
             <TextInput
             maxLength={40} 
             placeholder='Name'
             value={name} onChangeText={(e)=>setname(e)}
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
             placeholder='Address'
             value={address} onChangeText={(e)=>setaddress(e)}
             style={{marginTop:rp(1),borderBottomWidth:1,borderBottomColor:colors.black,paddingHorizontal:rp(1),paddingVertical:rp(1.6),color:colors.black,fontFamily:fonts.Rregular}} />
          </View>
         
          <View style={{marginBottom:rp(1)}}>
            <Text style={{marginVertical:rp(1),fontFamily:fonts.Nsemibold,color:colors.black,fontSize:rp(2.5)}}>Blood Groups</Text>
            <BloodGroup bg={callblodgroup}/>
             </View>
             <View style={[{marginVertical:rp(5),zIndex:999},styles.centertext]}>
                <Pressable 
                disabled={issubmit} 
                onPress={handleform} style={{backgroundColor:colors.primary,paddingHorizontal:rp(8),paddingVertical:rp(1),borderRadius:rp(3)}}>
                   {
                        isload?
                        <ActivityIndicator size={30} color={colors.white}/>
                        :
                        <Text style={{color:colors.white,fontFamily:fonts.Nbold,fontSize:rp(3),textTransform:"uppercase"}}>Create</Text>
                    }
                </Pressable>
     </View>
          </View>
          </>
         }
         
        </ScrollView>    
     </View>
    </SafeAreaView>
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
    fontSize:rp(5),
    marginTop:rp(2)
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


async function sendPushNotification(expoPushToken,data) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'SangLife Notification',
    body: data,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

}
