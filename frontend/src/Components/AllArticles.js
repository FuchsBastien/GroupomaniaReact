import './AllArticles.css';
import React from "react";
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


import CreateArticle from './CreateArticle.js';

function AllArticles() {

    const [articlesArray, setArticlesArray] = useState([]);

    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [userAdmin, setUserAdmin] = useState(localStorage.getItem('Admin'));
    const [userId, setUserId] = useState(localStorage.getItem('Id'));
    const [userFirstname, setUserFirstname] = useState(localStorage.getItem('Firstname'));
    const [userLastname, setUserLastname] = useState(localStorage.getItem('Lastname'));
    const [userActivate, setUserActivate] = useState(localStorage.getItem('Activate'));


    const [idArticleModifyOrDelete, setIdArticleModifyOrDelete] = useState('');
    const [idArticleModify, setIdArticleModify] = useState('');

    const [updateArticleInputData, setUpdateArticleInputData] = useState('');
    const [updateFile, setUpdateFile] = useState('');

    const [errorArticleEmpty, setErrorArticleEmpty] = useState(true);
    const [errorFileEmpty, setErrorFileEmpty] = useState(true);

    const [deletePictureArticleData, setDeletePictureArticleData] = useState(false);


   

    React.useEffect(() => {
        loadArticles () 
    }, []);


    function loadArticles () {
        axios.get ("http://localhost:3000/api/articles/", {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(articles => {
            console.log(articles);
            setArticlesArray(articles.data)   
            }) 
            //on rajoute [] pour définir un tableau sans le mettre dans useState pour éviter de générer le state à l'infini
    }

    function deleteArticle (id) {
        axios.delete("http://localhost:3000/api/articles/"+id, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
           .then(() => {
              console.log('article supprimé!');
              loadArticles()
           })
           .catch((error) => {
              console.log(error.message);
        })
    }


    function modifyArticle(id) {
           const formData = new FormData()
           formData.append('content', updateArticleInputData);
           formData.append('imageUrl', updateFile); 

           axios.put("http://localhost:3000/api/articles/"+id, formData, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
              .then(() => {
                 console.log('article modifié');
                 clearDisplayButtonAndCardModifyDelete()
                 setUpdateFile('')
                 loadArticles() 

              })
              .catch((error) => {
                 console.log(error.message);
              })    
           
    }



    //enregistre le contenu de l'article à afficher dans la fenêtre de modification au clic de "modifier"
    function contentArticleTextarea(article_content) {
        setUpdateArticleInputData(article_content)
    }

    //enlève l'affichage des boutons modifier et supprimer au clic de la croix dans la fenêtre de modification
    function clearDisplayButtonAndCardModifyDelete() {
        setDeletePictureArticleData (false)
        setIdArticleModifyOrDelete('')
        setIdArticleModify('')
    }

    //affiche la miniature de l'image telechargée dans la fenêtre de modification
    function handleChange(e) {
        setUpdateFile(e.target.files[0]) 
        setErrorFileEmpty(false)
        //updateMessageValidation ()
    }

    //supprime la miniature et l'image téléchargée dans la fenêtre de modification
    function clearPicturePrewiew() {
        setUpdateFile('')
        setErrorFileEmpty(true)
    }

    function deletePicture(imageUrl) {
         setUpdateFile('')
    }

    //vérifie qu'au moins une modification a été effectuée
    function updateMessageValidation () {
        if (updateArticleInputData === '') {
            setErrorArticleEmpty(true)   
        }
        else {
            setErrorArticleEmpty(false)
        }
    
        if (updateFile === '') {
            setErrorFileEmpty(true)   
        }
        else {
            setErrorFileEmpty(false)
        }
    }

    //Grise ou non le bouton "modifier" de l'article
    let buttonModificationNoValid;
    if (errorArticleEmpty === true && errorFileEmpty === true) {
        buttonModificationNoValid = true;
        console.log('bouton publication non valide');
    }
    else {
        buttonModificationNoValid = false;
        console.log('bouton publication valide');
    }
 


    return (
        <div className ="all_articles">

            <h1>Bienvenue {userFirstname}!</h1> 

            <CreateArticle func = {loadArticles}/>

            <h1>Tous les Articles Publiés</h1> 

            <div className="articles_frame">
                {articlesArray.map (article => (
                    <div className="article">
                        <div className ="article_avatar">
                            <div className ="article_avatar1">
                                <img className="iconUser rounded-circle mb-2 me-2" width="100" src={article.User.imageUrl}/>       
                                <p className= "name">{article.User.firstname} {article.User.lastname}</p>
                                <p className= "date">le {article.createdAt [8]}{article.createdAt [9]}-{article.createdAt [5]}{article.createdAt [6]}-{article.createdAt [0]}{article.createdAt [1]}{article.createdAt [2]}{article.createdAt [3]}</p>
                            </div>
                            <div className ="article_avatar2">
                                {userAdmin == 'true'? 
                                    <button className="modifyOrDelete" onClick={e => setIdArticleModifyOrDelete(article.id)} title="Modifier ou supprimer votre article" >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    : article.userId == userId? 
                                        <button className="modifyOrDelete" onClick={e => setIdArticleModifyOrDelete(article.id)} title="Modifier ou supprimer votre article" >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                    : null
                                }
                            </div>        
                        </div>

                       
                        {/*bouton modifier (user de l'article)*/}
                        {idArticleModifyOrDelete == article.id && article.userId == userId? 
                            <div>
                                <button className="btn-success rounded" onClick={e => {setIdArticleModify(article.id); contentArticleTextarea(article.content)}}>Modifier</button>
                                <br/><br/>
                                <br/>
                            </div>
                        : null
                        }

                        {/*carte modification article*/}
                        {idArticleModify == article.id?
                            <div className="container-modify"> 
                                <div className="div-modify">
                                    <div className="titre">
                                        <p>Modifier votre publication</p>
                                        <button className="cancelModify" onClick={e => clearDisplayButtonAndCardModifyDelete()} >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>

                                    <textarea className= "form-control mb-2" onInput={e => setUpdateArticleInputData(e.target.value)} onKeyUp ={updateMessageValidation}  id="content"  rows="1" placeholder= "Modifier votre contenu...">{updateArticleInputData}</textarea>

                                   <div>
                                        {updateFile?
                                            <img className = "picture" src={URL.createObjectURL(updateFile)}/>
                                            :deletePictureArticleData == true?
                                                <p className = "noPicture">Aucune Image</p>
                                            :article.imageUrl?                         
                                                <img className="image-article-modify" src={article.imageUrl} alt="image article"/>
                                            :null  
            
                                        }
                                    </div>

                                    <div>
                                        {updateFile?
                                            <button className="cancelPicture" onClick={e => clearPicturePrewiew()}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                            :deletePictureArticleData == true?
                                            null
                                            :article.imageUrl?
                                            <button className="deletePicture" onClick={e => setDeletePictureArticleData(true)} >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                            :null
                                        }
                                    </div>
  
                                    <div>
                                        <input className="form-control-file" onChange={e => handleChange(e)} aria-label="envoi image" accept="image/*" type="file" id="image"/>
                                        <br/>
                                        <button disabled = {buttonModificationNoValid} className="btn-success rounded"   onClick= {e => modifyArticle(article.id)} >Enregistrer</button> 
                                    </div>
                                </div>
                            </div>
                            :null
                        }


                        {/*bouton supprimer (admin)*/}
                        {idArticleModifyOrDelete == article.id && userAdmin == 'true'? 
                            <div>
                                <button className="btn-danger ms-2 rounded" onClick= {e => deleteArticle(article.id)}>Supprimer</button>
                                <br/><br/>
                                <br/>
                            </div>
                          //bouton supprimer (user de l'article)
                            : idArticleModifyOrDelete == article.id && article.userId == userId?
                                <div>
                                    <button className="btn-danger ms-2 rounded" onClick= {e => deleteArticle(article.id)}>Supprimer</button>
                                    <br/><br/>
                                    <br/>
                                </div>
                            : null
                        }


                        {/*contenu article*/}
                        <p className="article_content">{article.content}</p>


                        {/*image article*/}
                        {article.imageUrl?
                        <img className="image_article" src={article.imageUrl} alt="image article"/>
                        : null
                        }
                        
                    </div>         
                ))} 
            </div>
        </div>
    );

}

export default AllArticles; 



     