import style from './AllArticles.module.css';
//multiple classname sur une balise
import cx from 'classnames';
import React from "react";
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CreateArticle from './CreateArticle.js';
import CreateComment from './CreateComment.js';

function AllArticles() {

    const [articlesArray, setArticlesArray] = useState([]);

    const [articlesArrayNew, setArticlesArrayNew] = useState([]);
    
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

    const [nbCommentData, setNbCommentData] = useState([]);

  
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
 
    console.log(articlesArray);
    //let ab = []
    //console.log(ab)
    //console.log(nbCommentData);


    /*lance les fonctions au 1er chargement du composant
    on rajoute [] pour définir un tableau sans le mettre dans useState pour éviter de générer le state à l'infini*/
    React.useEffect(() => {
        loadArticles ();
    }, []);

  /*React.useEffect(() => {
    idForEachArticle ();
    }, []);*/
   

    //charge les articles
    const loadArticles = function () {
        axios.get ("http://localhost:3000/api/articles/", {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(articles => {
            console.log(articles.data);
            setArticlesArray(articles.data)
            idForEachArticle(articles.data)
            })       
    }

    //pour chaque article on applique les fonction loadComments et loadLikes avec en paramètre l"id de l'article
    //on peut faire appel à la fonction avec ou sans paramètre (articlesArray.forEach = usestate) 
    function idForEachArticle (articlesArray) {
        console.log(articlesArray); 
        articlesArray.forEach ((article) => {
            console.log(article);
            //article.nbComment = 10
            //console.log(articlesArray);
            axios.get (`http://localhost:3000/api/articles/${article.id}/comments`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
              console.log(response.data.length);
              article.nbComment = response.data.length
              console.log(article);
              //setArticlesArrayNew (response.data.length)
              //ab.push(response.data.length)
              //console.log(ab);
              //console.log(article.nbComment);  
              //setArticlesArrayNew (current => [...current, response.data.length]) 
              console.log(articlesArray); 
            }) 
            //loadComments (article.id, article);
            //this.loadLikes (article.id, article);
        })
    }
    //idForEachArticle (articlesArray)


    
    //charge le nombre de commentaires par article
    /*function loadComments (articlesArray { 
        console.log('ok');
        axios.get (`http://localhost:3000/api/articles/${article_id}/comments`, {headers : {Authorization: 'Bearer ' + localStorage.getItem('token')}})
            .then(response => {
              console.log(response.data.length);
              //article.nbComment = response.data.length
              console.log(article);
              //ab.push(response.data.length)
              //console.log(ab);
              //setNbCommentData(response.data.length)
              //console.log(article.nbComment);
              console.log(articlesArray);            
            })    
        
    }/*/
    
   

    //supprime un article
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
        //ou setErrorFileEmpty(!errorFileEmpty)
        //updateMessageValidation ()
    }

    //supprime la miniature et l'image téléchargée dans la fenêtre de modification
    function clearPicturePrewiew() {
        setUpdateFile('')
        setErrorFileEmpty(true)
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


    const messages = ['React', 'Re: React'];


    return (
        <div className = {style.all_articles}>

            <h1>Bienvenue {userFirstname}!</h1> 

            <CreateArticle func = {loadArticles}/>

            <h1>Tous les Articles Publiés</h1> 

            <div className={style.articles_frame}>
                {articlesArray.map ((article, index) => {
                    return (
                        <div key={index} className= {style.article}> 
                            <div className ={style.article_avatar}>
                                <div className = {style.article_avatar1}>
                                    <div>
                                        <img className="iconUser rounded-circle mb-2 me-2" width="100" src={article.User.imageUrl}/>       
                                    </div>
                                    <div>
                                        <p className= {style.name}>{article.User.firstname} {article.User.lastname}</p>                               
                                        <p className= {style.date}>le {article.createdAt [8]}{article.createdAt [9]}-{article.createdAt [5]}{article.createdAt [6]}-{article.createdAt [0]}{article.createdAt [1]}{article.createdAt [2]}{article.createdAt [3]}</p>
                                    </div>
                                </div>
                                <div className ={style.article_avatar2}>
                                    {userAdmin == 'true'? 
                                        <button className={style.modifyOrDelete} onClick={e => setIdArticleModifyOrDelete(article.id)} title="Modifier ou supprimer votre article" >
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        : article.userId == userId? 
                                            <button className={style.modifyOrDelete} onClick={e => setIdArticleModifyOrDelete(article.id)} title="Modifier ou supprimer votre article" >
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                            </button>
                                        : null
                                    }
                                </div>        
                            </div>


                            {/*bouton modifier (user de l'article)*/}
                            {idArticleModifyOrDelete == article.id && article.userId == userId &&
                                <div>
                                    <button className="btn-success rounded" onClick={e => {setIdArticleModify(article.id); contentArticleTextarea(article.content)}}>Modifier</button>
                                    <br/><br/>
                                    <br/>
                                </div>
                            }

                            {/*carte modification article*/}
                            {idArticleModify == article.id?
                                <div className= {style.container_modify}> 
                                    <div className={style.div_modify}>
                                        <div className= {style.titre}>
                                            <p>Modifier votre publication</p>
                                            <button className= {style.cancelModify} onClick={e => clearDisplayButtonAndCardModifyDelete()} >
                                                <i className="fa-solid fa-xmark"></i>
                                            </button>
                                        </div>

                                        {/*on met soit value={updateArticleInputData} dans les paramètres de texarea ou {updateArticleInputData} dans entre les balises de textarea*/}
                                        <textarea className= {cx ("form-control mt-2", style.form_control)} onInput={e => setUpdateArticleInputData(e.target.value)} onKeyUp ={updateMessageValidation}  id="content"  rows="1" placeholder= "Modifier votre contenu..." value={updateArticleInputData} ></textarea>

                                    <div>
                                            {updateFile?
                                                <img className = {style.picture} src={URL.createObjectURL(updateFile)}/>
                                                :deletePictureArticleData == true?
                                                    <p className = {style.noPicture}>Aucune Image</p>
                                                :article.imageUrl?                         
                                                    <img className={style.image_article_modify} src={article.imageUrl} alt="image article"/>
                                                :null  
                
                                            }
                                        </div>

                                        <div>
                                            {updateFile?
                                                <button className={style.cancelPicture} onClick={e => clearPicturePrewiew()}>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                                :deletePictureArticleData == true?
                                                null
                                                :article.imageUrl?
                                                <button className={style.deletePicture} onClick={e => setDeletePictureArticleData(true)} >
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
                                    {/* fonction anonyme (e =>) pour éviter de déclencher automatiquement la fonction "deleteArticle" quand on 
                                    clique sur le bouton ... qui déclenche la fonction "setIdArticleModifyOrDelete" du parent*/}
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
                            <p className= {style.article_content}>{article.content}</p>


                            {/*image article*/}
                            {article.imageUrl?
                            <img className={style.image_article} src={article.imageUrl} alt="image article"/>
                            : null
                            }

                            <br/>

                            {/*Au clic on stocke l'ID de l'article choisi*/}
                            <p>{article.nbComment}</p> 
                        
    
                            {article.nbComment == 0?
                                <a className="comments"> Aucun commentaire !</a>
                            : article.nbComment == 1?
                                <a className="comments"> {article.nbComment}commntaire</a>
                            :<a className="comments">{article.nbComment}commetaires</a>
                            }

                            <CreateComment/>
                            
                        </div> 
                    )
                })} 

                {/*{articlesArray.map ((article, index) => {
                    return (
                        <p key={index}>{article.nbComment}</p> 
                    )} 
                )}*/}

            </div>

            <div>
      <h1>Hello!</h1>
      {messages.length > 0 &&
        <h2>
          You have {messages.length} unread messages.
        </h2>
      }
    </div>
            
        </div>
    );

}

export default AllArticles; 



     