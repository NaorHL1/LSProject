import react from "react";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import WebHome from "./Screens/WebHome";
import { StatusBar } from "expo-status-bar";
import Navigation from "./components/Navigation";
import { NavigationContainer } from '@react-navigation/native';


export default function App(){
  return (
        <NavigationContainer>
            <Navigation/>
            <StatusBar style="auto"/>
        </NavigationContainer>
);
}