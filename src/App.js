import {useContext} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {Context} from ".";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import Loader from "./components/Loader";

export default function App() {
	const {auth} = useContext(Context);
	const loading = useAuthState(auth)[1];

	if (loading) {
		return <Loader />
	}

  return (
    <>
    	<Header />
    	<AppRouter />
    </>
  );
}