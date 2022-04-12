import React, { useCallback, useState } from "react";
import{
    StyleSheet,Text,View,
    TouchableOpacity, ScrollView,
    Dimensions , Platform, RefreshControl
} from 'react-native'
import { Trans, useTranslation } from "react-i18next";
import i18n from "../Context/changelang";
import { I18nManager } from "react-native";
import { useNavigation } from '@react-navigation/native';


const OPTIONS = ['En','He'];
const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;


const LangPicker=(props)=>{    
    
    const {t,i18n}=useTranslation();
    const onPressItem=(option)=>{
        props.changeLangVisibility(false);
        props.setData(option);
        i18n.changeLanguage(option === 'En' ? 'En' : 'He')
        .then(()=>{
            I18nManager.swapLeftAndRightInRTL(i18n.language==='He');
        });
    }
    const option=OPTIONS.map((item,index)=>{
        return(
            <TouchableOpacity
            style={styles.option}
            key={index}
            onPress={()=> onPressItem(item)}
            >
                <Text style={styles.text}><Trans t={t}>{item}</Trans>
                </Text>
            </TouchableOpacity>
        )
    })
    return(
        <TouchableOpacity
        onPress={()=>props.changeLangVisibility(false)}
        style={i18n.language!=='En'? styles.containerEn : styles.containerHe}
        >

            <View style={[styles.lang,{width:50,height:70}]}>
                <ScrollView>
                    {option}
                </ScrollView>
            </View>

        </TouchableOpacity>
    )
}
const styles= StyleSheet.create({
    containerEn:{
        flex:1,
        alignItems:'flex-start',
        top:'10%',
        left:'8%',
        borderColor: "#e2e1df",
        opacity:0.9,
        ...Platform.select({
            ios:{},
            android:{},
            default:{width:'75%',top:'30%',left:'31%'},
            
        })
    },
    containerHe:{
        flex:1,
        alignItems:'flex-end',
        top:'8%',
        right:'8%',
        borderColor: "#e2e1df",
        opacity:0.9,
        ...Platform.select({
            ios:{},
            android:{},
            default:{width:'75%',top:'30%',},
            
        })
    },
    lang:{
        backgroundColor: 'white',
        marginBottom:HEIGHT/2,
        ...Platform.select({
            ios:{backgroundColor:'whitesmoke',},
            android:{backgroundColor:'whitesmoke',},
            default:{},   
        })
    },  
    option:{
        alignItems:'center',
        ...Platform.select({
            ios: {
            },
            android: {

            },
            default: {
                backgroundColor: 'white',
                },
          })
        },
    text:{
        fontSize:22,
        fontWeight:'normal',
        ...Platform.select({
            ios: {
            color:'grey',
            alignItems:'center',
            justifyContent:'center'
            },
            android: {
            color:'grey',
            alignItems:'center',
            justifyContent:'center'
            },
            default: {
              color:'black',
              
            },
          })
    },
})

export {LangPicker}