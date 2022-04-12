import SignIn from "../Screens/SignIn";
import SignUp from "../Screens/SignUp";
import WebHome from "../Screens/WebHome";
import react from 'react';
import {View,Text,Platform,Image} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import AppHome from "../Screens/AppHome";

const Stack=createNativeStackNavigator();

const screenOptions={
    headerLeft:null,
    headerShown:Platform.OS === 'web' ? true : false,
    title:Platform.OS === 'web' ?<Image style={{width: 200, height: 55,}}
        source={require('../assets/logo.png')}/>: null
};

export default function Navigation(){
    return(
        <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Group>
        <Stack.Screen name="SignIn" component={SignIn} options={{}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{}} />
        <Stack.Screen name="WebHome" component={WebHome}
        options={{title:Platform.OS === 'web'?(<View style={{flexDirection:'row',width:'100%'}}>
        <Image style={{width: 200, height: 55,}} source={require('../assets/logo.png')}/></View>
        ):(null)}}/>
        <Stack.Screen name="AppHome" component={AppHome} options={{}} />
        </Stack.Group>
        </Stack.Navigator>
    );
};
