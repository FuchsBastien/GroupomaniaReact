import style from './Login.module.css';
import cx from 'classnames';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


function Login() {
       
    const [emailInputData, setEmailInputData] = useState('');
    const [passwordInputData, setPasswordInputData] = useState('');
    const [responseError, setResponseError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();

    const user = {
        email : emailInputData,
        password : passwordInputData,
    };

    /*-------------------------------------------------------------------------------------------------*/
    //Méthode 1 (e=e)
    function changeEmailInput(e) {
        setEmailInputData(e.target.value)
    }
    /*ou
     const changeEmailInput = function(e) {
        setEmailInputData(e.target.value)
        console.log(e);
    }*/
    /*ou
     const changeEmailInput = (e) => {
        setEmailInputData(e.target.value)
        console.log(e);
    }*/

    console.log(emailInputData);

    //Méthode 2 (e=target.value)
    const changePasswordInput = function(e) { 
        setPasswordInputData(e)
    }
    console.log(passwordInputData);
    

    const changeResponseError = function(e) {
        setResponseError(e)
    }
    console.log(responseError);


    /*-------------------------------------------------------------------------------------------------*/
    const emailValidation = function() {
        if (emailInputData === '') {
            setErrorEmail(true)
        } 
        else (
            setErrorEmail(false)
        )
        console.log(errorEmail);
    };

    const passwordValidation = function() {
        if (passwordInputData === '') {
            setErrorPassword (true)
        } 
        else (
            setErrorPassword (false)
        )
        console.log(errorPassword);
    };


    /*-------------------------------------------------------------------------------------------------*/
    let errorEmailMessage;
    if (errorEmail === true) {
        errorEmailMessage = <p className="mt-2 text-danger">Ce champ est obligatoire</p>
    }
   
    let errorPasswordMessage;
    if (errorPassword === true) {
        errorPasswordMessage = <p className="mt-2 text-danger">Ce champ est obligatoire</p>
    }

    
    /*-------------------------------------------------------------------------------------------------*/
    const sendForm = function(e) {
        e.preventDefault();

        if (emailInputData === '' || passwordInputData === ''){
            emailValidation()
            passwordValidation()  
        }
        else {
            emailValidation()
            passwordValidation()
            axios.post("http://localhost:3000/api/auth/login", user)
            .then((res) => {
                console.log(user);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('Id', res.data.userId);
                localStorage.setItem('Admin', res.data.userAdmin);
                localStorage.setItem('Firstname', res.data.userFirstname);
                localStorage.setItem('ImageUrl', res.data.userImageUrl);
                localStorage.setItem('Activate', res.data.userActivate);
                navigate("/articles");           
            })
            .catch((err) =>{ 
                console.log(user);
                changeResponseError(err.response.data);  
            })
        }       
    };


    return (
        <div className= {cx ("container", style.container)}>
            <form className="form-inline justify-content-center">
                <h1 className={cx ("mt-5", style.h1)}>Connexion</h1>

                <div className="form-group">
                    <label className= {cx ("mb-1 mt-2", style.label)} htmlFor="Votre adresse email">Adresse mail</label>
                    {/*on appelle soit {changeEmailInput} (ou {e => changeEmailInput(e)})...*/}
                    <input className= {cx ("form-control", style.input)} value={emailInputData} onInput={changeEmailInput} type="email" id="Votre adresse email" required/>
                    {errorEmailMessage}
                </div>

                <div className="form-group ">
                    <label className= {cx ("mb-1 mt-2", style.label)} htmlFor="Votre mot de passe">Mot de passe</label>
                    {/*...ou soit {e => changePasswordInput(e.target.value)}*/}
                    <input className= {cx ("form-control", style.input)} value={passwordInputData} onInput={e => changePasswordInput(e.target.value)} type="password" id="Votre mot de passe" autoComplete="on" required/>
                    {errorPasswordMessage}
                </div>

                <p className="mt-2 text-danger">{responseError}</p>

                {/*seulement {sendForm}*/}
                <button className="submit btn btn-info btn-lg btn-block mt-3" onClick={sendForm} type="submit">Se connecter</button>
            </form>

            <br/>

            <a className="createAccount">Mot de passe oublié?</a>
            <p className="text-right mt-3">Vous n'avez pas de compte ? <a className="createAccount"><Link to="/signup">Créez-en un</Link></a></p>
        </div>
    );
}
 
export default Login; 



