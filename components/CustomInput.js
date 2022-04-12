import react from 'react'
import{View,Text,TextInput,StyleSheet,Platform,TouchableOpacity, SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react';
import i18n from '../Context/changelang';
import { Trans,useTranslation, initReactI18next } from "react-i18next"; 

const CustomInput=({value,setValue,placeholder,hidden,direct})=>{
    const currentlanguage=i18n.language;
    if(!direct){
    direct='right';
    };
    const[show,setShow]=useState(false);
    const[visible,setVisible]=useState(false);
    const[hidePassword,setHidePassword]=useState(hidden);
    return(
        <SafeAreaView style={styles.container}>
            <TextInput 
            placeholder={placeholder} 
            style={[styles.input,{textAlign:i18n.language === 'En' ? 'left':direct}]}
            value={value}
            onChangeText={setValue}
            secureTextEntry={visible}
            />
            {hidden ? <TouchableOpacity styles={[styles.btnEye]}
                onPress={()=>{
                setVisible(!visible)
                setShow(!show)
                }
            }>
                <Icon  name={show===false?'visibility':'visibility-off'}
                 size={21} style={[styles.icon,{alignSelf:i18n.language === 'En' ? 'flex-end':'flex-start'}]}></Icon>
                </TouchableOpacity> : null}
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container:{
        width:'79%',
    },
    input:{
        fontSize:14,
        fontWeight:'500',
        fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
        marginTop:Platform.OS === 'ios' || 'android' ? 5 : 0,
        lineHeight:Platform.OS === 'ios' || 'android' ? 20 : 40,
        height:Platform.OS === 'ios' || 'android' ? 40 : 42,
        paddingHorizontal:5,
        borderBottomWidth:1.6,
        borderBottomColor:'#B0B8BF'
    },
    btnEye:{
        position:'absolute',
        color:'black',
        },
    icon:{
        position:'absolute',
        bottom:7,
        },
})
export default CustomInput