import './Header.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

function Header() {

    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [userAdmin, setUserAdmin] = useState(localStorage.getItem('Admin'));
   
    const navigate = useNavigate();

    console.log(userToken);
    console.log(userAdmin);


    let userAdminConnect;
    if (userAdmin === "true") {
        userAdminConnect =
        <a>Mon Compte Admin</a>
        console.log('ok');
    }

    let userTokenConnect;
    if (userToken) {
        userTokenConnect = 
        <>
        <img className="img_header_online" src='http://localhost:3000/images/logo-online.ico' alt="logo-online"/>
        <a>Tous les Articles</a>
        {userAdminConnect}
        <a className="deconnexion" onClick={LocalstorageClear}>Deconnexion</a>
        </>
    }
    else {
        userTokenConnect = <img className = "img_header_offline" src='http://localhost:3000/images/logo-offline.png' alt="logo-offline"/>
    }

    function LocalstorageClear () {
        localStorage.clear();
        setUserToken(null)
        setUserAdmin(null)
        navigate("/")
    }


    return (
        <div id="nav" >
            {userTokenConnect}
        </div>
);
}
  
export default Header; 


