import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Modal,Platform,Image,
Dimensions, ImageBackground,ScrollView,KeyboardAvoidingView} from 'react-native';
import {LangPicker} from '../components/LangPicker';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Entypo';
import CustomButton from '../components/CustomButton';
import react from 'react';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { Trans,useTranslation, initReactI18next } from "react-i18next";
import { API } from '../Server/config';
import axios from 'axios';
import i18n from '../Context/changelang';



const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;

export default function AppHome() {

    const navigation=useNavigation();
    const {t,i18n} = useTranslation();
    const currentlanguage=(i18n.language);


    const route =useRoute();
    const {update,add,id,fname,lname,phone,address,roll}=route.params
    
    const [isUpdating,setUpdating]=useState(update);
    const [isAdding,setAdding]=useState(add);
    const [disable, setDisable]=useState(false);
    if(update===false){
        fname=('');
        lname=('');
        phone=('');
        address=('');
        roll=('');
        id=('');
    }
    const[Fname,setFname]=useState(fname)
    const[Lname,setLname]=useState(lname)
    const[Phone,setPhone]=useState(phone)
    const[Address,setAddress]=useState(address)
    const[Roll,setRoll]=useState(roll)
    const[Id,setID]=useState(id)


    const isValidField=()=>{
        if(Fname==''||Lname==''||Phone==''||Address==''||Roll==''){
          return false;
        }
        return true;
      };
    const isValidForm=()=>{
        let isValidPhone = /^\d+$/.test(Phone);
        if(!isValidField()){
          if(currentlanguage=='En'){
            alert('Require All Fields!')
            }
            else{
              alert('דרוש למלא הכל!')
            }
          return false
        }
        if(!isValidPhone){
          if(currentlanguage=='En'){
            alert('Phone is Invalid!(Numbers only!)')
          }
            else{
              alert('המספר טלפון לא תקין (מספרים בלבד!)')
            }
          return false
        }
        return true;
      };
      let config = {
        headers: {"Access-Control-Allow-Origin":true,
      }}

    const onAdd=()=>{
        if(!disable){
        setDisable(true);
        if(isValidForm()){
          axios.post(`${API}/addemployee`,{
            fname:Fname,
            lname:Lname,
            phone:Phone,
            address:Address,
            roll:Roll
          },config)
          .then(function (response) {
            console.log(response);
            setAdding(false);
            setDisable(false);
            navigation.replace('WebHome');
          })
          .catch(function (error) {
            if(currentlanguage==='En'){
            alert('Something went Wrong! Try Again')
            }
            else{
            alert('משהו קרה נסה שוב!')
            }
            setDisable(false);
          });
        }
        else{
            setDisable(false);
            return;
        }
        }
    }
    const updateItem=()=>{
        if(!disable){
        setDisable(true);
        if(isValidForm()){
          axios.post(`${API}/update`,{
            id:Id,
            fname:Fname,
            lname:Lname,
            phone:Phone,
            address:Address,
            roll:Roll
          },config)
          .then(function (response) {
            console.log(response);
            setUpdating(false);
            setDisable(false);
            navigation.replace('WebHome');
          })
          .catch(function (error) {
            if(currentlanguage==='En'){
              alert('Something went Wrong! Try Again')
              }
              else{
              alert('משהו קרה נסה שוב!')
              }
            setDisable(false);
          });
        }
        else{
            setDisable(false);
            return;
        }
        }
    }

    return(
    <SafeAreaView style={{flex:1,backgroundColor: '#edf1f2'}}>
      <StatusBar style="auto" />
      <Icon onPress={()=>navigation.navigate('WebHome')} name="chevron-small-left" size={50} style={{color:'lightslategrey',marginTop:15,marginLeft:20}}/>
      <View style={{width:'100%',justifyContent:'space-evenly',alignItems:'center',flex:1,maxHeight:520}}>
      {isAdding?<Text style={{fontWeight: 'bold',fontSize:20,alignSelf:'flex-start',marginBottom:5,marginLeft:currentlanguage==='En'?35:265}}>
      {t('Add Employee')}
      </Text>:<Text style={{fontWeight: 'bold',fontSize:20,alignSelf:'flex-start',marginBottom:5,marginLeft:currentlanguage==='En'?35:265}}>
      {t('Update Employee')}</Text>}
      <CustomInput value={Fname} setValue={setFname} placeholder={t('First Name')} />
      <CustomInput value={Lname} setValue={setLname} placeholder={t('Last Name')} />
      <CustomInput value={Phone} setValue={setPhone} placeholder={t('Phone')} />
      <CustomInput value={Address} setValue={setAddress} placeholder={t('Address')} />
      <CustomInput value={Roll} setValue={setRoll}  placeholder={t('Roll')} />
      {isAdding?<CustomButton disable={disable} onPress={onAdd} text={t('Add')}></CustomButton>:
      <CustomButton disable={disable} onPress={updateItem} text={t('Update')}></CustomButton>}
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        resizeMode: 'contain',
        flex:1,
    },
});