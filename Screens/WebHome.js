import { StatusBar } from 'expo-status-bar';
import { useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View,Modal,Platform,Image,
Dimensions, ImageBackground,ScrollView,KeyboardAvoidingView, FlatList, ViewBase, ActivityIndicator, Animated} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import react from 'react';
import axios from 'axios';
import { API } from '../Server/config';
import { Trans,useTranslation, initReactI18next } from "react-i18next";
import i18n from '../Context/changelang';
import {CloseOutlined,EditOutlined,DeleteFilled,PhoneOutlined} from '@ant-design/icons';
import Icon from 'react-native-vector-icons/Entypo';
import { I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg,{Path,SvgUri} from 'react-native-svg';
import SvgComponent from '../assets/PhoneS';

const WIDTH=Dimensions.get('window').width;
const HEIGHT=Dimensions.get('window').height;

export default function WebHome() {

    const navigation=useNavigation();

    const {t,i18n} = useTranslation();
    const currentlanguage=(i18n.language);
    I18nManager.forceRTL(currentlanguage==='En'?false:true);

    const [data,setData]=useState([]);
    const [isLoading,setLoading]=useState(true);
    const [isEditing,setEditing]=useState(false);
    const [isUpdating,setUpdating]=useState(false);
    const [isAdding,setAdding]=useState(false);
    const [disable, setDisable]=useState(false);

    const[Fname,setFname]=useState('')
    const[Lname,setLname]=useState('')
    const[Phone,setPhone]=useState('')
    const[Address,setAddress]=useState('')
    const[Roll,setRoll]=useState('')
    const[Id,setID]=useState('')
    
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

    useEffect(()=>{
      let isMounted = true;
        axios.get(`${API}/employees`,{headers:{"Access-Control-Allow-Origin":true,}})
        .then(({data})=>setData(data),{
          if(isMounted){
            setLoading(false);
          }
        })
        .catch(console.log())
        .finally(()=>setLoading(false));
    },[])
    
    let config = {
      headers: {"Access-Control-Allow-Origin":true,
    }
    }
    const resetInput=()=>{
      setFname('');
      setLname('');
      setAddress('');
      setPhone('');
      setRoll('');
      setID('')
    }
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
    const updateMenu=(item)=>{
      setUpdating(true);
      setFname(item.fname);
      setLname(item.lname);
      setAddress(item.address);
      setPhone(item.phone);
      setRoll(item.roll);
      setID(item._id)
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

    
    const deleteItem=(id)=>{
    axios.post(`${API}/deleteemployee`,{
      id:id
    },config)
    .then(function (response) {
      console.log(response);
      navigation.replace('WebHome');
    })
    .catch(function (error) {
      if(currentlanguage==='En'){
        alert('Something went Wrong! Try Again')
        }
        else{
        alert('משהו קרה נסה שוב!')
        }
    });
  }
    
    const renderEmployee=({item,index})=>{
        var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(item.datejoined);
        var monthName=months[d.getMonth()];
        var dayName=d.getDate();
        var yearName=d.getFullYear();
        return Platform.OS==='web'?(
            <View style={[styles.item,{}]}>
                <Image style={styles.image}
                source={{uri:'https://picsum.photos/150'}}
                resizeMode='contain'
                />
                <View style={{marginLeft:10,flexDirection:'row'}}>
                <Text style={{textAlign:'left',width:185,fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{item.fname}</Text>
                <Text style={{textAlign:'left',width:185,fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{item.lname}</Text>
                <Text style={{textAlign:'left',width:185,fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{`${item.phone.slice(0,3)} ${item.phone.slice(3,10)}`}</Text>
                <Text style={{textAlign:'left',width:220,fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{item.address}</Text>
                <Text style={{textAlign:'left',marginHorizontal:isEditing?15:85,width:150,fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{`${item.roll}`}</Text>
                <Text style={{textAlign:'left',fontWeight:'500',fontFamily:'sans-serif',fontSize:15}}>{`${dayName} ${monthName} ${yearName}`}</Text>
                {isEditing?(<View style={{flexDirection:'row',marginLeft:40}}>
                  <EditOutlined onClick={()=>updateMenu(item)} style={{fontSize:'20px',marginInlineEnd:42,cursor:'pointer'}}/>
                <DeleteFilled onClick={()=>deleteItem(item._id)} style={{fontSize:'20px',cursor:'pointer'}}/>
                </View>):null}
                </View>
            </View>
        )
        :
        (<View style={{width:'90%',marginTop:10,backgroundColor:'white',borderRadius:20,borderWidth:1,borderColor:'lightgray',alignSelf:'center',height:170}}>
          <Image style={[styles.image,{width:50,height:50,margin:12,marginLeft:12}] } source={{uri:'https://picsum.photos/150'}}resizeMode='contain'/>
          <Icon onPress={()=>updateMenu(item)+setEditing(true)} size={19} style={{position:'absolute',marginLeft:310,marginTop:25,color:'grey',margin:20}} name='dots-three-vertical'/>
          <Text style={{position:'absolute',marginLeft:75,marginTop:26,fontWeight:'700',fontSize:16}}>{`${item.fname} ${item.lname}`}</Text>
          <Icon size={18} style={{position:'absolute',marginLeft:78,marginTop:55}} name='briefcase'/>
          <Text style={{position:'absolute',marginLeft:105,marginTop:55,fontWeight:'400',fontSize:16}}>{item.roll}</Text>
          <Text style={{position:'absolute',marginLeft:105,marginTop:75,fontWeight:'400',fontSize:12,color:'grey'}}>{`Start Date: ${dayName} ${monthName} ${yearName}`}</Text>
          <Text style={{position:'absolute',marginLeft:105,marginTop:100,fontWeight:'400',fontSize:16}}>{`${item.phone.slice(0,3)} ${item.phone.slice(3,10)}`}</Text>
          <SvgUri width={20} height={20} style={{position:'absolute',marginLeft:77,marginTop:130,fontWeight:'400',fontSize:16}} uri="https://icongr.am/octicons/location.svg?size=128&color=000000"/>
          <Text style={{position:'absolute',marginLeft:105,marginTop:130,fontWeight:'400',fontSize:16}}>{item.address}</Text>
          <SvgComponent style={{position:'absolute',marginLeft:77,marginTop:100}}/>
          </View>
          )
    }
    if(Platform.OS!=='web'){
      renderHeader = () => {
        return (<View><Icon onPress={()=>navigation.replace('SignIn')} name="chevron-small-left" size={50} style={{color:'lightslategrey',marginTop:15}}/>
        <View style={{flexDirection:'row'}}>
        <Text style={[styles.sectionTitle,{marginHorizontal:20,fontSize:20}]}>{t('Managing Employees')}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AppHome',{add:true})}>
        <Image style={{width:30,height:30,marginTop:16,marginLeft:currentlanguage==='En'?100:200}} source={require('../assets/bluePlus.jpg')}></Image>
        </TouchableOpacity>
        </View>
        </View>)
      };
    }
    return Platform.OS==='web'?(
    <SafeAreaView style={{backgroundColor:'#edf1f2'}}>
      <StatusBar style="auto" />
      {isUpdating || isAdding?(
         <View style={{
          zIndex:5, position: "absolute", width: "100%",height: "100%",
          justifyContent: "center", alignItems: "center",backgroundColor: 'rgba(0,0,0,0.8)'}}>
              <View style={{backgroundColor:'white',borderRadius:3,width:565,marginTop:60,height:520,alignSelf:'center',zIndex:6,alignItems:'center'}}>
                  <CloseOutlined onClick={()=>{setAdding(false)+setUpdating(false)+resetInput()}}
                  style={{alignSelf:'flex-end',fontSize:'25px',marginTop:25,marginLeft:25,marginRight:25,cursor:'pointer'}} />
                  {isAdding?<Text style={{fontWeight: 'bold',fontSize:18,fontFamily:'sans-serif',alignSelf:'center',width:'80%'}}>
                    {t('Add Employee')}
                    </Text>:<Text style={{fontWeight: 'bold',fontSize:18,fontFamily:'sans-serif',alignSelf:'center',width:'80%'}}>
                    {t('Update Employee')}</Text>}
                  <View style={{width:'100%',justifyContent:'space-evenly',alignItems:'center',flex:1}}>
                  <CustomInput value={Fname} setValue={setFname} direct={'left'} placeholder={t('First Name')} />
                  <CustomInput value={Lname} setValue={setLname} direct={'left'} placeholder={t('Last Name')} />
                  <CustomInput value={Phone} setValue={setPhone} direct={'left'} placeholder={t('Phone')} />
                  <CustomInput value={Address} setValue={setAddress} direct={'left'} placeholder={t('Address')} />
                  <CustomInput value={Roll} setValue={setRoll} direct={'left'} placeholder={t('Roll')} />
                  {isAdding?<CustomButton disable={disable} onPress={onAdd} text={t('Add')}></CustomButton>:
                  <CustomButton disable={disable} onPress={updateItem} text={t('Update')}></CustomButton>}
                  </View>
              </View>
          </View>
          ):null}
      <View style={[styles.container]}>
      <Text style={styles.sectionTitle}>{t('Managing Employees')}</Text>
      <View style={{left:0,bottom:30,alignSelf:'flex-end'}}>
      <CustomButton onPress={()=>setAdding(true)} text={t('+ Add Employee')}></CustomButton>
      </View>
      <EditOutlined style={{fontSize:'25px',alignSelf:'flex-end',cursor:'pointer'}} onClick={()=>setEditing(!isEditing)}/>
      <View style={styles.whiteb}>
      <View style={{flexDirection:'row',marginLeft:100,marginTop:20}}>
         <Text style={[styles.tabletitle,{width:185}]}>{t('First Name')}</Text>
          <Text style={[styles.tabletitle,{width:185}]}>{t('Last Name')}</Text>
          <Text style={[styles.tabletitle,{width:185}]}>{t('Phone')}</Text>
          <Text style={[styles.tabletitle,{width:220}]}>{t('Address')}</Text>
          <Text style={[styles.tabletitle,{width:150,marginHorizontal:isEditing?15:85}]}>{t('Roll')}</Text>
          <Text style={[styles.tabletitle,{}]}>{t('Start Date')}</Text>
          </View>
          {
              isLoading?<ActivityIndicator size={25} style={{alignSelf:'center'}}/>:(
      <FlatList style={{ backgroundColor: 'white'}} showsVerticalScrollIndicator={false} data={data}
      keyExtractor={item =>`${item._id}`}
      renderItem={renderEmployee}
      ListEmptyComponent={<Text message="No data found." />} >
      </FlatList>
      )
     }
      </View>
      </View>
      </SafeAreaView>
    )
    :

    (<SafeAreaView style={{backgroundColor:'#edf1f2'}}>
      {isEditing?(
      <View style={{position: "absolute",width:'100%',height:HEIGHT,backgroundColor: 'rgba(0,0,0,0.8)',zIndex:6}}>
      <TouchableOpacity onPress={()=>setEditing(false)} style={{flex:1}}>
      </TouchableOpacity>
      <View style={{position:'absolute',backgroundColor:'white',bottom:0,height:160,width:'100%',borderRadius:20}}></View>
      <Text onPress={()=>navigation.navigate('AppHome',{
          id:Id,
          fname:Fname,
          lname:Lname,
          phone:Phone,
          address:Address,
          roll:Roll,
          update:true
        })} style={{width:WIDTH,marginLeft:30,fontWeight:'400',fontSize:20,height:45}}>{t('Edit')}</Text>
      <Text onPress={()=>deleteItem(Id)} style={{width:WIDTH,marginLeft:30,fontWeight:'400',fontSize:20,height:45,marginBottom:30}}>{t('Delete')}</Text>
      </View>):(null)}
      <StatusBar style="auto" />
      {
              isLoading?<ActivityIndicator size={25} style={{alignSelf:'center'}}/>:(
      <FlatList
      ListHeaderComponent={renderHeader}
      keyExtractor={item =>`${item._id}`}
      data={data}
      renderItem={renderEmployee}
      >
      </FlatList>
      )}
      </SafeAreaView>
      )
}

const styles = StyleSheet.create({
    container:{
        resizeMode: 'contain',
        alignSelf:'center',
        width:1300,
        backgroundColor:'#edf1f2'
    },
    sectionTitle:{
        alignSelf:'flex-start',
        marginTop:'5%',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily:Platform.OS==='web'?'sans-serif':null,
    },
    whiteb:{
        borderRadius:1,
        marginTop:45,
        backgroundColor:'white',
        height:700,
        width:'100%',
    },
    tabletitle:{
        color:'lightslategrey',
        fontSize:13,
        marginBottom:15,
        fontWeight: 'bold',
        fontFamily:'sans-serif',
    },
    item:{
        flexDirection:'row',
        borderBottomColor:'#edf1f2',
        borderTopColor:'#edf1f2',
        borderTopWidth:1.5,
        borderBottomWidth:1.5,
        width:'100%',
        height:85,
        alignItems:'center'
    },
    image:{
        width:65,
        height:65,
        borderRadius:80,
        marginLeft:25,
    },
    button: {
      height: 50,
      borderRadius: 25,
      aspectRatio: 1,
      backgroundColor: 'white',
      opacity: 0.6,
    },
})