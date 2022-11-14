import './Header.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Header() {

    let userToken = localStorage.getItem('token');
    let userAdmin = localStorage.getItem('Admin');
   
    const navigate = useNavigate();

    console.log(userToken);
    console.log(userAdmin);

    
    function goToAllArticles () {
        navigate("/articles/")
    }

    function goToAccount () {
        navigate("/account/")
    }

    function LocalstorageClear () {
        localStorage.clear();
        userToken = null
        userAdmin =null
        navigate("/")
    }

    let userConnect;
    if (userAdmin === "true") {
        userConnect =
        <a onClick={goToAccount}>Mon Compte Admin</a>
        console.log('ok');
    }
    else {
        userConnect =
        <a onClick={goToAccount}>Mon Compte</a>
        console.log('ok');
    }

    let userTokenConnect;
    if (userToken) {
        userTokenConnect = 
        <>
        <img className="img_header_online" src='http://localhost:3000/images/logo-online.ico' alt="logo-online"/>
        <a onClick={goToAllArticles}>Tous les Articles</a>
        {userConnect}
        <a className="deconnexion" onClick={LocalstorageClear}>Deconnexion</a>
        </>
    }
    else {
        userTokenConnect = <img className = "img_header_offline" src='http://localhost:3000/images/logo-offline.png' alt="logo-offline"/>
    }

   

    return (
        <div id="nav" >
            {userTokenConnect}
        </div>
);
}
  
export default Header; 


