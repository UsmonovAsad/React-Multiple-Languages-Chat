import Login from "./components/Login";
import Chat from "./components/Chat";
import {LOGIN_ROUTE,CHAT_ROUTE} from "./utils/const";

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		component: <Login />
	}
];

export const privateRoutes = [
	{
		path: CHAT_ROUTE,
		component: <Chat />
	}
];