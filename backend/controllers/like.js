
const db = require("../models");
const Like = db.likes;


// logique métier : lire tous les likes d'un article
exports.findLikeByArticle = (req, res, next) => {
    //afficher les commentaires par l'articleId récupéré dans l'url
    Like.findAll ({where: {articleId: req.params.articleId}})
     .then(like => res.status(200).json(like))
     .catch(error => res.status(400).json({ error }));
  };


//logique métier : lire le like d'un article selon l'utilisateur
exports.findLikeByUserByArticle = (req, res, next) => { 
  Like.findAll ({where: {articleId: req.params.articleId, userId: req.params.userId }})
  .then(like => res.status(200).json(like))
  .catch(error => res.status(400).json({ error }));
}


//logique métier : créer un like 
exports.createLikeByArticle = (req, res, next) => { 
  const like = new Like ({
    ...req.body, 
  });

  like.save()
    .then(() => res.status(201).json({ message: 'Like enregistré !'}))
    .catch(error => res.status(400).json("erreur"));
}


// logique métier : supprimer un like
exports.deleteLikeByArticle = (req, res, next) => {
      Like.destroy ({where: {id: req.params.id} })
      .then(() => res.status(200).json({ message: 'Like supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};
  

