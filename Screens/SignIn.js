import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Modal,Platform,Image,
Dimensions, ImageBackground,ScrollView,KeyboardAvoidingView} from 'react-native';
import {LangPicker} from '../components/LangPicker';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { Trans,useTranslation, initReactI18next } from "react-i18next";
import i18n from '../Context/changelang';
import { useRoute } from '@react-navigation/native';
import { changeLanguage } from 'i18next';
import axios from 'axios';
import { API } from '../Server/config';
import { I18nManager } from 'react-native';

const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;


export default function SignIn() {
  I18nManager.forceRTL(false);
  const {t,i18n} = useTranslation();
  
  const navigation=useNavigation();
  const route =useRoute();


  const[Email,setEmail]=useState('');
  const[Password,setPassword]=useState('');


  const currentlanguage=(i18n.language);
  const [chooseData,setchooseData]=useState(currentlanguage === 'En' ? 'En' : 'He');
  const [isLangVisible,setisLangVisible]= useState(false);

  const [disable, setDisable]=useState(false);

  const changeLangVisibility=(bool)=>{
    setisLangVisible(bool)
  };
  const setData=(option)=>{
    setchooseData(option);
    if (Platform.OS==='web'){
    navigation.replace('SignIn')
    }
  };
  const onSignIn=()=>{
    if(!disable){
    setDisable(true);
    let config = {
      headers: {"Access-Control-Allow-Origin":true,
    }
  }
  let LowerEmail = Email.toLowerCase();
    axios.post(`${API}/signin`,{
      email:LowerEmail,
      password:Password
    },config)
    .then(function (response) {
      console.log(response);
      if(response.data==='Success'){
        setDisable(false);
      navigation.navigate("WebHome")
      }
      else{
      if(currentlanguage=='En'){
        alert('Invalid Password!')
        setDisable(false);
        }
        else{
        alert('סיסמה לא נכונה!')
        setDisable(false);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
      if(currentlanguage=='En'){
      alert('Invalid Email or internet error!')
      setDisable(false);
      }
      else{
      alert('איימל לא נכון או בעיית אינטרנט!')
      setDisable(false);
      }
    });
  }
        return;
  };
  const onSignUp=()=>{
    navigation.navigate("SignUp")
  };

  return (
      <SafeAreaView style={{flex:1,backgroundColor: '#edf1f2'}}>
      <ScrollView>
      <KeyboardAvoidingView behavior='' style={{flex:1}}>
      <View style={styles.container}>
      <Text style={[styles.sectionTitle,{alignSelf:Platform.OS==='web'?'center':i18n.language==='En'?'flex-start':'flex-end'}]}>{t('Sign In')}</Text>
      <TouchableOpacity onPress={()=>changeLangVisibility(true)}
      style={[styles.touchableOpacity,{alignSelf:i18n.language==='En'?'flex-end':'flex-start'}]}>
        <View style={[styles.square]}>
        <Text style={[styles.text]}><Trans t={t}>{i18n.language}</Trans></Text><Icon name="chevron-down" size={19} color="black" style={styles.icon} />
        </View>
        </TouchableOpacity>
        <Modal transparent={true}
        animationType='fade'
        visible= {isLangVisible}
        nRequestClose={()=>changeLangVisibility(false)
        }
      >
        <LangPicker
          changeLangVisibility={changeLangVisibility}
          setData={setData}
        />
    </Modal>
    <ImageBackground source={require('../assets/profilepic.png')} style={{ width: 130, height: 130,
    alignSelf:'center',position: 'absolute',marginTop:115,zIndex:1, ...Platform.select({
      ios:{marginTop:150},
      android:{marginTop:150},
      default:{},
    })}}>
    <Image source={require('../assets/bluePlus.jpg')} style={{ width: 32, height: 32,marginLeft:96,marginTop:100}}></Image>
    </ImageBackground>
    <View style={styles.whiteb}>
      <View style={styles.inputContainer}>
      <Text style={{opacity:Email !=="" ? 1.0 : 0.0 ,width:'77%',color:'dodgerblue',fontWeight:'bold',fontSize:14,
      textAlign:i18n.language==='En'?'left':'right'}}>
       {t('Email')}</Text>
      <CustomInput value={Email} setValue={setEmail} placeholder={t('Email')} />
      <Text style={{opacity:Password !=="" ? 1.0 : 0.0 ,marginTop:25,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('Password')}</Text>
      <CustomInput value={Password} setValue={setPassword} placeholder={t('Password')} hidden='true'/>
      <View style={{marginTop:20}}></View>
      <CustomButton disable={disable} text={t('Sign In')} onPress={onSignIn}></CustomButton>
      </View>
      <Text style={styles.bluetext}>{t('forg')}</Text>
    </View>
    </View>
    <View style={{direction:i18n.language ==='He'?'rtl': 'ltr',flexDirection:'row',justifyContent:'center',alignSelf:'center',
    ...Platform.select({
      ios:{position:'absolute',bottom:'30%'},
      android:{position:'absolute',bottom:'20%'},
      default:{marginTop:30},
    })
    }}> 
      <Text style={{fontSize:18,fontWeight:'500',fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif'}}>{t('DontAcc')}</Text>
      <Text onPress={onSignUp} style={{fontSize:18,color:'dodgerblue',fontWeight:'500',fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif'}}>{t('Sign Up')}</Text>
    </View>
    <Text style={{marginBottom:10,alignSelf:'center',textAlign:'center',textDecorationLine: 'underline',fontWeight:'500',fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
    ...Platform.select({
      ios:{position:'absolute',bottom:'0%'},
      android:{position:'absolute',bottom:'0%'},
      default:{marginTop:150},   
    })
    }}>{t('terms')}</Text>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: 'contain',
    flex:1,
    ...Platform.select({
      ios:{
      },
      android:{
      },
      default:{
        marginTop:HEIGHT/10,
        width:WIDTH/3+50,
        alignSelf:'center',
      },
    })
  },
  inputContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios:{
        marginTop:'20%',
      },
      android:{
        marginTop:'15%',
      },
      default:{
      },
    })
  },
  sectionTitle: {
    height: 50,
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
    ...Platform.select({
    ios:{
      marginLeft:20,
      marginRight:20,
      marginTop: 80,
    },
    android:{
      marginLeft:20,
      marginRight:20,
      marginTop: 80,
    },
    default: {
    },
  })
  },
  icon:{
    alignItems:'center',
    marginTop:2,
      ...Platform.select({
      ios: {
        color:'grey',
        fontSize:25,
        marginLeft:5,
            },
      android: {
        color:'grey',
        fontSize:25,
        marginLeft:5,
            },
      default: {
        color:'black',
        marginLeft:16,
      },
    })
      },
  text:{
    fontSize:14,
    fontWeight:'500',
    ...Platform.select({
      ios: {
      fontSize:18,
      color:'grey',
      },
      android: {
      fontSize:18,
      color:'grey',
      },
      default: {
        color:'black',
        marginLeft:10,
      },
    })
  },
  square:{
    width: 70,
    height: 40,
    flexDirection:'row',
    alignItems:'center',
    ...Platform.select({
      ios: {
        backgroundColor:'#edf1f2',
        opacity:0.6,
        marginLeft:20,
        marginRight:10,
            },
      android: {
        backgroundColor:'#edf1f2',
        opacity:0.6,
        marginLeft:20,
        marginRight:10,
            },
      default: {
        marginTop:0,
        backgroundColor:'white',
        borderColor: "#e2e1df",
        borderWidth:1.6,
        opacity:0.9
      },
    })
    },
  touchableOpacity:{
    alignItems:'center',
    ...Platform.select({
      ios: {
        position:'absolute',
        marginTop:40,
            },
      android: {
        position:'absolute',
        marginTop:40,
            },
      default: {
        height:40,
        width:70,
        marginTop:80
      },
    })
    },
    whiteb:{
      backgroundColor: 'white',
      ...Platform.select({
        ios: {
          marginTop:100,
          flex:1,
          borderRadius:15,
          paddingBottom:'85%'
              },
        android: {
          marginTop:'20%',
          flex:1,
          borderRadius:15,
          paddingBottom:'70%',
              },
        default: {
          marginTop:10,
          flex:1,
          paddingVertical:55,
          borderColor: "#e2e1df",
          borderWidth:1,
        },
      }) 
    },
    bluetext:{
      textDecorationLine: 'underline',
      color:'dodgerblue',
      ...Platform.select({
        ios:{width:'52%',textAlign:'center',bottom:35},
        android:{width:'52%',marginTop:-35,textAlign:'center'},
        default:{position:'absolute',bottom:'5%',alignSelf:'center',fontWeight:'500'},
      }),
    }
});
