import style from './Account.module.css';
import React from 'react'
import {useState} from 'react';
import axios from 'axios';
import cx from 'classnames';

function Account() {

    const [userArray, setUserArray] = useState([]);

    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [userAdmin, setUserAdmin] = useState(localStorage.getItem('Admin'));
    const [userId, setUserId] = useState(localStorage.getItem('Id'));


    React.useEffect(() => {
        userLoad ();
    }, []);

    //charge l'user
      const userLoad = function () {
        axios.get (`http://localhost:3000/api/users/${userId}`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(user => {
            console.log(user.data);
            setUserArray(user.data)
            })       
    }

  return (
    <div>
        {userToken? 
            <div className={style.account}> 
                <div className= {style.account_frame}>
                    <img className="iconUser rounded-circle mb-2 me-2" width="100" src={userArray.imageUrl}/>

                    <h1>{userArray.firstname} {userArray.lastname}</h1>  

                    <div className={style.account_modify}>
                        <div className="form-group mt-5">
                            <input  type="text" id="firstname" placeholder="Prénom" className= {cx ("form-control", style.form_control)}/>  
                        </div>
                       
                        <div className="form-group mt-5">
                            <input  type="text" id="lastname" placeholder="Nom" className= {cx ("form-control", style.form_control)}/>  
                        </div>

                        <button className="btn-success rounded mt-3" >Valider</button>

                        <input className="btn-danger ms-2 rounded" type="submit" value="Annuler"/>

                        <p className="mt-2 text-danger"> Veuillez modifier le nom et prénom</p>
                        

                        <button className ="btn-success rounded mt-5">Modifier</button>         
                    </div>

                    <br/>

                    <div className={style.account_delete}>
                        <button className ="btn-danger mt-2 mb-3 rounded">Supprimer</button>
                    </div>
                </div>
            </div>  
        :null
        } 
    </div>
  )
}


export default Account

