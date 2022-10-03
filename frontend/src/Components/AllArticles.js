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


    console.log(articlesArray);

    

    return (
    
        <div className ="all_articles">

            <CreateArticle func = {loadArticles}/>

            <h1>Tous les Articles Publiés</h1> 

            <div className="articles_frame">
                {articlesArray.map (article => (
                    <div className="article">
                        <div className ="article_avatar">
                            <div className ="article_avatar1">
                        
                                {userAdmin === "true"? 
                                <img className="iconUser rounded-circle mb-2 me-2" width="100" src={article.User.imageUrl}/>
                                : null
                                }
                                <p className= "name">{article.User.firstname} {article.User.lastname}</p>
                            </div>
                            <div className ="article_avatar2">
                                <button className="modifyOrDelete" title="Modifier ou supprimer votre article" >
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                            </div>        
                        </div>

                        <div>
                            <button className="btn-success rounded">Modifier</button>
                            <br/><br/>
                            <br/>
                        </div>

                        
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



     