// Utilisation de multer pour enregistrer les fichiers images
const multer = require('multer');

// Modification de l'extension des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  // Enregistrement dans le dossier "images"
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
   // Génération du nom du fichier  
  filename: (req, file, callback) => {
    //on reprend le nom en ajoutant des - à la place des ""
    const name = file.originalname.split(' ').join('_');
    //on reprend l'extension
    const extension = MIME_TYPES[file.mimetype];
    //nom d'origine + numero unique + . + extension
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Exporter multer fichier unique image
module.exports = multer({storage: storage}).single('imageUrl');