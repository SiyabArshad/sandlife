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
import { useIsFocused } from '@react-navigation/native';
export default function Home() {
    const db=getFirestore(app)
    const isFocused = useIsFocused();  
    const {logout,user}=useAuth()
    const[name,setname]=React.useState(user&&user?.name||"")
    const[address,setaddress]=React.useState(user&&user?.address||"") 
    const[phone,setphone]=React.useState(user&&user?.phone||"")
    const[bloodgroup,setbloodgroup]=React.useState(user&&user?.bloodgroup||"")
    const [isload,setisload]=React.useState(false)
    const [isload2,setisload2]=React.useState(false)
    const [activebtnid,setactivebtnid]=React.useState(-1)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
    const [loading,setloading]=React.useState(false)
    const [requests,setrequests]=React.useState([])
    const [notifications,setnotifications]=React.useState([])
    const[tab,settab]=React.useState("request")
    const handleform=async()=>{
      setisload(true)
      try{
            const userDocref=doc(db,"users",user?.userid)
            await addDoc(collection(db,"requests"),{
              name,phone,address,bloodgroup,user:userDocref
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


//ends notifications

//donate blood functions
const donateblood=async(id,userid,index,bg)=>{
  setisload(true)
  setactivebtnid(index)
  try{
    const reqDocRef = doc(db, "requests", id);
    await addDoc(collection(db,"notifications"),{
        user:user?.userid,
        requesterid:userid,
        name:user?.name,
        phone:user?.phone,
        request:id,
        status:true,
        bloodgroup:bg
    })
  }
  catch(e){
    console.log(e)
  }
  finally{
      setisload(false)
  }
}


//end donate blood functions
const rejectdoanteblood=async(id,userid,index,bg)=>{
  setisload2(true)
  setactivebtnid(index)
  try{
    const reqDocRef = doc(db, "requests", id);
    await addDoc(collection(db,"notifications"),{
        user:user?.userid,
        requesterid:userid,
        name:user?.name,
        phone:user?.phone,
        request:id,
        status:false,
        bloodgroup:bg
    })
  }
  catch(e){
    console.log(e)
  }
  finally{
      setisload2(false)
  }
}
const getdatarequests = async () => {
  setloading(true);
  try {
    const docref = doc(db, "users", user?.userid);
    const q = query(collection(db, "requests"), where("user", "!=", docref));
    const querySnapshot = await getDocs(q);
    const availablereqs = [];

    for (const doc of querySnapshot.docs) {
      const req = doc.data();
      req.id = doc.id;
      availablereqs.push(req);     
    }

    setrequests(availablereqs);
  } catch (e) {
    console.log("error in getting request", e);
  } finally {
    setloading(false);
  }
};

const getdatanotifications = async () => {
  setloading(true);
  try {

    const q = query(collection(db, "notifications")
    , where("requesterid", "==",doc(db,"users",user?.userid))
    );
    const querySnapshot = await getDocs(q);
    const availablereqs = [];

    for (const doc of querySnapshot.docs) {
      const req = doc.data();
      req.id = doc.id;
      availablereqs.push(req);
    }

    setnotifications(availablereqs);
  } catch (e) {
    console.log("error in getting notifications", e);
  } finally {
    setloading(false);
  }
};
React.useEffect(() => {
  getdatarequests();
  getdatanotifications()
}, [isFocused, tab]);
if(loading)
{
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={24} color={colors.primary}/>
        </View>
    )
}
  return (
    <SafeAreaView style={{flex:1,paddingTop:20}}>
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
        <TouchableOpacity onPress={()=>settab("request")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",
        marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==="request"?2:0,
        borderBottomColor:tab==="request"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular}}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>settab("createrequest")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",paddingHorizontal:10,
        paddingVertical:5,borderBottomWidth:tab==="createrequest"?2:0,borderBottomColor:tab==="createrequest"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular}}>Create Request</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>settab("notifications")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",paddingHorizontal:10,
        paddingVertical:5,borderBottomWidth:tab==="notifications"?2:0,borderBottomColor:tab==="notifications"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular}}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{height:"80%"}} showsVerticalScrollIndicator={false}>
       {
        tab==="request"&&
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
                  <TouchableOpacity onPress={()=>donateblood(item?.id,item?.user,i,item?.bloodgroup)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                   {
                    isload&&activebtnid===i?<ActivityIndicator size={24} color={colors.white}/>:  <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Donate</Text>
                   }
                  
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>rejectdoanteblood(item?.id,item?.user,i,item?.bloodgroup)} style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                  {
                    isload2&&activebtnid===i?<ActivityIndicator size={24} color={colors.white}/>:  <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Decline</Text>
                   }
                  
                  </TouchableOpacity>
              </View>
        </View>
          ))
}
          </>
         }
         {
          tab==="createrequest"&&

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
         {
          tab==="notifications"&&
          <View style={{flex:1,flexDirection:"column"}}>
                {
                  notifications&&notifications?.map((item,i)=>(
                    <View key={i} style={{backgroundColor:colors.white,borderRadius:5,marginBottom:5,paddingHorizontal:20,paddingVertical:10}}>
                      <Text style={{fontFamily:fonts.Nblack,marginVertical:5}}>{item?.name}</Text>
                      <Text style={{marginBottom:5}}>{`Just ${item?.status?"Accepted":"Declined"} your Request of Blood Donation ${item?.bloodgroup}`}</Text>
                      <Text style={{marginBottom:5,fontFamily:fonts.Nblack}}>{item?.phone}</Text>
                      </View>
                  ))
                }
          </View>
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

