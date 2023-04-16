import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../configs/colors'
import fonts from '../configs/fonts'

import { RFPercentage as rp, RFValue as rf } from "react-native-responsive-fontsize";
export default function BloodGroup({bg}) {
    const [isActive,setisActive]=React.useState(-1)
  return (
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",flexWrap:"wrap",marginTop:rp(1)}}>
    {
        ["O+","B+","AB+","A+","A-","B-","AB-","O-"].map((item,i)=>{
            return( 
    <TouchableOpacity key={i} onPress={()=>{
        setisActive(i)
        bg(item)
    }} style={{borderWidth:isActive===i?0:1,borderColor:isActive===i?colors.white:colors.primary,backgroundColor:isActive===i?colors.primary:colors.white,display:"flex",justifyContent:"center",alignItems:"center",paddingHorizontal:14,paddingVertical:4,marginRight:8,marginBottom:8,borderRadius:5}}>
      <Text style={{fontFamily:fonts.Nregular,fontSize:16,color:isActive===i?colors.white:colors.primary}}>{item}</Text>
    </TouchableOpacity>
       )
    })
}
</View>
  )
}