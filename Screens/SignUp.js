import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Modal,Platform,Image,
Dimensions, ImageBackground,ScrollView,KeyboardAvoidingView,Alert} from 'react-native';
import {LangPicker} from '../components/LangPicker';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from '../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import i18n from '../Context/changelang';
import { I18nManager } from 'react-native';
import { Trans,useTranslation, initReactI18next } from "react-i18next";
import axios from 'axios';
import {API} from '../config';

const isValidEmail=(value)=>{
  const regx =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return regx.test(value)
}
const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;

export default function SignUp() {
  I18nManager.forceRTL(false);
  const {t,i18n} = useTranslation();

  const [disable, setDisable]=useState(false);
  const navigation=useNavigation();
    const[Email,setEmail]=useState('');
    const[FirstName,setFirstName]=useState('');
    const[LastName,setLastName]=useState('');
    const[Password,setPassword]=useState('');
    const[RePassword,setRePassword]=useState('');

    const currentlanguage=(i18n.language);

    const [chooseData,setchooseData]=useState(currentlanguage === 'En' ? 'En' : 'He');
    const [isLangVisible,setisLangVisible]= useState(false);
  
    const changeLangVisibility=(bool)=>{
      setisLangVisible(bool)
    }
    const setData=(option)=>{
      setchooseData(option)
      if (Platform.OS==='web'){
        navigation.replace('SignIn')
        }
    }
    const isValidField=()=>{
      if(Email==''||FirstName==''||LastName==''||Password==''||RePassword==''){
        return false;
      }
      return true;
    };
    const isValidForm=()=>{
      if(!isValidField()){
        if(currentlanguage=='En'){
          alert('Require All Fields!')
          }
          else{
            alert('דרוש למלא הכל!')
          }
        return false
      }
      if(!isValidEmail(Email)){
        if(currentlanguage=='En'){
          alert('Email is invalid!')
          }
          else{
            alert('איימל לא תקין!')
          }
        return false
      }
      if(Password.length<6){
        if(currentlanguage=='En'){
        alert('Password is too short!')
          }
          else{
            alert('סיסמה קצרה מידיי!')
          }
        return false
      }
      if(Password!==RePassword){
        if(currentlanguage=='En'){
        alert('Passwords are not the same!')
          }
          else{
            alert('הסיסמאות לא תואמות!')
          }
        return false
      }
      return true;
    };
    const onSignIn=()=>{
      navigation.goBack();
    };
     const onSignUp=()=>{
      if(!disable){
      setDisable(true);
      if(isValidForm()){
        let config = {
          headers: {"Access-Control-Allow-Origin":true,
        }
      }
        let LowerEmail = Email.toLowerCase();
        axios.post(`${API}/signup`,{
          fname: FirstName,
          lname: LastName,
          email:LowerEmail,
          password:Password
        },config)
        .then(function (response) {
          console.log(response);
          navigation.navigate('SignIn');
          setDisable(false);
        })
        .catch(function (error) {
          if(currentlanguage=='En'){
            alert('Something went wrong try again!')
              }
              else{
                alert('משהו קרה נסה שוב!')
              }
          setDisable(false);
        });
      }
      else{
        setDisable(false);
      }
    }
      return;
    }
  
    return (
        <SafeAreaView style={{flex:1,backgroundColor: '#edf1f2'}}>
        <StatusBar style="auto" />
        <ScrollView>
        <KeyboardAvoidingView behavior='' style={{flex:1}}>
        <View style={styles.container}>
        <Text style={[styles.sectionTitle,{alignSelf:Platform.OS==='web'?'center':i18n.language==='En'?'flex-start':'flex-end'}]}>{t('Sign Up')}</Text>
        <TouchableOpacity  onPress={()=>changeLangVisibility(true)} 
        style={[styles.touchableOpacity,{alignSelf:i18n.language==='En'?'flex-end':'flex-start'}]}>
        <View style={styles.square}>
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
    alignSelf:'center',position: 'absolute',marginTop:125,zIndex:1, ...Platform.select({
      ios:{marginTop:160},
      android:{marginTop:150},
      default:{},
    })}}>
    <Image source={require('../assets/bluePlus.jpg')} style={{ width: 32, height: 32,marginLeft:96,marginTop:100}}></Image>
    </ImageBackground>
    <View style={styles.whiteb}>
    <View style={styles.inputContainer}>
    <Text style={{width:'77%',color:'black',fontWeight:'500',fontSize:18,fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
    textAlign:i18n.language==='En'?'left':'right',
    ...Platform.select({
      ios:{marginTop:20},
      android:{marginTop:20},
      default:{marginTop:80},
    })}}>{t('Personal Details')}</Text>
    <View style={{marginTop:30}}></View>
    <Text style={{opacity:FirstName !=="" ? 1.0 : 0.0 ,marginTop:10,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('First Name')}</Text>
    <CustomInput value={FirstName} setValue={setFirstName} placeholder={t('First Name')} />
    <View style={{marginTop:20}}></View>
    <Text style={{opacity:LastName !=="" ? 1.0 : 0.0 ,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('Last Name')}</Text>
    <CustomInput value={LastName} setValue={setLastName} placeholder={t('Last Name')}  />
    <View style={{marginTop:20}}></View>
    <Text style={{opacity:Email !=="" ? 1.0 : 0.0 ,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('Email')}</Text>
    <CustomInput value={Email} setValue={setEmail} placeholder={t('Email')} />
    <Text style={{width:'77%',color:'black',fontWeight:'500',fontSize:18,fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif'
    ,marginTop:60,textAlign:i18n.language==='En'?'left':'right'}}>{t('Password')}</Text>
    <View style={{marginTop:20}}></View>
    <Text style={{opacity:Password !=="" ? 1.0 : 0.0 ,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('Password')}</Text>
    <CustomInput value={Password} setValue={setPassword} placeholder={t('Password')} hidden='true' />
    <View style={{marginTop:20}}></View>
    <Text style={{opacity:RePassword !=="" ? 1.0 : 0.0 ,marginLeft:5,width:'78%',color:'dodgerblue',fontWeight:'bold',fontSize:14
       ,textAlign:i18n.language==='En'?'left':'right'}}>{t('Retype')}</Text>
    <CustomInput value={RePassword} setValue={setRePassword} placeholder={t('Retype')} hidden='true' />
    </View>
    <View style={{...Platform.select({
      ios:{width:'100%',height:'100%',alignSelf:'flex-start',right:80,top:25},
      android:{width:'100%',height:'100%',alignSelf:'flex-start',right:80,top:25},
      default:{marginLeft:60,marginTop:25,marginBottom:35 },
    })}}>
    <CustomButton disable={disable} onPress={onSignUp} text={t('Sign')}></CustomButton>
    </View>
    </View>
    </View>
    <View style={{direction:i18n.language ==='He'?'rtl': 'ltr',flexDirection:'row',justifyContent:'center',alignSelf:'center',
    ...Platform.select({
      ios:{position:'absolute',bottom:'20%'},
      android:{position:'absolute',bottom:'18%'},
      default:{marginTop:30},
      })
      }}> 
      <Text style={{fontSize:18,fontWeight:'500',fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif'}}>{t('HaveAcc')}</Text>
      <Text onPress={onSignIn} style={{fontSize:18,color:'dodgerblue',fontWeight:'500',
      fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',}}>{t('Sign In')}</Text>
      </View>
      <Text style={{marginBottom:10,alignSelf:'center',textAlign:'center',textDecorationLine: 'underline',fontWeight:'500',
      fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
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
            marginTop:20,
            flex:1,
            borderColor: "#e2e1df",
            borderWidth:1,
          },
        }) 
      },
  });
  