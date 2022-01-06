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
	apiKey: "AIzaSyBuYMDsz0nEUPt9rli6ULpqGzPJCvH1R_I",
	  authDomain: "global-chat-98886.firebaseapp.com",
	  projectId: "global-chat-98886",
	  storageBucket: "global-chat-98886.appspot.com",
	  messagingSenderId: "662161712551",
	  appId: "1:662161712551:web:96a6b0af3a1b69f2a28282",
	  measurementId: "G-ML2RD40ZHF"
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