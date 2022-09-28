//const User = require('../models/user');
const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Logique métier : création de nouveaux utilisateurs (signup)
exports.signup = (req, res, next) => {
   // éléments de la requète
   const regexFirstnameLastname = /^[A-Z-a-z\s]{3,40}$/;
   const regexEmail = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/g;
   const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
   const firstname = req.body.firstname;
   const lastname =  req.body.lastname;
   const email = req.body.email;
   const password = req.body.password;

  // champs et regex obligatoires
  if (firstname === null || firstname === '' || lastname === null || lastname === '' || email === null || email === '' || password === null || password === ''
  || (!regexFirstnameLastname.test(req.body.firstname)) || (!regexFirstnameLastname.test(req.body.lastname)) || (!regexEmail.test(req.body.email)) || (!regexPassword.test(req.body.password))) {
  return res.status(400).json("Inscription non valide!")
  }
  else {
    // vérification si l'user existe dans la DB
    User.findOne({ where: { email: req.body.email }})
      .then(userFound => {
        // Si on ne trouve pas l'utilisateur
        if (!userFound) {
        // Hash du mot de passe avec bcrypt (fonction asynchrone)
          bcrypt.hash(password, 10)
          .then(hash => {
            //création nouvel utilisateur
            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              //copie tous les champs de la requête de la variable user
              //...user,
              // Création de l'URL de l'image : http://localhost:3000/images/nomdufichier 
              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              // imageUrl : req.body.imageUrl,
              //imageUrl : req.file != undefined ? req.file.filename : '',
              //imageUrl: `http://localhost:3000/images/${req.file.filename}`
        
            });
            // Sauvegarde dans la base de données
          user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
          .catch(error => res.status(400).json({ error }));
        })   
      }
      else if (userFound) {
      return res.status(409).json("L'adresse mail existe déjà, veuillez en choisir une autre")
      }
    })
    .catch(error => res.status(500).json({ message: 'requête échouée' }));
  }
}


// Logique métier : connexion d'utilisateur enregistré (login)
exports.login = (req, res, next) => {
    // vérification si l'user existe dans la DB
    User.findOne({ where: { email: req.body.email }})
      .then(user => {
        // Si on ne trouve pas l'utilisateur
        if (!user) {
          return res.status(401).json('Identifiant incorrect!');
        }
        // On compare le mot de passe de la requête avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            //si mot de passe différent
            if (!valid) {
              return res.status(400).json('Mot de passe incorrect !');
            }
            //si même mot de passe et compte actif
            if (user.activate == true) {
              res.status(200).json({
                userId: user.id,
                userAdmin: user.isAdmin,
                userFirstname : user.firstname,
                userImageUrl : user.imageUrl,
                userActivate : user.activate,
                // Création d'un token pour sécuriser le compte de l'utilisateur
                token: jwt.sign(
                  { 
                    userId: user.id,
                    userAdmin : user.isAdmin,
                    userFirstname : user.firstname,
                    userImageUrl : user.imageUrl,
                    userActivate : user.activate,
                  },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '1h' }
                )
              });
              //si même mot de passe et compte inactif
            } else {
              return res.status(400).json("Votre compte a été suspendu temporairement pour non respect d'utilisation du site");
            }
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };




  