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

    const [idArticleUpdate, setIdArticleUpdate] = useState('');



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


    return (
        <div className ="all_articles">

            <CreateArticle func = {loadArticles}/>

            <h1>Tous les Articles Publiés</h1> 

            <div className="articles_frame">
                {articlesArray.map (article => (
                    <div className="article">
                        <div className ="article_avatar">
                            <div className ="article_avatar1">
                                <img className="iconUser rounded-circle mb-2 me-2" width="100" src={article.User.imageUrl}/>       
                                <p className= "name">{article.User.firstname} {article.User.lastname}</p>
                                <p class= "date">le {article.createdAt [8]}{article.createdAt [9]}-{article.createdAt [5]}{article.createdAt [6]}-{article.createdAt [0]}{article.createdAt [1]}{article.createdAt [2]}{article.createdAt [3]}</p>
                            </div>
                            <div className ="article_avatar2">
                                {userAdmin == 'true'? 
                                    <button className="modifyOrDelete" onClick={e => setIdArticleUpdate(article.id)} title="Modifier ou supprimer votre article" >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                    </button>
                                    : article.userId == userId? 
                                        <button className="modifyOrDelete" onClick={e => setIdArticleUpdate(article.id)} title="Modifier ou supprimer votre article" >
                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                    : null
                                }
                            </div>        
                        </div>

                       
                        {/*bouton modifier (user de l'article)*/}
                        {idArticleUpdate == article.id && article.userId == userId? 
                            <div>
                                <button className="btn-success rounded">Modifier</button>
                                <br/><br/>
                                <br/>
                            </div>
                        : null
                        }


                        {/*carte modification article*/}
                        {idArticleUpdate == article.id?
                            <div className="container-modify"> 
                                <div className="div-modify">
                                    <div className="titre">
                                        <p>Modifier votre publication</p>
                                        <button class="cancelModify" onClick={e => setIdArticleUpdate(null)} >
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :null
                        }


                        {/*bouton supprimer (admin)*/}
                        {idArticleUpdate == article.id && userAdmin == 'true'? 
                            <div>
                                <button className="btn-danger ms-2 rounded" onClick= {e => deleteArticle(article.id)}>Supprimer</button>
                                <br/><br/>
                                <br/>
                            </div>
                          //bouton supprimer (user de l'article)
                            : idArticleUpdate == article.id && article.userId == userId?
                                <div>
                                    <button className="btn-danger ms-2 rounded" onClick= {e => deleteArticle(article.id)}>Supprimer</button>
                                    <br/><br/>
                                    <br/>
                                </div>
                            : null
                        }

                        
                        <p className="article_content">{article.content}</p>
                     
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



     