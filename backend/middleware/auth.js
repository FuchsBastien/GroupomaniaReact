const jwt = require('jsonwebtoken');

// Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
   // const isAdmin = decodedToken.isAdmin;
    //Si userId de la requête différent userId utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valide!';
    //Si isAdmin de la requête différent isAdmin utilisateur 
   /* } else if (req.body.isAdmin && req.body.isAdmin !== isAdmin) {
      console.log(isAdmin)
      return res.status(401).json({error: "User role non valable !"})  */
    } else {
      console.log(decodedToken)
      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Requête non authentifiée!!')
    });
  }
};

