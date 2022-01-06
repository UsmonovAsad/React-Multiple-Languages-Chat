import {useState,useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import {Context} from "..";
import Loader from "./Loader";
import {useTranslation} from "react-i18next";

export default function Chat() {
	const {auth,firestore} = useContext(Context);
	const [user] = useAuthState(auth);
	const [value,setValue] = useState("");
	const [messages,loading] = useCollectionData(
		firestore.collection("messages").orderBy("createdAt")
	);
	const {t} = useTranslation();

	async function sendMessage(e) {
		if (value) {
			firestore.collection("messages").add({
				uId: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL,
				text: value,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				time: new Date().toLocaleTimeString().toString(),
			});
			setValue("");
		}
	}

	if (loading) {
		return <Loader />
	}

	function classNameFunc(id1,id2) {
		return id1 === id2 ? " own-msg" : " ";
	}

	return (
		<div className="sms-main">
			<div className="sms-conta">
				{messages.map(message => (
					<div key={message.time} className={`sms-msg ${message && user ?
					 classNameFunc(message.uId,user.uid) : " "}`}>
						<div className="msg-data">
							<div className="msg-img">
								<img src={message.photoURL} alt={message.displayName} />
							</div>
							<div className="msg-name">
								<p>{message.displayName}</p>
							</div>
						</div>
						<div className="msg">
							<p>{message.text}</p>
						</div>
					<span className="msg-date">{message.time.slice(0,5)}</span>
					</div>
				))}
			</div>
			<div className="sms-form">
				<input onKeyPress={e => e.key === "Enter" && sendMessage()} value={value}
				 onChange={e => setValue(e.target.value)} type="text"
				  placeholder={`${t("inputPlaceholder")}...`} />
				<button onClick={sendMessage}>{t("sendMessageBtn")}</button>
			</div>
		</div>
	);
}