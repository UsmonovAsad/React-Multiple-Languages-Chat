import {useContext} from "react";
import {Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "..";
import {LOGIN_ROUTE} from "../utils/const";
import {useTranslation} from "react-i18next";
import ChangeLanguages from "./ChangeLanguages.js";

export default function Header() {
	const {auth} = useContext(Context);
	const [user] = useAuthState(auth);
	const {t} = useTranslation();

	function goSignOut() {
		auth.signOut();
		window.location.reload();
	}

	return (
		<nav>
			<h3>{t("title")}</h3>
			<div>
				<div>
					{
						user && (
							<Link to="/login">
								<button style={{cursor: "pointer"}}
								 onClick={goSignOut}
								 className="btn">{t("signOutBtn")}</button>
							</Link>
						)
					}
				</div>
				<ChangeLanguages />
			</div>
		</nav>
	);
}