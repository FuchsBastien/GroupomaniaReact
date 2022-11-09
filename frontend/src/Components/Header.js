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


    let userConnect;
    if (userAdmin === "true") {
        userConnect =
        <a>Mon Compte Admin</a>
        console.log('ok');
    }
    else {
        userConnect =
        <a>Mon Compte</a>
        console.log('ok');
    }

    let userTokenConnect;
    if (userToken) {
        userTokenConnect = 
        <>
        <img className="img_header_online" src='http://localhost:3000/images/logo-online.ico' alt="logo-online"/>
        <a>Tous les Articles</a>
        {userConnect}
        <a className="deconnexion" onClick={LocalstorageClear}>Deconnexion</a>
        </>
    }
    else {
        userTokenConnect = <img className = "img_header_offline" src='http://localhost:3000/images/logo-offline.png' alt="logo-offline"/>
    }

    function LocalstorageClear () {
        localStorage.clear();
        userToken = null
        userAdmin =null
        navigate("/")
    }


    return (
        <div id="nav" >
            {userTokenConnect}
        </div>
);
}
  
export default Header; 


