//const User = require('../models/user');
const db = require("../models");
const User = db.users;
const Article = db.articles;
const Comment = db.comments;

const fs = require('fs');


// logique métier : lire tous les utilisateurs
exports.findAllUser = (req, res, next) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
  //afficher l'utilisateur par son ID récupéré dans l'url
  User.findOne ({ where: {id: req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : lire tous les utilisateurs selon un lastname et un firstname donné
exports.findOneUserByFirstname = (req, res, next) => {
  //afficher l'utilisateur par son ID récupéré dans l'url
  User.findAll ({ where: {lastname: req.params.lastname, firstname: req.params.firstname}})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
   // éléments de la requète
   const firstname = req.body.firstname;
   const lastname =  req.body.lastname;
   // vérification que tous les champs sont remplis
   if(firstname === null || firstname === '' || lastname === null ||lastname === '') 
   { return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});}
   // S'il existe déjà une image
   //console.log(req.file);
   const userObject = req.file ?
   { ...JSON.parse(req.body.user), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
   // S'il n'existe pas d'image (ATTENTION : mettre userObject avant where)
   //{ ...userObject, id: req.params.id}
   User.update({ ...userObject}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
};



// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  //supprime chaque commentaire qui contient l'Id de l'utilisateur 
  Comment.destroy({where: {userId: req.params.id}})
  .then(() => 
  //trouve les articles qui contiennent l'Id de l'user
  Article.findAll({where: {userId: req.params.id}})
    .then((articles) => {
        //supprime chaque article qui contient l'Id de l'user
        //supprime chaque commentaire qui contient l'ID des articles trouvés 
        articles.forEach((article) => {
            Article.destroy({where: {id: article.id}})
            Comment.destroy({where: {articleId: article.id}})
          })
      })

    .then(() =>
    //trouver l'utilisateur dans la base de données
     User.findOne ({ where: {id: req.params.id} })
      .then(user => {
        //Récupération du nom du fichier
        const filename = user.imageUrl.split('/images/')[1];
        //On efface le fichier (fs.unlink)
        fs.unlink(`images/${filename}`, () => {
        //on supprime l'utilisateur dans la base de données
          User.destroy({ where: {id: req.params.id} })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));  
        })
      })
    )
  
 )


    .catch(error => res.status(500).json({ error }));
   
};


