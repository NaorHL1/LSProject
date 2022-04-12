import i18n, { init } from "i18next";
import { useTranslation, initReactI18next, Translation } from "react-i18next";
import { I18nManager } from "react-native";
import En from "./En.json"
import He from "./He.json"

const resources={
    He:{translation:{
      "Sign In" : " התחבר " ,
      "Sign Up" : " הרשמה ",
      "Sign" :"הירשם",
      "En" : "אנ",
      "He" : "עב",
      "Email":"אימייל",
      "First Name":"שם פרטי",
      "Last Name":"שם משפחה",
      "Password":"סיסמה",
      "Phone":"מספר טלפון",
      "Address":"כתובת",
      "Roll":"תפקיד",
      "DontAcc":"אין לך חשבון?",
      "HaveAcc":"יש לך חשבון?",
      "forg":"שכחת סיסמה?",
      "terms":"תנאי השימוש ומדיניות הפרטיות שלנו",
      "Retype":"אמת סיסמה",
      "Personal Details":"פרטים אישיים",
      "Managing Employees":"ניהול עובדים",
      "Start Date":"תאריך התחלה",
      "Add Employee":"הוסף עובד",
      "+ Add Employee":"הוסף עובד +",
      "Add":"הוסף",
      "Update Employee":"עדכן עובד",
      "Update":"עדכן"
    }},
    En:{translation:{
      "Sign In" : "Sign In" ,
      "Sign Up" : "Sign Up" ,
      "En" : "En",
      "He" : "He",
      "Email":"Email",
      "First Name":"First Name",
      "Last Name":"Last Name",
      "Password":"Password",
      "Phone":"Phone",
      "Roll":"Roll",
      "Address":"Address",
      "DontAcc":"Don't Have an Account? ",
      "HaveAcc":"Have an Account? ",
      "forg":"Forgot Password?",
      "terms":"Our Terms of Use and Privacy Policy",
      "Retype":"Retype Password",
      "Personal Details":"Personal Details",
      "Managing Employees":"Managing Employees",
      "Sign" :"Sign Up",
      "Start Date":"Start Date",
      "Add Employee":"Add Employee",
      "+ Add Employee":"+ Add Employee",
      "Add":"Add",
      "Update Employee":"Update Employee",
      "Update":"Update"
    }},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3',
    lng: I18nManager.isRTL? 'He' : 'En',
    fallbackLng: "En",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;