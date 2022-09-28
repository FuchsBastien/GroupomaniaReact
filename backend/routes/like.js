const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');


// Routes
//ici '/' pour /api/likes/ 
router.get('/:articleId', likeCtrl.findLikeByArticle);
router.get('/:articleId/:userId', likeCtrl.findLikeByUserByArticle );
router.post('/', likeCtrl.createLikeByArticle);
router.delete('/:id', likeCtrl.deleteLikeByArticle);

module.exports = router;


//api/likes/:id
