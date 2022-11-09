import style from './Signup.module.css';
import cx from 'classnames';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Signup(props) {

    const [firstnameInputData, setFirstnameInputData] = useState('');
    const [lastnameInputData, setLastnameInputData] = useState('');
    const [emailInputData, setEmailInputData] = useState('');
    const [passwordInputData, setPasswordInputData] = useState('');
    const [file, setFile] = useState('');

    const [errorFirstnameEmpty, setErrorFirstnameEmpty] = useState(true);
    const [errorLastnameEmpty, setErrorLastnameEmpty] = useState(true);
    const [errorEmailEmpty, setErrorEmailEmpty] = useState(true);
    const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(true);
    const [errorFileEmpty, setErrorFileEmpty] = useState(true);

    const [errorFirstnameRegex, setErrorFirstnameRegex] = useState('');
    const [errorLastnameRegex, setErrorLastnameRegex] = useState('');
    const [errorEmailRegex, setErrorEmailRegex] = useState('');
    const [errorPasswordRegex, setErrorPasswordRegex] = useState('');

    const [responseError, setResponseError] = useState('');

    const navigate = useNavigate();


    /*-------------------------------------------------------------------------------------------------*/
    function firstnameValidation() {
        const regexFirstnameLastname = /^[A-Z-a-z\s]{3,40}$/;

        if (firstnameInputData =='') {
            setErrorFirstnameEmpty(true)   
        }
        else {
            setErrorFirstnameEmpty(false)
        }


        if ((firstnameInputData && !regexFirstnameLastname.test(firstnameInputData))) {
            setErrorFirstnameRegex(true)   
        }
        else {
            setErrorFirstnameRegex(false)
        }

    };

    function lastnameValidation() {
        const regexFirstnameLastname = /^[A-Z-a-z\s]{3,40}$/;

        if (lastnameInputData === '') {
            setErrorLastnameEmpty(true)   
        }
        else {
            setErrorLastnameEmpty(false)
        }
       
        if ((lastnameInputData && !regexFirstnameLastname.test(lastnameInputData))) {
            setErrorLastnameRegex(true)   
        }
        else {
            setErrorLastnameRegex(false)
        }

    };

    function emailValidation () {
        const regexEmail =  /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (emailInputData === '') {
            setErrorEmailEmpty(true)   
        }
        else {
            setErrorEmailEmpty(false)
        }

        if ((emailInputData && !regexEmail.test(emailInputData))) {
            setErrorEmailRegex(true)   
        }
        else {
            setErrorEmailRegex(false)
        }
    };

    function passwordValidation () {
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (passwordInputData === '') {
            setErrorPasswordEmpty(true)   
        }
        else {
            setErrorPasswordEmpty(false)
        }

        if ((passwordInputData && !regexPassword.test(passwordInputData))) {
            setErrorPasswordRegex(true)   
        }
        else {
            setErrorPasswordRegex(false)
        }
    };


    /*-------------------------------------------------------------------------------------------------*/
    function handleChange(e) {
        setFile(e.target.files[0]) 
        //setErrorFileEmpty(true) 
        setErrorFileEmpty(false)
    }


    let picturePreview;
    if (file) {
        picturePreview = <img className = {style.picture} src={URL.createObjectURL(file)}/>
    
    }
    /*ou
    function ab (){
        if (file) {
        return <img className = {style.picture} src={URL.createObjectURL(file)}/>
        }
    }
    ab()*/


    /*function fileValidation () {
        console.log(file);
        if (file === '') {
            setErrorFileEmpty(true)   
        }
        else {
            setErrorFileEmpty(false)
        }
        return
    };*/


    /*-------------------------------------------------------------------------------------------------*/
    let errorFirstnameMessageRegex;
    if (errorFirstnameRegex === true) {
        errorFirstnameMessageRegex = <p className="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé, 3 caractères minimum</p>
    }

    let errorLastnameMessageRegex;
    if (errorLastnameRegex === true) {
        errorLastnameMessageRegex = <p className="mt-2 text-danger">Aucun chiffre ou symbole n'est autorisé, 3 caractères minimum</p>
    }

    let errorEmailMessageRegex;
    if (errorEmailRegex === true) {
        errorEmailMessageRegex = <p className="mt-2 text-danger">Email invalide, voici un exemple de format : nom.prenom@domaine.fr</p>
    }

    let errorPasswordMessageRegex;
    if (errorPasswordRegex === true) {
        errorPasswordMessageRegex = <p className="mt-2 text-danger"> Doit comporter au minimum 6 caractères et contenir un chiffre</p>
    }


    /*-------------------------------------------------------------------------------------------------*/
    let buttonInscriptionNoValid;
    if (errorFirstnameEmpty === true || errorFirstnameRegex === true|| errorLastnameEmpty === true || 
        errorLastnameRegex === true|| errorEmailEmpty === true || errorEmailRegex === true || 
        errorPasswordEmpty=== true || errorPasswordRegex === true ||errorFileEmpty === true) {
        buttonInscriptionNoValid = true;
        console.log('bouton inscription non valide');
    }
    else {
        buttonInscriptionNoValid = false;
        console.log('bouton inscription valide');
    }
 

    /*-------------------------------------------------------------------------------------------------*/
    const sendForm = function(e) {
        e.preventDefault();

        const formData = new FormData()
        formData.append('firstname', firstnameInputData);
        formData.append('lastname', lastnameInputData);
        formData.append('email', emailInputData);
        formData.append('password', passwordInputData);
        formData.append('imageUrl', file);

        axios.post("http://localhost:3000/api/auth/signup", formData)
            .then((res) => {
                console.log("Le compte a été créé !")
                navigate("/signupSuccess");
            
            })
            .catch((err) =>{ 
                console.log(err.response.data);
                setResponseError(err.response.data);  
            })
    }


    return (
        <div className= {cx ("container", style.container)}>
            <form className="form-inline justify-content-center">
                <h1 className={cx ("mt-5", style.h1)}>Inscription</h1>

                <div className="form-group">
                    <label className= {cx ("mb-1 mt-2", style.label)} htmlFor="Votre prénom">Prénom</label>
                    <input className= {cx ("form-control", style.input)}value={firstnameInputData} onInput={e => setFirstnameInputData(e.target.value)} onKeyUp={firstnameValidation} type="text" id="Votre prénom" placeholder="Marc" required/>
                    {errorFirstnameMessageRegex}
                </div>

                <div className="form-group">
                    <label className= {cx ("mb-1 mt-2", style.label)}  htmlFor="Votre nom">Nom</label>
                    <input className= {cx ("form-control", style.input)} value={lastnameInputData} onInput={e => setLastnameInputData(e.target.value)} onKeyUp={lastnameValidation} type="text" id="Votre nom" placeholder="Dupont" required/>
                    {errorLastnameMessageRegex}
                </div>

                <div className="form-group">
                    <label className= {cx ("mb-1 mt-2", style.label)}  htmlFor="Votre adresse email">Adresse mail</label>
                    <input className= {cx ("form-control", style.input)} value={emailInputData} onInput={e => setEmailInputData(e.target.value)} onKeyUp={emailValidation} type="email" id="Votre adresse email" placeholder="dupontmarc@gmail.com" required/>
                    {errorEmailMessageRegex}
                </div>

                <div className="form-group ">
                    <label className= {cx ("mb-1 mt-2", style.label)}  htmlFor="Votre mot de passe">Mot de passe</label>
                    <input className= {cx ("form-control", style.input)} value={passwordInputData} onInput={e => setPasswordInputData(e.target.value)} onKeyUp={passwordValidation} type="password" id="Votre mot de passe" placeholder="Au moins 6 caractères dont un chiffre" autoComplete="on" required/>
                    {errorPasswordMessageRegex}
                </div>

                <div className="form-group "> 
                    <label className= {cx ("mb-1 mt-2", style.label)}  htmlFor="Votre avatar">Avatar</label>
                    <br/>

                    {/* onChange={e => setFile(e.target.files[0])}*/}
                    <input className="form-control-file" onChange={e => handleChange(e)}  aria-label="envoi image" accept="image/*" type="file" id="Votre avatar"/>
                   

                    <div className="preview_picture">
                    {picturePreview}
                    {/*ou {ab()}*/}
                    </div>
                </div>

                <p className="mt-2 text-danger">{responseError}</p>

                <button disabled={buttonInscriptionNoValid} className="submit btn btn-info btn-lg btn-block mt-3" onClick={sendForm} type="submit">S'inscrire</button>
            </form>

            <p className="text-right mt-3">Déjà inscrit ? <a className={style.a}><Link to="/">Se connecter</Link></a></p>          
        </div>
    );
}
 
export default Signup; 

