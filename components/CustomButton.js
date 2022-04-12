import react from "react";
import{View,Text,StyleSheet,Platform,Pressable} from 'react-native';

const CustomButton=({onPress,text,disable})=>{
    return(
        <Pressable onPress={onPress} disabled={disable} style={[styles.container,{opacity:disable===true?0.5:1,opacity:disable===true?0.5:1}]}>
            <Text  style={[styles.text,Platform.OS==='web'?{userSelect:'none'}:null]}>{text}</Text>
        </Pressable>
    );
};

const styles=StyleSheet.create({
    container:{backgroundColor:'#5585F7',
    ...Platform.select({
        ios:{
            alignItems:'center',
            width:'23%',
            padding:17,
            borderRadius:10,
            left:'30%',
        },
        android:{
        alignItems:'center',
        width:'23%',
        padding:17,
        borderRadius:10,
        left:'30%',
    },
        default:{
        width:160,
        padding:10,
        borderRadius:5,
        marginBottom:10 ,
        alignItems:'center'},
        })
    },
    text:{color:'white',
    fontSize:15,
    fontWeight:'500',
    fontFamily:Platform.OS === 'ios' || 'android' ? null :'sans-serif',
},
})

export default CustomButton