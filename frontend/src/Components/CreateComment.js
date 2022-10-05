//import style from './AllArticles.module.css';
//multiple classNamename sur une balise
import cx from 'classnames';
import React from "react";
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



function CreateComment() {

    return(
<div className ="article_detail">
      <div className="post_comment">
         <img className="iconUser rounded-circle mb-2 me-2" width="50"  alt=""/>
         <input className= "form-control" type="text" id="content" placeholder="Ecrivez un commentaire..."/>
         <br/>
      </div>

      {/*<p v-if="errorComment" className="mt-2 text-danger">Veuillez ajouter un contenu</p>

      <div className="comment" v-bind:key = "comments" v-for= "comments in commentsArray">
         <div className="comment_avatar">
            <div v-if="userAdmin == 'true'">
               <router-link v-bind:to ="`/accounts/${comments.User.id}`"> 
                  <img className="iconUser rounded-circle mb-2 me-2" width="50" v-bind:src="comments.User.imageUrl" alt=""/>
               </router-link>
            </div>   
            <div v-else>
               <img className="iconUser rounded-circle mb-2 me-2" width="50" v-bind:src="comments.User.imageUrl" alt=""/>
            </div>
         </div>

         <div className = "comment_content">
            <div className="comment_bulle">
               <div v-if="userAdmin == 'true'">
                
                     <p className="comment_user" :style="{cursor: 'pointer'}">{{comments.User.firstname}} {{comments.User.lastname}}</p>
                
               </div>
           
                  <p className="comment_user">{{comments.User.firstname}} {{comments.User.lastname}}</p>
        
              
               <p>{{comments.content}}</p>
            </div>
            
            <p className="comment_date">le {{comments.createdAt [8]}}{{comments.createdAt [9]}}-{{comments.createdAt [5]}}{{comments.createdAt [6]}}-{{comments.createdAt [0]}}{{comments.createdAt [1]}}{{comments.createdAt [2]}}{{comments.createdAt [3]}} </p>

            <div className="comment_button" v-if="userAdmin == 'true'">
               <button className="btn-danger ms-2 rounded" v-on:click="deleteComment(comments.id)">Supprimer</button>
            </div>

            <div className="comment_button" v-else-if="comments.userId == userId" >
               <button className="btn-danger ms-2 rounded" v-on:click="deleteComment(comments.id)">Supprimer</button>
            </div>
</div>  */}  
      </div>   
    )
  
}
   


export default CreateComment;