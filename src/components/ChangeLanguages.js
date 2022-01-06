import {useEffect} from "react";
import i18next from "i18next";
import cookie from "js-cookie";
import {useTranslation} from "react-i18next";

export default function ChangeLanguages() {
	const languages = [
	  	{
	  		code: "en",
	  		name: "English",
	  		country_code: "gb"
	  	},
	  	{
	  		code: "uz",
	  		name: "O`zbek",
	  		country_code: "uz"
	  	},
	  	{
	  		code: "es",
	  		name: "España",
	  		country_code: "es"
	  	},
	  	{
	  		code: "ru",
	  		name: "Pус",
	  		country_code: "ru"
	  	},
	  	{
	  		code: "cn",
	  		name: "中國人",
	  		country_code: "cn"
	  	}
  	];

  	const {t} = useTranslation();
  	const currentLanguageCode = cookie.get("i18next") || "en";

  	useEffect(() => {
  		document.title = t("title");
  	},[currentLanguageCode]);



  	return (
  		<>
  			<label htmlFor="langs" className="langs">
  				<span><i className="bi bi-globe"></i></span>
	  			<input type="checkbox" id="langs" />
	  			<ul>
	  				{languages.map(({code,name,country_code}) => (
	  					<li style={{opacity: code === currentLanguageCode ? ".8" : 1}} 
	  					key={country_code} onClick={() => i18next.changeLanguage(code)}>
	  						<span className={`flag-icon flag-icon-${country_code}`}>
	  						</span>
	  						&nbsp;&nbsp;
	  						{name}
	  					</li>
	  				))}
	  			</ul>
	  		</label>
  		</>
  	);
}