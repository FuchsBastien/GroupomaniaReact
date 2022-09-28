//const User = require('../models/user');
const db = require("../models");
const Comment = db.comments;
const User = db.users;


User.hasMany(Comment);
Comment.belongsTo(User);



// logique métier : lire tous les commentaires 
exports.findAllComment = (req, res, next) => {
  Comment.findAll()
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire tous les commentaires de l'article avec leur utilisateur
exports.findCommentsByArticleId = (req, res, next) => {
  //afficher les commentaires par l'articleId récupéré dans l'url
  Comment.findAll ({ include: { model: User}, where: {articleId: req.params.id}, order: [['createdAt', 'DESC']]})
   .then(comment => res.status(200).json(comment))
   .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un commentaire par son id
exports.findOneComment = (req, res, next) => {
  //afficher le commentaire par son ID récupéré dans l'url
  Comment.findOne ({ where: {id: req.params.id} })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : créer un commentaire
exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    // Création d'un nouvel objet commentaire à partir du modèle créé
    const comment = new Comment({
      //copie tous les champs de la requête de la variable commentObject
      ...commentObject,
    });
    // Enregistrement de l'objet commentaire dans la base de données
    comment.save()
      .then(() => {
        //on recherche l'articleID de la requête à enregistrer
         Comment.findAll ({where: {articleId: req.body.articleId} })
         //réponse obligatoire sinon expiration de la requête
         .then(() => {
         res.status(200).json({message: 'Commentaire enregistré !'})
         })
      })
      //erreur si requête non envoyé au serveur
      .catch(error => res.status(400).json("commentaire limité à 100 caractères"));
};


// logique métier : modifier un commentaire
exports.modifyComment = (req, res, next) => {
  const commentObject = req.body
   Comment.update({ ...commentObject, id:  req.params.id},{ where: {id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
  

  // logique métier : supprimer un commentaire
  exports.deleteComment = (req, res, next) => {
    Comment.destroy ({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };

