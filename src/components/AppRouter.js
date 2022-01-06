import {useEffect,useContext} from "react";
import {Routes,Route,useNavigate,useLocation} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from "../index";
import {LOGIN_ROUTE,CHAT_ROUTE} from "../utils/const";
import Login from "./Login";
import Chat from "./Chat";


export default function AppRouter() {
	const {auth} = useContext(Context);
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const {pathname} = useLocation();

	useEffect(() => {
		if (user) {
			navigate(CHAT_ROUTE);
		} else {
			navigate(LOGIN_ROUTE);
		}
	},[pathname,user]);

	return (
		<Routes>
			<Route path={LOGIN_ROUTE} element={<Login />} />
			<Route path={CHAT_ROUTE} element={<Chat />} />
		</Routes>
	);
}