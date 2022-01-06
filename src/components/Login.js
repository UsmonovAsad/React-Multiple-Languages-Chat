import {useContext} from "react";
import firebase from 'firebase';
import {Context} from "..";
import {useTranslation} from "react-i18next";

export default function Login() {
    const {auth} = useContext(Context);
    const {t} = useTranslation();

	async function goLogin() {
        const provider = await new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider);
	}

    return (
        <div className="main">
                <button onClick={goLogin} className="loginBtn">{t("signInBtn")}</button>
        </div>
    );
}