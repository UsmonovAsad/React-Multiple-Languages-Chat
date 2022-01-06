import React,{createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import firebase from 'firebase'
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import "flag-icon-css/css/flag-icon.min.css";

const firebaseApp = firebase.initializeApp({
	// Initialize Firebase
});

export const Context = createContext(null);

const firestore = firebaseApp.firestore()

const auth = firebase.auth()



i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
  	supportedLngs: ["en","uz","es","ru","cn"],
    fallbackLng: "uz",
    detection: {
    	order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
    	caches: ["cookie"]
    },
    backend: {
    	loadPath: "assets/locals/{{lng}}/t.json"
    },
    react: {
    	useSuspense: false
    }
  });

ReactDOM.render(
	<Context.Provider value={{firestore,auth,firebase}} >
		<Router>
			<App />
		</Router>
	</Context.Provider>,
  document.getElementById('root')
);
