import { View, Text,Modal,TouchableOpacity,Pressable,Image,StyleSheet,ImageBackground,Dimensions,Platform,Linking,ActivityIndicator,TextInput,ScrollView,FlatList,SafeAreaView } from 'react-native'
import React from 'react'
import fonts from "../configs/fonts"
import colors from '../configs/colors'
import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MessageCard from '../Components/MessageCard';
import BloodGroup from '../Components/BloodGroup';
export default function Home() {
  const[name,setname]=React.useState("")
    const[address,setaddress]=React.useState("") 
    const[phone,setphone]=React.useState("")
    const[bloodgroup,setbloodgroup]=React.useState("")
    const [isload,setisload]=React.useState(false)
    const [issubmit,setissubmit]=React.useState(false)
    const [Error,setError]=React.useState('')
    const [type,settype]=React.useState(false)
  const[tab,settab]=React.useState("request")
  const handleform=async()=>{
    setisload(true)
    setissubmit(true)
    try{
        if(name.length>3&&phone.length>=9&&address.length>10&&bloodgroup.length>1){

            setError("Request Craeted Successfully")
            setisload(false)
            settype(true)
        }
        else
        {
            setError("Incomplete Details")
            setisload(false)
            settype(false)
       
        }
    }
    catch{
        setError("Try again later")
        setisload(false)
        settype(false)
       
    }
}
const callbacksubmit=()=>{
    setissubmit(false)
}
  const callblodgroup=(state)=>{
    setbloodgroup(state)
}
  return (
    <SafeAreaView style={{flex:1}}>
           <MessageCard type={type} message={Error} show={issubmit} callshow={callbacksubmit}/>
           <View style={{paddingHorizontal:rp(3)}}>
           <Text style={styles.text1}>
       {" "}Sang life
     </Text>
           </View>
     <View style={{paddingHorizontal:rp(3),paddingVertical:rp(2)}}>
      <View style={{marginBottom:rp(2),display:"flex",flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={()=>settab("request")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",marginRight:10,paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==="request"?2:0,borderRadius:tab==="request"?5:0,borderBottomColor:tab==="request"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>settab("createrequest")} style={{display:"flex",flexDirection:'row',justifyContent:"center",alignItems:"center",paddingHorizontal:10,paddingVertical:5,borderBottomWidth:tab==="createrequest"?2:0,borderRadius:tab==="createrequest"?5:0,borderBottomColor:tab==="createrequest"&&colors.primary}}>
          <Text style={{fontFamily:fonts.Nregular,fontSize:18}}>Create Request</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
       {
        tab==="request"?
        <>
        {
          [1,2,3,4,5,6,7,8].map((item,i)=>(
            <View key={i} style={{borderWidth:1,borderColor:colors.primary,borderRadius:5,paddingHorizontal:15,paddingVertical:10,marginBottom:10}}>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Name</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>Ahmed PPIK</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Address</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>Bharia Town Lahore</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:16,marginRight:10,color:colors.textgrey2}}>Phone</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>+92315678902</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:5}}>
                <Text style={{fontFamily:fonts.Nsemibold,fontSize:17,marginRight:10,color:colors.textgrey2}}>Blood Group</Text>
                <Text style={{fontFamily:fonts.Nregular,fontSize:14}}>AB+</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:rp(2)}}>
                  <TouchableOpacity style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Donate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{width:"49%",backgroundColor:colors.primary,paddingVertical:rp(1),borderRadius:5,display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:colors.white,fontFamily:fonts.Nblack}}>Decline</Text>
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