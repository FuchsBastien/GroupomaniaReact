import style from './CreateArticle.module.css';
//multiple classname sur une balise
import cx from 'classnames';
import {useState} from 'react';
import axios from 'axios';


function CreateArticle(props) {

    const [articleInputData, setArticleInputData] = useState('');
    const [file, setFile] = useState('');

    const [userId, setUserId] = useState(localStorage.getItem('Id'));

    const [errorArticleEmpty, setErrorArticleEmpty] = useState(true);
    const [errorFileEmpty, setErrorFileEmpty] = useState(true);


    //console.log(articleInputData);
    //console.log(file);


    /*-------------------------------------------------------------------------------------------------*/
    function messageValidation () {

        if (articleInputData === '') {
            setErrorArticleEmpty(true)   
        }
        else {
            setErrorArticleEmpty(false)
        }
    
        if (file === '') {
            setErrorFileEmpty(true)   
        }
        else {
            setErrorFileEmpty(false)
        }
    }


    /*-------------------------------------------------------------------------------------------------*/
    function clearData() {
        setArticleInputData ('');
        setFile ('') ;
        setErrorArticleEmpty (true);
        setErrorFileEmpty (true)
        document.getElementById("formArticle").reset();
    }

    function callPropsFunc() {
        console.log("ok");
         //on appelle props qui est en paramètre de la fonction CreateArticle
        props.func()
    }

    /*-------------------------------------------------------------------------------------------------*/
    function handleChange(e) {
        setFile(e.target.files[0]) 
        setErrorArticleEmpty(false)
    }
    
    let picturePreview;
    if (file) {
        picturePreview = <img className = {style.picture} src={URL.createObjectURL(file)}/>
    }

    /*-------------------------------------------------------------------------------------------------*/
    let buttonPublicationNoValid;
    if (errorArticleEmpty === true && errorFileEmpty === true) {
        buttonPublicationNoValid = true;
        console.log('bouton publication non valide');
    }
    else {
        buttonPublicationNoValid = false;
        console.log('bouton publication valide');
    }
 
    /*-------------------------------------------------------------------------------------------------*/
    const postArticle = function(e) {
        e.preventDefault();
        
            if (file === ''){
                const formData = new FormData()
                formData.append('userId', userId);
                formData.append('content', articleInputData);
                formData.append('imageUrl', file);

                axios.post ('http://localhost:3000/api/articles/', formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                .then(()=>{
                console.log('réussite!!');
                callPropsFunc();
                clearData();
                })
                .catch((err)=>{
                    console.log(err);
                    //window.alert(err.response.data);
              });  
            } 
            else { 
                if (articleInputData === '') {
                    const formData = new FormData()
                    formData.append('userId', userId);
                    formData.append('imageUrl', file);
            
                    axios.post ('http://localhost:3000/api/articles/', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                    .then(()=>{
                        console.log('réussite!!');
                        callPropsFunc();
                        clearData();
                    })
                    .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                    });
                }
                else {
                    const formData = new FormData()
                    formData.append('userId', userId);
                    formData.append('content', articleInputData);
                    formData.append('imageUrl', file);
            
                    axios.post ('http://localhost:3000/api/articles/', formData, {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
                    .then(()=>{
                        console.log('réussite!!');
                        callPropsFunc();
                        clearData();
                  
                    })
                    .catch((err)=>{
                        console.log(err.response.data);
                        window.alert(err.response.data);
                    });   
                }
            } 
        }
    
        const handleSubmit = (event)=>{
            console.log('uuuu');
            //event.preventDefault();
            //event.target.reset();
        };
        

    return (
        <div className= {style.container}>
            <form id="formArticle"> 
                <div className="form-group mt-3">
                    <label className={style.label} htmlFor="content">Créer une publication</label>
                    <textarea className={cx ("form-control mt-4", style.textarea)} onSubmit={handleSubmit} onInput={e => setArticleInputData(e.target.value)} onKeyUp ={messageValidation} id="content" rows="3" placeholder="Quoi de neuf?" required></textarea>
                </div>

                <div className="form-group mt-3">
                    <input className="form-control-file" onChange={e => handleChange(e)} aria-label="envoi image" accept="image/*" type="file" id="image"/>
                </div>

                <div className="preview_picture">
                    {picturePreview}
                </div>
                
                <button disabled={buttonPublicationNoValid} className ="btn btn-primary mt-4 mb-4" onClick={postArticle}>Partager</button>
            </form>
        </div>  
    );
}
 
export default CreateArticle; 

