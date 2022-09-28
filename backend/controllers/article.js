//const User = require('../models/article');
const db = require("../models");
const Article = db.articles;
const Comment = db.comments;
const User = db.users;
const Like = db.likes;

User.hasMany(Article);
Article.belongsTo(User);


const fs = require('fs');


// logique métier : lire tous les articles avec leur utilisateurs
exports.findAllArticle = (req, res, next) => {
  Article.findAll ({include: { model: User}, order: [['createdAt', 'DESC']]
})
    .then(article => res.status(200).json(article))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire tous les articles de l'utilisateur
exports.findArticlesByUserId = (req, res, next) => {
  //afficher les articles par l'userId récupéré dans l'url
  Article.findAll ({where: {userId: req.params.id}, order: [['createdAt', 'DESC']]})
  .then(article => res.status(200).json(article))
  .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un article par son id
exports.findOneArticle = (req, res, next) => {
  //afficher l'article par son ID récupéré dans l'url
  Article.findOne ({include: { model: User}, where: {id: req.params.id} })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : créer un article
exports.createArticle = (req, res, next) => {
  // éléments de la requète
  //const content =  req.body.content;
  const imageUrl =  req.body.imageUrl;

  // vérification que tous les champs sont remplis
  /*if (content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir le champ 'contenu' pour créer un article"});
  }*/

  //si pas d'image dans la requête
  if (imageUrl === null || imageUrl  === '' ) {
    //variable contenant les champs de la requête
    //const articleObject = req.body;
    // Création d'un nouvel objet Article à partir du modèle Article créé
    const article = new Article({
      //copie tous les champs de la requête de la variable articleObject
      ...req.body,
      imageUrl : req.file != undefined ? req.file.filename : '',
      // Création de l'URL de l'image : http://localhost:3000/images/nomdufichier 
      //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      //imageUrl: `http://localhost:3000/images/${req.file.filename}`
      
    });
    // Enregistrement de l'objet article dans la base de données
    article.save()
      //réponse obligatoire sinon expiration de la requête
      .then(() => res.status(201).json({ message: 'Article enregistré !'}))
      //erreur si requête non envoyé au serveur
      .catch(error => res.status(400).json("article limité à 255 caractères"));

  //si image dans la requête  
  } else {
    //const articleObject = req.body;
    const article = new Article({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      //imageUrl: `http://localhost:3000/images/${req.file.filename}`
    });
    article.save()
      .then(() => res.status(201).json("article limité à 255 caractères"))
      .catch(error => res.status(400).json({ error }));
    }
};


// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
  // éléments de la requète
 /* const content =  req.body.content;*/
  // vérification que tous les champs sont remplis
  /*if (content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir le champ 'Contenu' pour modifier votre article"});
  }*/

  //trouver l'article dans la base de données
  Article.findOne({ where: {id: req.params.id} })
      //paramètre article pour retrouver article.imageUrl
      .then((article) => {
      //Récupération du nom de l'image
        const filename = article.imageUrl.split('/images/')[1]; 
        //On efface l'image en appliquant une fonction callback qui modifie l'article
        fs.unlink(`images/${filename}`, () => {
          //S'il existe déjà une image (req.file)
          if (req.file) {
            //on reprend req.body en modifiant imageUrl
            const articleObject = {...req.body,
              imageUrl: `http://localhost:3000/images/${req.file.filename}`,
            } 
            //on update articleObject (ATTENTION : mettre userObject avant where)
            Article.update({ ...articleObject, id:  req.params.id},{ where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Article modifié !'}))
            .catch(error => res.status(400).json({ error }));
          }
          //sinon
          else {
            //on reprend req.body 
            const articleObject = {...req.body}
            Article.update({ ...articleObject, id:  req.params.id},{ where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Article modifié !'}))
            .catch(error => res.status(400).json({ error }));
          }
        })
      })


  // S'il existe déjà une image (req.file)
  //const articleObject = req.file?
  // on reprend req.body en modifiant imageUrl
  /*{ ...req.body,
    imageUrl: `http://localhost:3000/images/${req.file.filename}`,

  } 
   // sinon on reprend req.body 
  : { ...req.body };*/

   // on update articleObject (ATTENTION : mettre userObject avant where)
   /*Article.update({ ...articleObject, id:  req.params.id},{ where: {id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(400).json({ error }));*/
    
};
  

  //logique métier : supprimer un article
  exports.deleteArticle = (req, res, next) => {
    //trouver l'article dans la base de données
    Article.findOne({ where: {id: req.params.id} })
      //paramètre article pour retrouver article.imageUrl
      .then(article => {
        //Récupération du nom du fichier
        const filename = article.imageUrl.split('/images/')[1];
        //On efface le fichier (unlink)
        fs.unlink(`images/${filename}`, () => {
          //supprime chaque commentaire qui contient l'Id de l'article
          Comment.destroy({where: {articleId: req.params.id}})
          Like.destroy({where: {articleId: req.params.id}})
          .then(() =>
          //supprime l'article de la base de données
          Article.destroy({ where: {id: req.params.id} })
          .then(() => res.status(200).json({ message: 'Article supprimé !'}))
          .catch(error => res.status(400).json({ error }))
          ) 
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

 